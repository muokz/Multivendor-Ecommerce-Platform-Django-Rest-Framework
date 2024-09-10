import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import SingleProduct from './singleproduct';
import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";

function TagProducts(){
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [products,setProducts]=useState([]);
    const [totalResult,setTotalResults]=useState(0);
    const {tag} = useParams();

    useEffect(()=>{
        fetchData(baseUrl+'/products/'+tag);
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setProducts(data.results);
            setTotalResults(data.count);
        });
    }

    function changeUrl(baseurl){
        fetchData(baseurl);
    }

    var links=[];
    var limit=1;
    var totalLinks=totalResult/limit;
    for(let i=1; i<=totalLinks; i++){
        links.push(<li className="page-item"><Link onClick={()=>changeUrl(baseUrl+`/products/${tag}&page=${i}`)} to={`/products/${tag}/?page=${i}`} className="page-link">{i}</Link></li>)
    }

      
    return (
        <section className="container mtopcon">
            <h3 className="mb-4">Tags Products</h3>
                <div className="row mb-4">
                    {
                        products.map((product)=><SingleProduct product={product} />)
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

export default TagProducts;