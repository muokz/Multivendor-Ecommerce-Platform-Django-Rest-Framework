import Sidebar from './sidebar';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
function AddReview(){    
    const baseUrl = 'http://127.0.0.1:8000/api';
    const {product_id} = useParams();
    var customer_id=localStorage.getItem('customer_id');
    const [ErrorMsg,setErrorMsg]=useState('');
    const [SuccessMsg,setSuccessMsg]=useState('');
    const [ReviewFormData,setReviewFormData]=useState({  
        "reviews":'', 
        "rating":1
    });
    const inputHandler =(event) => {
        setReviewFormData({
            ...ReviewFormData,
            [event.target.name]:event.target.value
        });
    };

    const submitHandler =() => {
        const formData=new FormData();
        formData.append('reviews',ReviewFormData.reviews);
        formData.append('rating',ReviewFormData.rating);
        formData.append('customer',customer_id);
        formData.append('product',product_id);

        //SUBMIT DATA
        axios.post(baseUrl+'/productrating/',formData)
        .then(function (response){
            if(response.status != 200){
                setSuccessMsg('');
                setErrorMsg('Data not saved');
            }else{
                setErrorMsg('');
                setSuccessMsg('Data saved');
                setReviewFormData({
                    'reviews':'',
                    'rating':''
                })
            }
            console.log(response);
        })
        .catch(function(error){
            console.log(error);
        });
    };

    const buttonEnable=(ReviewFormData.reviews!='')


    return (
        <section className="container mtopcon">
            <div className="row">
                <div className="col-12 col-lg-3 mb-3">
                    <Sidebar/>
                </div>
                <div className="col-12 col-lg-9">
                    
                    <div className="card shadow-sm border border-secondary border-opacity-10">
                        <div className="card-header"><h5>Add Reveiw</h5></div>
                        <div className="card-body"> 
                            {ErrorMsg && <p className='alert alert-danger'>{ErrorMsg}</p>}
                            {SuccessMsg && <p className='alert alert-success'>{SuccessMsg}</p>}       
                            <div className="mb-3">
                                <label for="InputEmail" className="form-label">Review</label>
                                <textarea className="form-control" name='reviews' onChange={inputHandler} value={ReviewFormData.reviews}></textarea>
                            </div>
                            <div className="mb-3">
                                <label for="InputEmail" className="form-label">Rating</label>
                                <select className="form-control" name='rating' onChange={inputHandler}>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                </select>
                            </div>
                            <button disabled={!buttonEnable} type="button" onClick={submitHandler} className="col-12 btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddReview;