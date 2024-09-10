import {Link} from 'react-router-dom';
import logo from '../logo.svg';
import SingleProduct from './singleproduct';
import { ShoppingCart, Heart, GitBranch, Star, Facebook, Instagram} from 'react-feather';
import { useState,useEffect } from 'react';
function Home(){
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [products,setProducts]=useState([]);

    useEffect(()=>{
        fetchData(baseUrl+'/products/?fetch_limit=4');
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setProducts(data.results);
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
                <h3 className="mb-4">Popular Categories <a href='#' className="btn btn-sm btn-dark float-end">View all</a></h3>
                <div className="row mb-4">

                    <div className="col-12 col-md-4 col-lg-3 mb-4">
                    <div className="card shadow border-0">
                        <img src={logo} className="card-img-top" alt="..."/>
                        <div className="card-body">
                        <h4 className="card-title"><Link className="nav-link active" aria-current="page" to="/">Category title</Link></h4>
                        </div>
                        <div className="card-footer border-0">
                        Product Downloads : 237
                        </div>
                    </div>
                    </div> 

                </div>        
                {/*Categories end*/}

                {/*Products start*/}
                <h3 className="mb-4">Popular Products <a href='#' className="btn btn-sm btn-dark float-end">View all</a></h3>
                <div className="row mb-4">

                    <div className="col-12 col-md-4 col-lg-3 mb-4">
                    <div className="card shadow border-0">
                        <img src={logo} className="card-img-top" alt="..."/>
                        <div className="card-body">
                        <h4 className="card-title">Product title</h4>
                        <h5 className="card-title text-info">Price: Ksh. 999</h5>
                        </div>
                        <div className="card-footer border-0">
                        Product Downloads : 237
                        </div>
                    </div>
                    </div>
                    
                </div>        
                {/*Popular Products end*/}

                {/*Seller start*/}
                <h3 className="mb-4">Popular Seller <a href='#' className="btn btn-sm btn-dark float-end">View all</a></h3>
                <div className="row mb-4">

                    <div className="col-12 col-md-4 col-lg-3 mb-4">
                    <div className="card shadow border-0">
                        <img src={logo} className="card-img-top" alt="..."/>
                        <div className="card-body">
                        <h4 className="card-title">Seller title</h4>
                        </div>
                        <div className="card-footer border-0">
                        <GitBranch /> <a href='#'>Python</a>, <a href='#'>PHP</a>
                        </div>
                    </div>
                    </div> 
                                
                </div>        
                {/*Seller end*/}
                
                {/*Rating start*/}
                <div id="carouselExampleIndicators" className="carousel slide my-4 bg-dark text-white p-5" data-bs-ride="true">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <figure className="text-center">
                        <blockquote className="blockquote">
                            <p>1A well-known quote, contained n a blockquote element.</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            <Star /><Star /><Star /> <cite title="Source Title">Source Title1</cite>
                        </figcaption>
                        </figure>
                    </div>
                    <div className="carousel-item">
                        <figure className="text-center">
                        <blockquote className="blockquote">
                            <p>2A well-known quote, contained in a blockquote element.</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            <Star /><Star /><Star /> <cite title="Source Title">Source </cite>
                        </figcaption>
                        </figure>
                    </div>
                    <div className="carousel-item">
                        <figure className="text-center">
                        <blockquote className="blockquote">
                            <p>3A well-known quote, contained in a blockquote element.</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            <Star /><Star /><Star /> <cite title="Source Title">Source Title1</cite>
                        </figcaption>
                        </figure>
                    </div>
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
