import {Link} from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import SingleProduct from './singleproduct';

function SellerDetail(){
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [ProductList,setProductList]=useState([]);
    const [VendorData,setVendorData]=useState({
        'profile_img':'',
        'user':{
            'username':'',
            'total_products':0
        }
    });
    const [totalResult,setTotalResults]=useState(0);
    const {seller_username,seller_id} = useParams();

    useEffect(()=>{
        fetchData(baseUrl+'/vendor-products/'+seller_id);
        fetchVendorData(baseUrl+'/vendor/'+seller_id);
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setProductList(data.results);
            setTotalResults(data.count);
        });
    }

    function fetchVendorData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setVendorData(data);
        });
    }

    function changeUrl(baseurl){
        fetchData(baseurl);
    }

    var links=[];
    var limit=12;
    var totalLinks=totalResult/limit;
    for(let i=1; i<=totalLinks; i++){
        links.push(<li className="page-item"><Link className="page-link">{i}</Link></li>)
    }

      
    return (
        <section className="container mtopcon">
            <h6 className="mb-4"> SHOP</h6>
                <div className="row mb-4">
                    <div className="col-12 col-md-4 col-lg-3 mb-4">
                        <div className="card shadow border-0">
                            <img src={VendorData.profile_img} className="card-img-top" height='180px' alt="..."/>
                            <div className="card-body">
                                <h4 className="card-title">Shop Name : {VendorData.user.username}</h4>
                                <h4 className="card-title">products : {VendorData.total_products}</h4>
                            </div>
                        </div>
                    </div>                    
                </div>
                <div className="row mb-4">
                    {
                        ProductList.map((product)=><SingleProduct product={product} />)
                    }

                </div>  
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {links}
                    </ul>
                </nav>  
        </section>
    )
}

export default SellerDetail;