import Sidebar from './sidebar';
import { useState,useEffect } from 'react';
import OrderRow from "./orderrows";
function CustomerOrders(){
    const [OrderItems,setOrderItems]=useState([]);
    const baseUrl = 'http://127.0.0.1:8000/api';
    const customerId = localStorage.getItem('customer_id');

    useEffect(()=>{
        fetchData(baseUrl+'/customer/'+customerId+'/orderitems');
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
           setOrderItems(data.results);
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
                                        return <OrderRow item={item} key={index} index={index} />
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

export default CustomerOrders;