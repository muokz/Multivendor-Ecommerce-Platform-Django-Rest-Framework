import axios from "axios";
import {Link} from 'react-router-dom';
import { CheckCircle, Loader, PlusCircle, Edit, Trash} from 'react-feather';
import Sidebar from './sidebar';
import { useState,useEffect,useContext } from 'react';
import { CurrencyContext } from "../../context";
function SellerProducts(){
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [ProductData,setProductData]=useState([]);
    const {CurrencyData}=useContext(CurrencyContext);

    useEffect(()=>{
        fetchData(baseUrl+'/products');
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setProductData(data.results);
        });
    }
    function showConfirm(product_id){
        var _confirm=window.confirm('Are your sure you want to delete?');
        if(_confirm){
            axios.delete(baseUrl+'/product/'+product_id+'/')
            .then(function (response){
                if(response.status==204){
                    fetchData(baseUrl+'/products');
                 }
            })
            .catch(function(error){
                console.log(error);
            });
        }
    }
    console.log(ProductData);
    return (
        <section className="container mtopcon">
            <div className="row">
                <div className="col-12 col-lg-3 mb-3">
                    <Sidebar/>
                </div>
                <div className="col-12 col-lg-9">
                    <div className="row"><Link to="/seller/addproduct"><button className="btn btn-outline-success mb-3 float-end"><PlusCircle/> Add New Product</button></Link></div>         
                <div className="table-responsive">
                        <table class="table table-striped border-secondary border-opacity-10">
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
                                    ProductData.map((product,index)=>{ 
                                        return <tr>
                                            <th scope="row">{index+1}</th>
                                            <td><Link to={`/product/${product.title}/${product.id}`}><img src={`${product.image}`} className="img-thumbnail" width="80"  alt="..."/><span className="p-4">{product.title}</span></Link></td>
                                            {
                                                CurrencyData != 'usd' && <td>Ksh. {product.price}</td>
                                            }
                                            {
                                                CurrencyData == 'usd' && <td>${product.usd_price}</td>
                                            } 
                                            <td>
                                                {
                                                    !product.publish_status && <button className="btn btn-outline-warning border-0"><Loader /> Pending</button>
                                                }
                                                {
                                                    product.publish_status && <button className="btn btn-outline-success border-0"><CheckCircle /> Complete</button>
                                                }
                                            </td>
                                            <td>
                                                <Link to={`/seller/update-product/${product.id}`}><button className="btn btn-success border-0 ms-2"><Edit /></button></Link>
                                                <button onClick={()=>showConfirm(product.id)} className="btn btn-danger border-0 ms-2"><Trash /></button>
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

export default SellerProducts;