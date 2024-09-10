import {Link} from 'react-router-dom';
import { ShoppingCart} from 'react-feather';
import Sidebar from './sidebar';
function SellerDashboard(){
    return (
        <section className="container mtopcon">
            <div className="row">
                <div className="col-12 col-lg-3 mb-3">
                    <Sidebar/>
                </div>
                <div className="col-12 col-lg-9">
                    <div className="row">
                        <div className="col-12 col-lg-4 mb-3">
                            <div className="card text-center p-2">
                                <h6>Total Products</h6>
                                <h4><Link to="/">125</Link></h4>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 mb-3">
                            <div className="card text-center p-2">
                                <h6>Total Orders</h6>
                                <h4><Link to="/">125</Link></h4>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 mb-3">
                            <div className="card text-center p-2">
                                <h6>Total Customers</h6>
                                <h4><Link to="/">125</Link></h4>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SellerDashboard;