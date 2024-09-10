import { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
function CustomerProfile(){
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [ProfileData,setProfileData]=useState({  
        "user_id":'', 
        "first_name":'',
        "last_name":'',
        "username":'',
        "email":'',
        "mobile":'',
        "p_image":'',
    });
    
    var customer_id=localStorage.getItem('customer_id');

    useEffect(()=>{
        fetchData(baseUrl+'/customer/'+customer_id);
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setProfileData({
                "user_id":data.user.id,
                "first_name":data.user.first_name,
                "last_name":data.user.last_name,
                "username":data.user.username,
                "email":data.user.email,
                "mobile":data.mobile,
                "p_image":data.profile_img,
            });
        });
    }

    const inputHandler =(event) => {
        setProfileData({
            ...ProfileData,
            [event.target.name]:event.target.value
        });
    };

    const handleFileChange =(event) => {
        setProfileData({
            ...ProfileData,
            [event.target.name]:event.target.files[0]
        })
    };

    const submitHandler =(event) => {
        const formData=new FormData();
            formData.append('user',ProfileData.user_id);
            formData.append('mobile',ProfileData.mobile);
            formData.append('profile_image',ProfileData.p_image);

            //SUBMIT DATA
            axios.put(baseUrl+'/customer/'+customer_id+'/',formData,{
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            })
            .then(function (response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            });

            const formUserData=new FormData();
            formUserData.append('first_name',ProfileData.first_name);
            formUserData.append('last_name',ProfileData.last_name);
            formUserData.append('username',ProfileData.username);
            formUserData.append('email',ProfileData.email);

            //SUBMIT DATA
            axios.put(baseUrl+'/user/'+ProfileData.user_id+'/',formUserData)
            .then(function (response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            });
    };

    return (
        <section className="container mtopcon">
            <div className="row">
                <div className="col-12 col-lg-3 mb-3">
                    <Sidebar/>
                </div>
                <div className="col-12 col-lg-9">
                    
                    <div className="card shadow-sm border border-secondary border-opacity-10">
                        <div className="card-header"><h5>Customer Profile</h5></div>
                        <div className="card-body">                        
                        <form>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label for="fnm" className="form-label">First Name</label>
                                        <input type="text" className="form-control" id="fnm" name='first_name' onChange={inputHandler} value={ProfileData.first_name} />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="lnm" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="lnm" name='last_name' onChange={inputHandler} value={ProfileData.last_name} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label for="lnm" className="form-label">User Name</label>
                                    <input type="text" className="form-control" id="lnm" name='username' onChange={inputHandler} value={ProfileData.username} />
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label for="InputEmail" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp"  name='email' onChange={inputHandler} value={ProfileData.email} />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="InputEmail" className="form-label">Phone No.</label>
                                        <input type="number" className="form-control" id="InputEmail" aria-describedby="emailHelp"  name='mobile' onChange={inputHandler} value={ProfileData.mobile} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label for="formFile" className="form-label">Profile Image</label>
                                    <p>
                                        <img src={ProfileData.p_image} width='100' className="mb-1"></img>
                                    </p>
                                    <input className="form-control" type="file" id="formFile" name='p_image' onChange={handleFileChange} />
                                </div>
                                <button type="button" onClick={submitHandler} className="col-12 btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CustomerProfile;