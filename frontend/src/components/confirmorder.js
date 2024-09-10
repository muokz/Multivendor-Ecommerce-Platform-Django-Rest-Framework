import { CheckCircle} from 'react-feather';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext,CartContext,CurrencyContext } from '../context';

import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';
function ConfirmOrder(){
    const [ConfirmOrder, SetConfirmOrder]=useState(false);
    const [orderId, SetorderId]=useState('');
    const [PayMethod, SetPayMethod]=useState('');
    const [orderAmount, SetorderAmount]=useState(0);
    const userContext=useContext(UserContext);
    const {cartData,setCartData}=useContext(CartContext);
    const {CurrencyData}=useContext(CurrencyContext);
    if(userContext != 'true'){
        window.location.href="/customer/login"
    }else{
        if(ConfirmOrder==false){
            addOrderInTable();
        }        
    }

    function addOrderInTable(){
        const customerId = localStorage.getItem('customer_id');
        
        var previousCart=localStorage.getItem('cartData');
        var cartJson=JSON.parse(previousCart);
        var total_amount=0;
        var total_usd_amount=0;
        cartJson.map((cart,index)=>{
            total_amount+=parseFloat(cart.product.price);
            total_usd_amount+=parseFloat(cart.product.usd_price);
        });

        const formData=new FormData();
        formData.append('customer',customerId);
        formData.append('total_amount',total_amount);
        formData.append('total_usd_amount',total_usd_amount);

        //SUBMIT DATA
        axios.post(baseUrl+'/orders/',formData)
        .then(function (response){
            var orderId=response.data.id;
            SetorderId(orderId)
            orderItems(orderId);  
            SetConfirmOrder(true);  
            if(CurrencyData=='usd'){
                SetorderAmount(response.data.total_usd_amount);
            }else{
                SetorderAmount(response.data.total_amount);
            }     
        })
        .catch(function(error){
            console.log(error);
        });
    }

    function updateOrderStatus(order_status){
        //SUBMIT DATA
        axios.post(baseUrl+'/update-order-status/'+orderId)
        .then(function (response){
           window.location.href='/order/success';         
        })
        .catch(function(error){
            window.location.href='/order/failed';  
        });
    }

    function orderItems(orderId){
        var sum=0;
        var previousCart=localStorage.getItem('cartData');
        var cartJson=JSON.parse(previousCart);

        if(cartJson!=null){
            cartJson.map((cart,index)=>{
                const formData=new FormData();
                formData.append('order',orderId);
                formData.append('product',cart.product.id);
                formData.append('qty',1);
                formData.append('price',cart.product.price);
                formData.append('usd_price',cart.product.usd_price);
                
                //SUBMIT DATA
                axios.post(baseUrl+'/orderitems/',formData)
                .then(function (response){
                    //remove cart item
                    cartJson.splice(index,1);
                    localStorage.setItem('cartData',JSON.stringify(cartJson));
                    setCartData(cartJson);
                })
                .catch(function(error){
                    console.log(error);
                });
            });
        }       
        
    }
    function changePaymentMethod(payMethod){
        SetPayMethod(payMethod);
    }

    function PayNowButton(){
        if(PayMethod!=''){
            changePaymentMethod(PayMethod);
        }else{
            alert('Select Payment Method');
        }
    }
    return (
        <section className="container mtopcon">
            <div className="row">
                <div className="col-12 col-lg-4 reglogincon">
                    <div className="card shadow-sm border border-secondary border-opacity-10">
                        <div className="card-body">                        
                                <div className="row mb-3 text-center">
                                    <div className="col-md-12 mb-4">
                                        <button className="btn btn-outline-success border-0"><CheckCircle width='100px' height='100px' /></button>
                                    </div>
                                    <div className="col-12 mb-4">
                                        <h3>Thanks For The Order</h3>
                                        <h6>ORDER ID: {orderId}</h6>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className="card shadow-sm border border-secondary border-opacity-10 mt-4">
                        <div className="card-body">                            
                            <div className="col-12 mb-4">
                                <form>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" onChange={()=>changePaymentMethod('Paypal')} name="payMethod" id="flexRadioDefault1"/>
                                        <label className="form-check-label" for="flexRadioDefault1">
                                            Paypal
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" onChange={()=>changePaymentMethod('Stripe')} name="payMethod" id="flexRadioDefault1"/>
                                        <label className="form-check-label" for="flexRadioDefault1">
                                        Stripe
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" onChange={()=>changePaymentMethod('Intasend')} name="payMethod" id="flexRadioDefault1"/>
                                        <label className="form-check-label" for="flexRadioDefault1">
                                        Intasend (For Kenyans)
                                        </label>
                                    </div>                               
                                </form>
                                    <button type="submit" onClick={PayNowButton} className="col-12 btn btn-success mt-3">Proceed</button>
                                { PayMethod && 'paypal' &&
                                    <PayPalScriptProvider options={{"client-id":"AW14F9q000T2D1SkHvLRUN0sPh5BKy-x9a3eHXVlgFtUoukRan6fzsieYVI9xNUFk0xkyZff5OuycdO-"}}>
                                        <PayPalButtons className="mt-3"
                                            createOrder={(data, actions)=> {
                                                return actions.order.create({
                                                   purchase_units: [
                                                        {
                                                            amount:{
                                                                currency_code : 'USD',
                                                                value: orderAmount,
                                                            },
                                                        },
                                                   ] ,
                                                });
                                            }}
                                            onApprove={(data, actions) => {
                                                return actions.order.capture().then((details) => {
                                                    const name = details.payer.name.given_name;
                                                    updateOrderStatus(true);
                                                });
                                            }}
                                        />
                                    </PayPalScriptProvider>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ConfirmOrder;