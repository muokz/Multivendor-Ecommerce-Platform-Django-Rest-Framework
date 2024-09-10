import logo from '../../logo.svg';
import {Link} from 'react-router-dom';
import { Download,CheckCircle, Loader, XCircle} from 'react-feather';
import Sidebar from './sidebar';
function SellerChangePassword(){
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
                            <form>
                                <div className="mb-3">
                                    <label for="lnm" className="form-label">New Password</label>
                                    <input type="password" className="form-control" id="lnm"/>
                                </div>
                                <div className="mb-3">
                                    <label for="InputEmail" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="lnm"/>
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

export default SellerChangePassword;