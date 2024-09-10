import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContext, VendorContext } from './context';

const checkCustomer = localStorage.getItem('customer_login');
const checkVendor = localStorage.getItem('vendor_login');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <UserContext.Provider value={checkCustomer}>
          <VendorContext.Provider value={checkVendor}>
            <App />
          </VendorContext.Provider>          
        </UserContext.Provider>
    </Router>    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
