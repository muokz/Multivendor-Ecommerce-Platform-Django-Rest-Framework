import axios from "axios";
import {Link} from 'react-router-dom';
import { Trash2, Truck} from 'react-feather';
import Sidebar from './sidebar';
import { useState,useEffect } from 'react';
function SellerCustomers(){
    const baseUrl = 'http://127.0.0.1:8000/';
    const vendorId = localStorage.getItem('vendor_id');
    const [CustomerList,setCustomerList]=useState([]);

    useEffect(()=>{
        fetchData(baseUrl+'api/vendor/'+vendorId+'/customers/');
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setCustomerList(data.results);
        });
    }
    function showConfirm(customer_id){
        var _confirm=window.confirm('Are your sure you want to delete?');
        if(_confirm){
            axios.delete(baseUrl+'api/delete-customer-orders/'+customer_id+'/')
            .then(function (response){
                if(response.bool==true){
                    fetchData(baseUrl+'api/seller/customer/'+customer_id+'/orderitems');
                 }
            })
            .catch(function(error){
                console.log(error);
            });
        }
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
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    CustomerList.map((item,index)=><tr>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.user.username}</td>
                                    <td>{item.user.email}</td> 
                                    <td>{item.customer.mobile}</td>
                                    <td>
                                        <Link to={`/seller/customer/${item.customer.id}/orderitems/`}><button className="btn btn-success border-0 ms-2"><Truck /></button></Link>
                                        <button onClick={()=>showConfirm(item.customer.id)} className="btn btn-danger border-0 ms-2"><Trash2 /></button>
                                    </td>
                                </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SellerCustomers;