import axios from "axios";
import {Link} from 'react-router-dom';
import {useState} from "react";
function SellerRegister(props){
    const baseUrl = 'http://127.0.0.1:8000/api/';
    const [formError,setFormError]=useState(false);
    const [errorMsg,seterrorMsg]=useState('');
    const [successMsg,setsuccessMsg]=useState('');
    const [registerFormData, setRegisterFormData]=useState({
        "first_name":'',
        "last_name":'',
        "username":'',
        "email":'',
        "mobile":'',
        "address":'',
        "password":'',
    });

    const inputHandler =(event) => {
        setRegisterFormData({
            ...registerFormData,
            [event.target.name]:event.target.value
        })
    };

    const submitHandler =(event) => {
        const formData=new FormData();
        formData.append('first_name',registerFormData.first_name);
        formData.append('last_name',registerFormData.last_name);
        formData.append('username',registerFormData.username);
        formData.append('email',registerFormData.email);
        formData.append('mobile',registerFormData.mobile);
        formData.append('address',registerFormData.address);
        formData.append('password',registerFormData.password);

        //SUBMIT DATA
        axios.post(baseUrl+'vendor/register/',formData)
        .then(function (response){
            if(response.data.bool==false){                    
                seterrorMsg(response.data.user)
                setsuccessMsg('');
            }else{
                setRegisterFormData({
                    "first_name":'',
                    "last_name":'',
                    "username":'',
                    "email":'',
                    "mobile":'',
                    "address":'',
                    "password":'',
                });
                seterrorMsg('');
                setsuccessMsg(response.data.msg);
            }
        })
        .catch(function(error){
            console.log(error);
        });
    };

    const buttonEnable=(registerFormData.first_name!='') && (registerFormData.last_name!='') && (registerFormData.username!='') && (registerFormData.email!='') && (registerFormData.mobile!='') && (registerFormData.address!='') && (registerFormData.password!='')

    return (
        <section className="container mtopcon">
            <div className="row">
                <div className="col-12 col-lg-4 reglogincon">
                    <div className="card shadow-sm border border-secondary border-opacity-10">
                        <div className="card-header"><h5>Register</h5></div>
                        <div className="card-body"> 
                                <p className="text-muted"><b>Note:</b> All fields are required.</p> 
                                {successMsg && <p className="text-success"><b>{successMsg}</b></p> } 
                                {errorMsg && <p className="text-danger"><b>{errorMsg}</b></p> }                      
                            <form>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label for="fnm" className="form-label">First Name</label>
                                        <input type="text" name="first_name" onChange={inputHandler} value={registerFormData.first_name} className="form-control" id="fnm"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="lnm" className="form-label">Last Name</label>
                                        <input type="text" name="last_name" onChange={inputHandler} value={registerFormData.last_name} className="form-control" id="lnm"/>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label for="lnm" className="form-label">User Name</label>
                                    <input type="text" name="username" onChange={inputHandler} value={registerFormData.username} className="form-control" id="lnm"/>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label for="InputEmail" className="form-label">Email</label>
                                        <input type="email" name="email" onChange={inputHandler} value={registerFormData.email} className="form-control" id="InputEmail" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="InputEmail" className="form-label">Phone No.</label>
                                        <input type="number" name="mobile" placeholder="254724000000" onChange={inputHandler} value={registerFormData.mobile} className="form-control"/>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label for="InputEmail" className="form-label">Address</label>
                                    <textarea type="text" name="address" onChange={inputHandler} value={registerFormData.address} className="form-control"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="InputPassword1" className="form-label">Password</label>
                                    <input type="password" name="password" onChange={inputHandler} value={registerFormData.password} className="form-control" id="InputPassword1"/>
                                </div>
                                <div className="mb-3 form-check">
                                    <p>Already have an account? <Link to="/seller/login">Login</Link></p>
                                </div>                                
                                <button type="button" disabled={!buttonEnable} onClick={submitHandler} className="col-12 btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SellerRegister;