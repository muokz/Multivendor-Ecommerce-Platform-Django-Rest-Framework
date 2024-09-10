import logo from '../logo.svg';
import paypallogo from '../paypal.png';
import {Link} from 'react-router-dom';
import { ShoppingBag, CreditCard, Trash2} from 'react-feather';
import { useContext, useState } from 'react';
import { CartContext,CurrencyContext } from '../context';
function Checkout(){
    const {cartData,setCartData}=useContext(CartContext);
    const [cartButtonClickStatus,setcartButtonClickStatus]=useState(false);
    const [productData,setProductData]=useState([]);
    const {CurrencyData}=useContext(CurrencyContext);
    if(cartData == null || cartData.length==0){
        var cartItems=0;
    }else{
        var cartItems=cartData.length;
        var sum=0;
        cartData.map((item,index)=>{
            if(CurrencyData=='ksh' || CurrencyData==undefined){
                sum+=parseFloat(item.product.price);
            }else if(CurrencyData=='usd'){
                sum+=parseFloat(item.product.usd_price);
            }           
        });
    }

  

    const cartRemoveButtonHandler = (product_id) => {
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
    return (
        <section className="container mtopcon">
            {cartItems!=0 &&
                <div className="row">  
                <h3 className="mb-4">Cart ({cartItems })</h3>
                    <div className="col-12 col-md-7 col-lg-7">  
                        <div className="table-responsive">
                            <table class="table border border-secondary border-opacity-10">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {cartData &&
                                    cartData.map((item,index)=>{
                                        return (
                                            <tr>
                                                <th scope="row">{index+1}</th>
                                                <td><Link to={`/product/${item.product.title}/${item.product.id}`}><img src={item.product.image} className="img-thumbnail" width="80"  alt="..."/><span className="p-4">{item.product.title}</span></Link></td>
                                                
                                                {
                                                    CurrencyData != 'usd' && <td>Ksh {item.product.price}</td>
                                                }
                                                {
                                                    CurrencyData == 'usd' && <td>$ {item.product.usd_price}</td>
                                                }
                                                <td>
                                                    <button type="button" onClick={()=>cartRemoveButtonHandler(item.product.id)} className="btn btn-warning mb-3"><Trash2 /></button> 
                                                </td>
                                            </tr>
                                        )
                                        
                                    })
                                }                                
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>Total</th>                                        
                                        {
                                            CurrencyData != 'usd' && <th>Ksh {sum}</th>
                                        }
                                        {
                                            CurrencyData == 'usd' && <th>$ {sum}</th>
                                        }
                                    </tr>
                                    <tr>
                                        <td colspan="4" align='right'>
                                            <Link to="/categories"><button className="btn btn-info">Continue Shopping <ShoppingBag /></button></Link>
                                            <Link to="/confirm-order"><button className="btn btn-warning ms-4">Proceed to Checkout <CreditCard /></button></Link>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 col-md-5 col-lg-5">
                        <img src={paypallogo} className="card-img-top" alt="..."/>
                    </div>
                </div>
            }  
            {!cartItems!=0 && 
                <div className="row text-center"> 
                    <h3 className="mb-4 text-warning ">Cart is empty</h3>                 
                    <Link to="/categories"><button className="btn btn-info">Continue Shopping <ShoppingBag /></button></Link>
                </div>
            } 
        </section>
    )
}

export default Checkout;