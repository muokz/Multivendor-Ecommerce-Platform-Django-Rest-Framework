import axios from "axios";
import {Link} from 'react-router-dom';
import { Download,CheckCircle, Loader, Star} from 'react-feather';
import { useState,useEffect } from 'react';
import { CurrencyContext } from "../context";
function Testimonial(props){
    const index = props.index;
    const item = props.item;

    var _class=''
    if(index == 0){
        _class='active'
    }

    
    var _stars=[];
    for(let i=0; i<item.rating; i++){
        _stars.push('1');
    }
    return (
        <div className={`carousel-item active ${_class}`}>
            <figure className="text-center">
            <blockquote className="blockquote">
                <p>{item.reviews}</p>
            </blockquote>
            <figcaption className="blockquote-footer">
                {
                    _stars.map((item,index)=> <Star />)
                }
                <cite title="Source Title ms-2" className="ms-2">
                    {`${item.customer.user.first_name} ${item.customer.user.last_name}`}
                </cite>
            </figcaption>
            </figure>
        </div>
    );
}

export default Testimonial;