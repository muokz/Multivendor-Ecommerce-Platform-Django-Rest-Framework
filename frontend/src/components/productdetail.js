import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import { ShoppingCart, Heart, CreditCard, Monitor} from 'react-feather';
import SingleProduct from './singleproduct';
import { useState,useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { UserContext,CartContext,CurrencyContext } from '../context';
import axios from 'axios';

function ProductDetail(){    
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [productData,setProductData]=useState([]);
    const [productImgs,setProductImgs]=useState([]);
    const [productTags,setProductTags]=useState([]);
    const [relatedProducts,setrelatedProduct]=useState([]);
    const {product_slug,product_id} = useParams();
    const [cartButtonClickStatus,setcartButtonClickStatus]=useState(false);
    const {cartData,setCartData}=useContext(CartContext);
    const userContext=useContext(UserContext);
    const [ProductInWishlist,setProductInWishlist]=useState(false);
    
    const {CurrencyData}=useContext(CurrencyContext);

    useEffect(()=>{
        fetchData(baseUrl+'/product/'+product_id);
        fetchRelatedData(baseUrl+'/related-products/'+product_id);
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

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setProductData(data);
            setProductImgs(data.product_imgs);
            setProductTags(data.tag_list);
        });
    }

    function fetchRelatedData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setrelatedProduct(data.results);
        });
    }

    const tagLinks=[]
    for (let i = 0; i < productTags.length; i++) {
        let tag=productTags[i].trim();
        tagLinks.push(<Link to={`/products/${tag}`}><span className="badge rounded-pill text-bg-secondary ms-1 p-2">{tag}</span></Link>)       
    }
    const cartAddButtonHandler = () => {
        let previousCart=localStorage.getItem('cartData');
        let cartJson=JSON.parse(previousCart);
        const cartData={
            'product':{
                'id':productData.id,
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
            if(cart!=null && cart.product.id == productData.id){
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
        formData.append('product',productData.id);
        
        
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
        <section className="container mtopcon">
            <div className="row">
                <div className="col-12 col-md-5 col-lg-5">                    
                    <div className="col-12 shadow-sm border border-secondary border-opacity-10 rounded-3">
                        <div id="carouselExampleIndicators11" className="carousel carousel-dark slide my-4 bg-white text-dark" data-bs-ride="true">
                         <div className="carousel-indicators">
                            {
                                productImgs.map((img,index)=>{
                                    if(index===0){
                                        return <button type="button" data-bs-target="#carouselExampleIndicators11" data-bs-slide-to={index} className="active" aria-current="true" aria-label="Slide 1"></button>                            
                                    }else{
                                        return <button type="button" data-bs-target="#carouselExampleIndicators11" data-bs-slide-to={index} aria-current="true" aria-label="Slide 1"></button>                                              
                                    }
                                })
                            }
                        </div>
                        <div className="carousel-inner">
                            {
                                productImgs.map((img,index)=>{
                                    if(index===0){
                                        return <div className="carousel-item active">
                                                    <div className="row mb-5">
                                                        <img src={img.image} className="card-img-top" alt={index}/>
                                                    </div>
                                                </div>                            
                                    }else{
                                        return <div className="carousel-item">
                                                    <div className="row mb-5">
                                                        <img src={img.image} className="card-img-top" alt={index}/>
                                                    </div>
                                                </div>                                                
                                    }
                                    
                                })
                            }
                        </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-7 col-lg-7 p-4">
                    <h3>{productData.title}</h3>
                    <p>{productData.detail}</p>
                    {
                        CurrencyData != 'usd' && <h5 className="card-title text-info">Price: Ksh. {productData.price}</h5>
                    }
                    {
                        CurrencyData == 'usd' && <h5 className="card-title text-info">Price: ${productData.usd_price}</h5>
                    }
                    
                    <Link to="#"><button className="btn btn-dark mt-4"><Monitor /> Demo</button></Link> 
                    {
                        (userContext && !ProductInWishlist) && 
                        <Link to="#"><button onClick={saveInWishlist} className="btn btn-warning ms-3 mt-4"><Heart /></button></Link> 
                    }
                    {
                        (userContext && ProductInWishlist) && 
                        <Link to="#"><button className="btn btn-secondary ms-3 mt-4"><Heart /></button></Link> 
                    }
                    {
                        userContext == null && <Link to="#"><button className="btn btn-secondary ms-3 mt-4 disabled"><Heart /></button></Link> 
                    }
                    <div className="card-footer border-0 mt-4">
                        {!cartButtonClickStatus &&
                            <button type="button" onClick={cartAddButtonHandler} className="btn btn-info mb-3"><ShoppingCart />Add to cart </button> 
                        }
                        {cartButtonClickStatus &&
                            <button type="button" onClick={cartRemoveButtonHandler} className="btn btn-warning mb-3"><ShoppingCart /> Remove From cart</button> 
                        }
                        <button type="button" className="btn btn-danger ms-3 mb-3"><CreditCard /> Buy Now</button>
                    </div>
                    <div className="card-footer border-0 mt-4"> 
                    <h5>Tags</h5>            
                        {tagLinks}  
                    </div>
                </div>
                {/*Related pros start*/}
                <div className="col-12 mt-5">
                        
                    <h3>Related Projects</h3><br/>
                    
                    <div className="row mb-5">
                            {
                                relatedProducts.map((product)=><SingleProduct product={product} />)
                            }
                    </div>
                </div>
                {/*Related pros end*/}
            </div>
        </section>
    )
}

export default ProductDetail;