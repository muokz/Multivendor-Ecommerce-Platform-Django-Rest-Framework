import axios from "axios";
import {Link} from 'react-router-dom';
import { Download,CheckCircle, Loader} from 'react-feather';
import { useState,useContext } from 'react';
import { CurrencyContext } from "../../context";
function OrderRow(props){
    const baseUrl = 'http://127.0.0.1:8000/';
    const index = props.index;
    const item = props.item;
    const {CurrencyData}=useContext(CurrencyContext);

    
    const [TotalDownloads,setTotalDownloads]=useState(item.product.downloads);

    const countDownloads = (product_id)=>{
        const formData=new FormData();
        formData.append('product_id',product_id);

        //SUBMIT DATA
        axios.post(baseUrl+'api/update_product_download_count/'+product_id)
        .then(function (response){
            if(response.data.bool==true){
                setTotalDownloads(++item.product.downloads);
                window.open(
                    baseUrl+item.product.product_file,
                    '_blank'
                );
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }

    return (
        <tr>
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
                {
                    item.order.order_status==true && <button target='_blank' onClick={()=>countDownloads(item.product.id)} className='btn btn-primary btn-sm border-0'><Download /> Download <span className='badge text-dark bg-white'>{TotalDownloads}</span> </button>
                }                                                
            </td>
        </tr>
    );
}

export default OrderRow;