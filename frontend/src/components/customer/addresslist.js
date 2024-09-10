import {Link} from 'react-router-dom';
import { CheckCircle, PlusCircle} from 'react-feather';
import Sidebar from './sidebar';
import { useState,useEffect,useContext } from 'react';
import axios from 'axios';
function CustomerAddressList(){
    const [AddressList,setAddressList]=useState([]);
    const baseUrl = 'http://127.0.0.1:8000/';
    const customerId = localStorage.getItem('customer_id');

    useEffect(()=>{
        fetchData(baseUrl+'api/customer/'+customerId+'/address-list/');
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setAddressList(data.results);
        });
    }
    function DefaultAddressHandler(address_id){
        const formData=new FormData();
        formData.append('address_id',address_id);

        //SUBMIT DATA
        axios.post(baseUrl+'api/mark-default-address/'+address_id+'/',formData)
        .then(function (response){
            if(response.data.bool == true){
               window.location.reload();
            }else{
                
            }
            console.log(response);
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
                    <div className="row"><Link to="/customer/addaddress"><button className="btn btn-outline-success mb-3 float-end"><PlusCircle/> Add New Address</button></Link></div>
                    <div className="row">
                        {
                            AddressList.map((address,index)=>{
                               return <div className="col-12 col-lg-3 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            
                                            <h6>
                                                {address.default_address && <p role='button' className='text-success'><CheckCircle/></p>}  
                                                {!address.default_address && <p role='button' onClick={()=>DefaultAddressHandler(address.id)} className='text-secondary'><CheckCircle/></p>}                                              
                                                <Link to={`/customer/update-address/${address.id}`}>{address.address}</Link>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            })
                        }                      

                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default CustomerAddressList;