import { useState } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
function CustomerChangePassword(){
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [PasswordData,setPasswordData]=useState({  
        "password":'', 
        "c_password":'', 
    });
    const [ConfirmError,setConfirmError]=useState(false);
    var customer_id=localStorage.getItem('customer_id');

    const inputHandler =(event) => {
        setPasswordData({
            ...PasswordData,
            [event.target.name]:event.target.value
        });
    };

    const submitHandler =(event) => {
        if(PasswordData.password != PasswordData.c_password){
            setConfirmError(true);
        }else{
            setConfirmError(false);
            const formData=new FormData();
            formData.append('password',PasswordData.password);

            //SUBMIT DATA
            axios.post(baseUrl+'/customer-change-password/'+customer_id+'/',formData)
            .then(function (response){
                window.location.reload();
            })
            .catch(function(error){
                console.log(error);
            });
        }
           
    };

    return (
        <section className="container mtopcon">
            <div className="row">
                <div className="col-12 col-lg-3 mb-3">
                    <Sidebar/>
                </div>
                <div className="col-12 col-lg-9">
                    
                    <div className="card shadow-sm border border-secondary border-opacity-10">
                        <div className="card-header"><h5>Change Password</h5></div>
                        <div className="card-body">      
                            {
                                ConfirmError && <p className='text-danger'>Passwords dont match</p>
                            }       
                                <div className="mb-3">
                                    <label for="lnm" className="form-label">New Password</label>
                                    <input type="password" value={PasswordData.password} onChange={inputHandler} name='password' className="form-control" id="lnm"/>
                                </div>
                                <div className="mb-3">
                                    <label for="InputEmail" className="form-label">Confirm Password</label>
                                    <input type="password" value={PasswordData.c_password} onChange={inputHandler} name='c_password' className="form-control" id="lnm"/>
                                </div>
                                <button type="submit" onClick={submitHandler}  className="col-12 btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CustomerChangePassword;