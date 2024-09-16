import {Link} from 'react-router-dom';
import { ShoppingCart} from 'react-feather';
import { useState,useEffect } from 'react';
import Sidebar from './sidebar';
function SellerDashboard(){   
    const baseUrl = 'http://127.0.0.1:8000/';
    const vendorId = localStorage.getItem('vendor_id');
    const [VendorData,setVendorData]=useState({
        'totalProducts':0,
        'totalOrders':0,
        'totalCustomers':0,
    });

    useEffect(()=>{
        fetchData(baseUrl+'api/vendor/'+vendorId+'/dashboard/');
    },[]);
    
    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setVendorData(data);
        });
    }
    console.log(VendorData);
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
                                <h6>Total Products</h6>
                                <h4><Link to="/seller/products">{VendorData.totalProducts}</Link></h4>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 mb-3">
                            <div className="card text-center p-2">
                                <h6>Total Orders</h6>
                                <h4><Link to="/seller/orders">{VendorData.totalOrders}</Link></h4>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 mb-3">
                            <div className="card text-center p-2">
                                <h6>Total Customers</h6>
                                <h4><Link to="/seller/customers">{VendorData.totalCustomers}</Link></h4>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SellerDashboard;