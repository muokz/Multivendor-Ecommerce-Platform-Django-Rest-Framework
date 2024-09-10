import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import { ShoppingCart, Heart} from 'react-feather';
import { useContext } from 'react';
import { CurrencyContext } from '../context';
function SingleProduct(props){
    const {CurrencyData}=useContext(CurrencyContext);
    return (
        <div className="col-12 col-md-4 col-lg-3 mb-4">
            <div className="card shadow-sm border border-secondary border-opacity-10">
                <Link to={`/product/${props.product.title}/${props.product.id}`}><img src={props.product.image} className="card-img-top" alt="..."/></Link>
                <div className="card-body">
                <h5 className="card-title"><Link to={`/product/${props.product.title}/${props.product.id}`}>{props.product.title}</Link></h5>
                {
                    CurrencyData != 'usd' && <h5 className="card-title text-info">Price: Ksh. {props.product.price}</h5>
                }
                {
                    CurrencyData == 'usd' && <h5 className="card-title text-info">Price: ${props.product.usd_price}</h5>
                }
                </div>
                <div className="card-footer border-0 p-3">
                    <button className="btn btn-info"><ShoppingCart /></button> 
                    <button className="btn btn-warning ms-3"><Heart /></button>  
                </div>
            </div>
        </div>
    )
}

export default SingleProduct;