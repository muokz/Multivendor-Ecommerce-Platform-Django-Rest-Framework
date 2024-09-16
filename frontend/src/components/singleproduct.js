import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import { ShoppingCart, Heart} from 'react-feather';
import { useState,useEffect, useContext } from 'react';
import { UserContext,CartContext,CurrencyContext } from '../context';
import axios from 'axios';
function SingleProduct(props){    
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [productData,setProductData]=useState([]);
    const [cartButtonClickStatus,setcartButtonClickStatus]=useState(false);
    const {cartData,setCartData}=useContext(CartContext);
    const userContext=useContext(UserContext);
    const [ProductInWishlist,setProductInWishlist]=useState(false);
    const product_id=props.product.id;
    const {CurrencyData}=useContext(CurrencyContext);

    if(!props.product.image){
        props.product.image=logo;
    }
    const imgStyle = {
        width: '100%',
        height: '10vw',
        objectFit: 'contain',
    };

    useEffect(()=>{
        checkProductInCart(product_id);
        checkProductInWishlist(baseUrl+'/check-in-wishlist/',product_id);
    },[]);

    function checkProductInCart(product_id){
        var previousCart=localStorage.getItem('cartData');
        var cartJson=JSON.parse(previousCart);
        if(cartJson!=null){
            cartJson.map((cart)=>{
                if(cart!=null && cart.product.id == product_id){
                    setcartButtonClickStatus(true);
                }
            });
        }
    }
    const cartAddButtonHandler = () => {
        let previousCart=localStorage.getItem('cartData');
        let cartJson=JSON.parse(previousCart);
        const cartData={
            'product':{
                'id':product_id,
                'title':productData.title,
                'image':productData.image,
                'price':productData.price,
                'usd_price':productData.usd_price,
            },
            'user':{
                'id':1,
            },
            'total_amount':0
        }
        if(cartJson!=null){
            cartJson.push(cartData);
            var cartString=JSON.stringify(cartJson);
            localStorage.setItem('cartData',cartString);
            setCartData(cartJson);
        }else{
            var newCartList=[];
            newCartList.push(cartData);
            var cartString=JSON.stringify(newCartList);
            localStorage.setItem('cartData',cartString);
        }        
        setcartButtonClickStatus(true);
    }
    const cartRemoveButtonHandler = () => {
        var previousCart=localStorage.getItem('cartData');
        var cartJson=JSON.parse(previousCart);
        cartJson.map((cart,index)=>{
            if(cart!=null && cart.product.id == product_id){
                cartJson.splice(index,1);
            }
        });
        var cartString=JSON.stringify(cartJson);
        localStorage.setItem('cartData',cartString);
        setcartButtonClickStatus(false);
        setCartData(cartJson);
    }

    function saveInWishlist(){
        const customerId = localStorage.getItem('customer_id');
        const formData=new FormData();
        formData.append('customer',customerId);
        formData.append('product',product_id);
        
        
        //SUBMIT DATA
        axios.post(baseUrl+'/wishlist/',formData)
        .then(function (response){
            if(response.data.id){
                setProductInWishlist(true);
            }   
        })
        .catch(function(error){
            console.log(error);
        });        
    }
    
    function checkProductInWishlist(baseurl,product_id){
        const customerId = localStorage.getItem('customer_id');
        const formData=new FormData();
        formData.append('customer',customerId);
        formData.append('product',product_id);        
        
        //SUBMIT DATA
        axios.post(baseurl,formData)
        .then(function (response){
            if(response.data.bool==true){
                setProductInWishlist(true);
            }else{setProductInWishlist(false);}    
        })
        .catch(function(error){
            console.log(error);
        });
        
    }

    return (
        <div className="col-12 col-md-4 col-lg-3 mb-4">
            <div className="card shadow-sm border border-secondary border-opacity-10">
                <Link to={`/product/${props.product.title}/${props.product.id}`}><img src={props.product.image} style={imgStyle} className="card-img-top" alt="..."/></Link>
                <div className="card-body">
                <h5 className="card-title"><Link to={`/product/${props.product.title}/${props.product.id}`}>{props.product.title}</Link></h5>
                {
                    CurrencyData != 'usd' && <h5 className="card-title text-info">Price: Ksh. {props.product.price}</h5>
                }
                {
                    CurrencyData == 'usd' && <h5 className="card-title text-info">Price: ${props.product.usd_price}</h5>
                }
                </div>
                <div className="card-footer border-0 p-3">
                        {!cartButtonClickStatus &&
                            <button type="button" onClick={cartAddButtonHandler} className="btn btn-info"><ShoppingCart /> Add to cart </button> 
                        }
                        {cartButtonClickStatus &&
                            <button type="button" onClick={cartRemoveButtonHandler} className="btn btn-warning"><ShoppingCart /> Remove From cart</button> 
                        }

                        {
                            (userContext && !ProductInWishlist) && 
                            <button onClick={saveInWishlist} className="btn btn-warning ms-3"><Heart /></button> 
                        }
                        {
                            (userContext && ProductInWishlist) && 
                            <button className="btn btn-secondary ms-3"><Heart /></button> 
                        }
                        {
                            userContext == null && <button className="btn btn-secondary ms-3 disabled"><Heart /></button>
                        }  
                </div>
            </div>
        </div>
    )
}

export default SingleProduct;