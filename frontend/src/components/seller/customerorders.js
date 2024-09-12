import axios from "axios";
import {Link} from 'react-router-dom';
import Sidebar from './sidebar';
import { CheckCircle, Loader} from 'react-feather';
import { useState,useContext,useEffect } from 'react';
import { CurrencyContext } from "../../context";
import { useParams } from "react-router-dom";
function SellerCustomerOrders(){
    const {customer_id}=useParams();
    const [OrderItems,setOrderItems]=useState([]);
    const baseUrl = 'http://127.0.0.1:8000';
    const vendorId = localStorage.getItem('vendor_id');

    const {CurrencyData}=useContext(CurrencyContext);

    useEffect(()=>{
        fetchData(`${baseUrl}/api/vendor/${vendorId}/customer/${customer_id}/orderitems`);
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
           setOrderItems(data.results);
        });
    }
    function changeOrderStatus(order_id,ord_status){
        //SUBMIT DATA
        axios.patch(baseUrl+'/api/order-modify/'+order_id,{
            "order_status":ord_status,
        })
        .then(function (response){
            fetchData(`${baseUrl}/api/vendor/${vendorId}/customer/${customer_id}/orderitems`);
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
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    OrderItems.map((item,index)=>{ 
                                        return <tr>
                                        <td>{index+1}</td>
                                        <td><Link to={`/product/${item.product.title}/${item.product.id}`}><img src={`${baseUrl}/${item.product.image}`} className="img-thumbnail" width="80"  alt="..."/><span className="p-4">{item.product.title}</span></Link></td>
                                        <td>
                                            {
                                                CurrencyData != 'usd' && <p className="card-title text-info">Ksh. {item.product.price}</p>
                                            }
                                            {
                                                CurrencyData == 'usd' && <p className="card-title text-info">${item.product.usd_price}</p>
                                            }
                                        </td> 
                                        <td>
                                            {
                                                item.order.order_status==true && <button className="btn btn-outline-success border-0"><CheckCircle /> {item.order.order_status}</button>
                                            }
                                            {
                                                item.order.order_status==false && <button className="btn btn-outline-warning border-0"><Loader /> {item.order.order_status}</button>
                                            }
                                        </td>
                                        <td>
                                            <div class="btn-group" role="group">
                                                <button type="button" class="btn btn-outline-dark btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                Change Status
                                                </button>
                                                <ul class="dropdown-menu">
                                                    {
                                                        item.order.order_status==true && <li><a class="dropdown-item" href="#">Completed</a></li>
                                                    }
                                                    {
                                                        item.order.order_status==false && <li><a onClick={()=>changeOrderStatus(item.order.id,true)} class="dropdown-item" href="#">Complete</a></li>
                                                    }                                                    
                                                </ul>
                                            </div>
                                        </td>
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

export default SellerCustomerOrders;