import logo from '../../logo.svg';
import {Link} from 'react-router-dom';
import { Download,CheckCircle, Loader, XCircle} from 'react-feather';
import Sidebar from './sidebar';
function SellerProfile(){
    return (
        <section className="container mtopcon">
            <div className="row">
                <div className="col-12 col-lg-3 mb-3">
                    <Sidebar/>
                </div>
                <div className="col-12 col-lg-9">
                    
                    <div className="card shadow-sm border border-secondary border-opacity-10">
                        <div className="card-header"><h5>Vendor Profile</h5></div>
                        <div className="card-body">                        
                            <form>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label for="fnm" className="form-label">First Name</label>
                                        <input type="text" className="form-control" id="fnm"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="lnm" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="lnm"/>
                                    </div>
                                </div>
                                    <div className="mb-3">
                                        <label for="lnm" className="form-label">User Name</label>
                                        <input type="text" className="form-control" id="lnm"/>
                                    </div>
                                <div className="mb-3">
                                    <label for="InputEmail" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label for="formFile" className="form-label">Profile Image</label>
                                    <input className="form-control" type="file" id="formFile"/>
                                </div>
                                <button type="submit" className="col-12 btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SellerProfile;