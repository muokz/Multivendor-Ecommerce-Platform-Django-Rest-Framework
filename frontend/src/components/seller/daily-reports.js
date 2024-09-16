import Sidebar from './sidebar';
import { useState,useEffect } from 'react';
import Chart from "react-apexcharts";
function SellerDailyReports(){
    const [OrderItems,setOrderItems]=useState([]);
    const baseUrl = 'http://127.0.0.1:8000';
    const vendorId = localStorage.getItem('vendor_id');
    const [Dates,setDates]=useState([]);
    const [Data,setData]=useState([]);

    useEffect(()=>{
        fetch_report(`${baseUrl}/api/vendor/${vendorId}/`);
    },[]);
    
    function fetch_report(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
           setDates(data.show_chart_daily_orders.dates);
           setData(data.show_chart_daily_orders.data);
        });
    }
    const chartOptions = {
        options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: Dates
            }
          },
          series: [
            {
              name: "Orders",
              data: Data
            }
          ]
    };
    const chartElement=<Chart options={chartOptions.options} series={chartOptions.series} type="bar" width="500"
  />
    return (
        <section className="container mtopcon">
            <div className="row">
                <div className="col-12 col-lg-3 mb-3">
                    <Sidebar/>
                </div>
                <div className="col-12 col-lg-9">
                    <h4>Daily Reports</h4>
                    <div className="row mt-2">
                        {chartElement}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SellerDailyReports;