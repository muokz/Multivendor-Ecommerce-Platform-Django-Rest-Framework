import {Link} from 'react-router-dom';
import logo from '../logo.svg';
import SingleProduct from './singleproduct';
import { ShoppingCart, Heart, GitBranch, Star, Facebook, Instagram} from 'react-feather';
import { useState,useEffect } from 'react';
import Testimonial from './testimonial';
import SingleSeller from './singleseller';
function Home(){
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [products,setProducts]=useState([]);
    const [ReviewList,setReviewList]=useState([]);
    const [VendorList,setVendorList]=useState([]);
    const [PopularProduct,setPopularProduct]=useState([]);
    const [PopularCategoryList,setPopularCategoryList]=useState([]);

    const imgStyle = {
        width: '100%',
        height: '10vw',
        objectFit: 'contain',
    };

    useEffect(()=>{
        fetchData(baseUrl+'/products/?fetch_limit=4');
        fetchTestimonialData(baseUrl+'/productrating/');
        fetchPopularVendors(baseUrl+'/vendors/?fetch_limit=4');
        fetchPopularProducts(baseUrl+'/products/?fetch_limit=4');
        fetchPopularCategoryList(baseUrl+'/categories/?fetch_limit=4');
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setProducts(data.results);
        });
    }
     function fetchTestimonialData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setReviewList(data.results);
        });
    }
    function fetchPopularVendors(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setVendorList(data.results);
        });
    }
    function fetchPopularProducts(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setPopularProduct(data.results);
        });
    }
    function fetchPopularCategoryList(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setPopularCategoryList(data.results);
        });
    }
    return (
        <main className="mtopcon">
            <div className="container">
                {/*latest products start*/}
                <h3 className="mb-4">Latest Products <a href='#' className="btn btn-sm btn-dark float-end"><Link className="nav-link active" aria-current="page" to="/products">View all</Link></a></h3>
                <div className="row mb-4">
                    {
                        products.map((product)=><SingleProduct product={product} />)
                    }                   
                </div>        
                {/*latest products end*/}
                
                {/*Categories start*/}
                <h3 className="mb-4">Popular Categories <a href='#' className="btn btn-sm btn-dark float-end"><Link className="nav-link active" aria-current="page" to="/categories">View all</Link></a></h3>
                <div className="row mb-4">
                    {
                        PopularCategoryList.map((category)=>{ 
                            return <div className="col-12 col-md-4 col-lg-3 mb-4">
                                    <div className="card shadow border-0">
                                        <img src={category.cat_img} style={imgStyle} className="card-img-top" alt="..."/>
                                        <div className="card-body">
                                            <h4 className="card-title"><Link className="nav-link active" aria-current="page" to="/">{category.title}</Link></h4>
                                        </div>
                                        <div className="card-footer border-0">
                                            Product Downloads : {category.total_downloads}
                                        </div>
                                    </div>
                                </div>
                        })
                    }                    

                </div>        
                {/*Categories end*/}

                {/*Products start*/}
                <h3 className="mb-4">Popular Products <a href='#' className="btn btn-sm btn-dark float-end"><Link className="nav-link active" aria-current="page" to="/products">View all</Link></a></h3>
                <div className="row mb-4">

                    {
                        PopularProduct.map((product)=><SingleProduct product={product} />)
                    } 
                    
                </div>        
                {/*Popular Products end*/}

                {/*Seller start*/}
                <h3 className="mb-4">Popular Seller <a href='#' className="btn btn-sm btn-dark float-end"><Link className="nav-link active" aria-current="page" to="/sellers">View all</Link></a></h3>
                <div className="row mb-4">
                    {
                        VendorList.map((vendor)=><SingleSeller seller={vendor} />)
                    }
                                
                </div>        
                {/*Seller end*/}
                
                {/*Rating start*/}
                <div id="carouselExampleIndicators" className="carousel slide my-4 bg-dark text-white p-5" data-bs-ride="true">
                <div className="carousel-indicators">
                    {
                        ReviewList.map((item,index)=>{ 
                            return <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className="active" aria-current="true" aria-label={index}></button>
                        })
                    }
                </div>
                <div className="carousel-inner">
                    {
                        ReviewList.map((item,index)=>{ 
                            return <Testimonial item={item} key={index} index={index} />
                        })
                    } 
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
                {/*Rating end*/}

                
            </div>
            </main>
    )
}

export default Home;
