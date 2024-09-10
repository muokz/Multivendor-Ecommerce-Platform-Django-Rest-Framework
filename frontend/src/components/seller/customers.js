import logo from '../../logo.svg';
import {Link} from 'react-router-dom';
import { Trash2, Truck} from 'react-feather';
import Sidebar from './sidebar';
function SellerCustomers(){
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
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>JINA langu</td>
                                    <td>Ksh@gmail.com</td> 
                                    <td>254736376473837</td>
                                    <td>
                                        <Link to="/product/python-timer/123"><button className="btn btn-success border-0 ms-2"><Truck /></button></Link>
                                        <Link to="/product/python-timer/123"><button className="btn btn-danger border-0 ms-2"><Trash2 /></button></Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>JINA langu</td>
                                    <td>Ksh@gmail.com</td> 
                                    <td>254736376473837</td>
                                    <td>
                                        <Link to="/product/python-timer/123"><button className="btn btn-success border-0 ms-2"><Truck /></button></Link>
                                        <Link to="/product/python-timer/123"><button className="btn btn-danger border-0 ms-2"><Trash2 /></button></Link>
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

export default SellerCustomers;