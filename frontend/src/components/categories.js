import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import { useState,useEffect } from 'react';
function Categories(){
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [categories,setCategories]=useState([]);
    const [totalResult,setTotalResults]=useState(0);

    const imgStyle = {
        width: '100%',
        height: '10vw',
        objectFit: 'contain',
    };

    useEffect(()=>{
        fetchData(baseUrl+'/categories');
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setCategories(data.results);
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
        links.push(<li className="page-item"><Link onClick={()=>changeUrl(baseUrl+`/categories/?page=${i}`)} to={`/categories/?page=${i}`} className="page-link">{i}</Link></li>)
    }

    return (
        <section className="container mtopcon">
            <h3 className="mb-4">All Categories</h3>
                <div className="row mb-4">
                    {
                        categories.map((category)=>
                            <div className="col-12 col-md-4 col-lg-3 mb-4">
                                <div className="card shadow border-0">
                                    <img src={category.cat_img} style={imgStyle} className="card-img-top" alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title"><Link to={`/category/${category.title}/${category.id}`}>{category.title}</Link></h5>
                                    </div>
                                    <div className="card-footer border-0">
                                        Downloads : {category.total_downloads}
                                    </div>
                                </div>
                            </div> 
                        )
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

export default Categories;