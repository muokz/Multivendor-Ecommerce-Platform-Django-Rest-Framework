import axios from "axios";
import {Link} from 'react-router-dom';
import { Trash2} from 'react-feather';
import Sidebar from './sidebar';
import { useState,useEffect,useContext } from 'react';
import { CurrencyContext } from '../../context';
function CustomerWishlist(){
    const [WishItems,setWishItems]=useState([]);
    const baseUrl = 'http://127.0.0.1:8000/';
    const customerId = localStorage.getItem('customer_id');
    const {CurrencyData}=useContext(CurrencyContext);

    useEffect(()=>{
        fetchData(baseUrl+'api/customer/'+customerId+'/wishitems');
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setWishItems(data.results);
        });
    }

    function removeFromWishlist(wishlist_id){
        const formData=new FormData();
        formData.append('wishlist_id',wishlist_id);
        
        
        //SUBMIT DATA
        axios.post(baseUrl+'api/remove-from-wishlist/',formData)
        .then(function (response){
            if(response.data.bool==true){
                document.getElementById('row'+wishlist_id).remove();
            }   
        })
        .catch(function(error){
            console.log(error);
        });
        
    }

    return (
        <section className="container mtopcon">
            <div className="row">
                <div className="col-12 col-lg-3 mb-3">
                    <Sidebar/>
                </div>
                <div className="col-12 col-lg-9">
                <div className="table-responsive">
                        <table class="table border border-secondary border-opacity-10">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    WishItems.map((item,index)=>{ 
                                        return  <tr id={`row${item.id}`}>
                                            <th scope="row">{index+1}</th>
                                            <td><Link to={`/product/${item.product.title}/${item.product.id}`}><img src={`${baseUrl}/${item.product.image}`} className="img-thumbnail" width="80"  alt="..."/><span className="p-4">{item.product.title}</span></Link></td>
                                            <td>
                                                {
                                                    CurrencyData != 'usd' && <p className="card-title text-info">Ksh. {item.product.price}</p>
                                                }
                                                {
                                                    CurrencyData == 'usd' && <p className="card-title text-info">${item.product.usd_price}</p>
                                                }
                                            </td> 
                                            <td><button className="btn btn-outline-danger border-0" onClick={()=>removeFromWishlist(item.id)}><Trash2 /> Remove</button></td>
                                        </tr>
                                    })
                                } 
                                
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CustomerWishlist;