import logo from '../../logo.svg';
import {Link} from 'react-router-dom';
import { CheckCircle, Loader} from 'react-feather';
import Sidebar from './sidebar';
function SellerOrders(){
    return (
        <section className="container mtopcon">
            <div className="row">
                <div className="col-12 col-lg-3 mb-3">
                    <Sidebar/>
                </div>
                <div className="col-12 col-lg-9">
                <div className="table-responsive">
                        <table class="table border border-secondary border-opacity-10">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td><Link to="/product/python-timer/123"><img src={logo} className="img-thumbnail" width="80"  alt="..."/><span className="p-4">Mark</span></Link></td>
                                    <td>Ksh 200</td> 
                                    <td><Link to="/product/python-timer/123"><button className="btn btn-outline-success border-0"><CheckCircle /> Complete</button></Link></td>
                                    <td>
                                        <div class="btn-group" role="group">
                                            <button type="button" class="btn btn-outline-dark btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            Change Status
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><Link to="/product/python-timer/123" class="dropdown-item" href="#">Approved</Link></li>
                                                <li><Link to="/product/python-timer/123" class="dropdown-item" href="#">Sent</Link></li>
                                                <li><Link to="/product/python-timer/123" class="dropdown-item" href="#">Complete</Link></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td><Link to="/product/python-timer/123"><img src={logo} className="img-thumbnail" width="80"  alt="..."/><span className="p-4">Mark</span></Link></td>
                                    <td>Ksh 200</td> 
                                    <td><Link to="/product/python-timer/123"><button className="btn btn-outline-warning border-0"><Loader /> Processing</button></Link></td>
                                    <td>
                                        <div class="btn-group" role="group">
                                            <button type="button" class="btn btn-outline-dark btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            Change Status
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><Link to="/product/python-timer/123" class="dropdown-item" href="#">Approved</Link></li>
                                                <li><Link to="/product/python-timer/123" class="dropdown-item" href="#">Sent</Link></li>
                                                <li><Link to="/product/python-timer/123" class="dropdown-item" href="#">Complete</Link></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SellerOrders;