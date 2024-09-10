import {Link} from 'react-router-dom';
import Sidebar from './sidebar';
import { useState,useEffect } from 'react';
function CustomerDashboard(){    
    const baseUrl = 'http://127.0.0.1:8000/';
    const customerId = localStorage.getItem('customer_id');
    const [CountList,setCountList]=useState({
        'totalAddress':0,
        'totalWishlist':0,
        'totalOrders':0
    });
    useEffect(()=>{
        fetchData(baseUrl+'api/customer/dashboard/'+customerId+'/');
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setCountList({
                'totalAddress':data.totalAddress,
                'totalWishlist':data.totalWishlist,
                'totalOrders':data.totalOrders,
            });
        });
    }

    return (
        <section className="container mtopcon">
            <div className="row">
                <div className="col-12 col-lg-3 mb-3">
                    <Sidebar/>
                </div>
                <div className="col-12 col-lg-9">
                    <div className="row">
                        <div className="col-12 col-lg-4 mb-3">
                            <div className="card text-center p-2">
                                <h6>Total Orders</h6>
                                <h4><Link to="/customer/orders">{CountList.totalOrders}</Link></h4>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 mb-3">
                            <div className="card text-center p-2">
                                <h6>Total Wishlist</h6>
                                <h4><Link to="/customer/wishlist">{CountList.totalWishlist}</Link></h4>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 mb-3">
                            <div className="card text-center p-2">
                                <h6>Total Addresses</h6>
                                <h4><Link to="/customer/addresses">{CountList.totalAddress}</Link></h4>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CustomerDashboard;