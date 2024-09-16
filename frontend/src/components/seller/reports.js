import {Link} from 'react-router-dom';
import Sidebar from './sidebar';
function SellerReports(){
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
                                <h6>Daily Reports</h6>
                                <h4><Link to="/seller/daily-report" className="btn btn-info">view</Link></h4>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 mb-3">
                            <div className="card text-center p-2">
                                <h6>Monthly Reports</h6>
                                <h4><Link to="/seller/monthly-report" className="btn btn-info">view</Link></h4>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 mb-3">
                            <div className="card text-center p-2">
                                <h6>Yearly Reports</h6>
                                <h4><Link to="/seller/yearly-report" className="btn btn-info">view</Link></h4>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SellerReports;