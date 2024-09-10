import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import { XCircle} from 'react-feather';
function OrderFailed(){
    return (
        <section className="container mtopcon">
            <div className="row">
                <div className="col-12 col-lg-4 reglogincon">
                    <div className="card shadow-sm border border-secondary border-opacity-10">
                        <div className="card-body">                        
                                <div className="row mb-3 text-center">
                                    <div className="col-md-12 mb-4">
                                        <button className="btn btn-outline-danger border-0"><XCircle width='100px' height='100px' /></button>
                                    </div>
                                    <div className="col-12 mb-4">
                                        <h3>There was a problem processing your request. Kindly Try again.</h3>
                                    </div>
                                    <div className="col-md-12">                                        
                                        <Link to="/"><button className="btn btn-info">Home</button></Link>
                                        <Link to="/customer/dashboard"><button className="btn btn-primary ms-4">Dashboard</button></Link>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OrderFailed;