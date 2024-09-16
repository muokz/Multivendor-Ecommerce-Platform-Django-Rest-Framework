import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import SingleSeller from './singleseller';
import { useState,useEffect } from 'react';

function AllSellers(){
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [SellerList,setSellerList]=useState([]);
    const [totalResult,setTotalResults]=useState(0);

    useEffect(()=>{
        fetchData(baseUrl+'/vendors');
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setSellerList(data.results);
            setTotalResults(data.count);
        });
    }

    function changeUrl(baseurl){
        fetchData(baseurl);
    }

    var links=[];
    var limit=12;
    var totalLinks=totalResult/limit;
    for(let i=1; i<=totalLinks; i++){
        links.push(<li className="page-item"><Link onClick={()=>changeUrl(baseUrl+`/vendor/?page=${i}`)} to={`/products/?page=${i}`} className="page-link">{i}</Link></li>)
    }

      
    return (
        <section className="container mtopcon">
            <h3 className="mb-4">All Sellers</h3>
                <div className="row mb-4">
                    {
                        SellerList.map((seller)=><SingleSeller seller={seller} />)
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

export default AllSellers;