import {Routes,Route} from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'; 

import Home from './components/home';
import Header from './components/header';
import Footer from './components/footer';
import Categories from './components/categories';
import ProductDetail from './components/productdetail';
import CategoryProducts from './components/CategoryProducts';
import TagProducts from './components/tagproducts';
import AllProducts from './components/allproducts';
import Checkout from './components/checkout';
import OrderSuccess from './components/ordersuccess';
import OrderFailed from './components/orderfailed';

import CustomerRegister from './components/customer/register';
import CustomerLogin from './components/customer/login';
import CustomerLogout from './components/customer/logout';
import CustomerDashboard from './components/customer/dashboard';
import CustomerOrders from './components/customer/orders';
import CustomerWishlist from './components/customer/wishlist';
import CustomerProfile from './components/customer/profile';
import CustomerChangePassword from './components/customer/change-password';
import CustomerAddressList from './components/customer/addresslist';
import CustomerAddAddress from './components/customer/addaddress';
import CustomerUpdateAddress from './components/customer/updateaddress';

import SellerRegister from './components/seller/register';
import SellerLogin from './components/seller/login';
import SellerLogout from './components/seller/logout';
import SellerDashboard from './components/seller/dashboard';
import SellerProducts from './components/seller/products';
import AddProduct from './components/seller/addproduct';
import UpdateProduct from './components/seller/update-product';
import SellerOrders from './components/seller/orders';
import SellerCustomers from './components/seller/customers';
import SellerReports from './components/seller/reports';
import SellerProfile from './components/seller/profile';
import SellerChangePassword from './components/seller/change-password';

import { CartContext, CurrencyContext } from './context';
import {useState} from 'react';
import ConfirmOrder from './components/confirmorder';
const checkCart=localStorage.getItem('cartData');
const currentCurrency=localStorage.getItem('currency');

function App() {
  const [cartData,setCartData]=useState(JSON.parse(checkCart));
  const [CurrencyData, setCurrencyData]=useState(currentCurrency);
  return (
    <CurrencyContext.Provider value={{CurrencyData,setCurrencyData}}>    
    <CartContext.Provider value={{cartData,setCartData}}>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/categories' element={<Categories/>} />
        <Route path='/products' element={<AllProducts/>} />
        <Route path='/category/:category_slug/:category_id' element={<CategoryProducts/>} />
        <Route path='/products/:tag' element={<TagProducts/>} />
        <Route path='/product/:product_slug/:product_id' element={<ProductDetail/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/confirm-order' element={<ConfirmOrder/>} />
        <Route path='/order/success' element={<OrderSuccess/>} />
        <Route path='/order/failed' element={<OrderFailed/>} />

        <Route path='/customer/register' element={<CustomerRegister/>} />
        <Route path='/customer/login' element={<CustomerLogin/>} />
        <Route path='/customer/logout' element={<CustomerLogout/>} />
        <Route path='/customer/dashboard' element={<CustomerDashboard/>} />
        <Route path='/customer/orders' element={<CustomerOrders/>} />
        <Route path='/customer/wishlist' element={<CustomerWishlist/>} />
        <Route path='/customer/profile' element={<CustomerProfile/>} />
        <Route path='/customer/change-password' element={<CustomerChangePassword/>} />
        <Route path='/customer/addresses' element={<CustomerAddressList/>} />
        <Route path='/customer/addaddress' element={<CustomerAddAddress/>} />
        <Route path='/customer/update-address/:address_id' element={<CustomerUpdateAddress/>} />
        
        <Route path='/seller/register' element={<SellerRegister/>} />
        <Route path='/seller/login' element={<SellerLogin/>} />
        <Route path='/seller/logout' element={<SellerLogout/>} />
        <Route path='/seller/dashboard' element={<SellerDashboard/>} />
        <Route path='/seller/products' element={<SellerProducts/>} />
        <Route path='/seller/addproduct' element={<AddProduct/>} />
        <Route path='/seller/update-product/:product_id' element={<UpdateProduct/>} /> 
        <Route path='/seller/orders' element={<SellerOrders/>} />
        <Route path='/seller/customers' element={<SellerCustomers/>} />
        <Route path='/seller/reports' element={<SellerReports/>} />
        <Route path='/seller/profile' element={<SellerProfile/>} />
        <Route path='/seller/change-password' element={<SellerChangePassword/>} />
      </Routes>      
      <Footer/>
    </CartContext.Provider>
    </CurrencyContext.Provider>
  );
}

export default App;
