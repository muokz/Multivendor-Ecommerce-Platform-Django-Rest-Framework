import {Link} from 'react-router-dom';
import { ShoppingCart, Truck, Menu} from 'react-feather';
import { useContext, useState } from 'react';
import { UserContext, CartContext, CurrencyContext, VendorContext } from '../context';
function Header(){
    const userContext=useContext(UserContext);
    const vendorContext=useContext(VendorContext);
    const {cartData,setCartData}=useContext(CartContext);    
    const {CurrencyData,setCurrencyData}=useContext(CurrencyContext);

    var UserName=localStorage.getItem('customer_username');
    var VendorName=localStorage.getItem('vendor_username');
    if(cartData == null){
        var cartItems=0;
    }else{
        var cartItems=cartData.length;
    }
    const changeCurrency = (e) => {
        var _currency =e.target.value;
        localStorage.setItem('currency',_currency);
        setCurrencyData(_currency);
    }
    return (
        <nav className="navbar fixed-top navbar-expand-lg bg-light">
            <div className="container">
            <Link className="nav-link active" aria-current="page" to="/">Code Marketplace</Link>       
            <button className="btn hidenav" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><Menu /></button>

            <div className="offcanvas offcanvas-end hidenav" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">Code Marketplace</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div className="navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav ms-auto mb-4 mb-lg-0">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        </form>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/categories">Categories</Link>
                        </li>               
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {vendorContext != 'true' &&
                                    <>Vendor Account</>                               
                                }                                                          
                                {vendorContext == 'true' &&
                                    <>{VendorName}</>
                                }
                            </a>
                            <ul className="dropdown-menu">                                
                                {vendorContext != 'true' &&
                                    <>
                                        <Link to="/seller/register" className="dropdown-item"><li>Register</li></Link>
                                        <Link to="/seller/login" className="dropdown-item"><li>Login</li></Link>  
                                    </>
                                }                                                          
                                {vendorContext == 'true' &&
                                    <>
                                        <Link to="/seller/dashboard" className="dropdown-item"><li>Dashboard</li></Link>
                                        <Link to="/seller/logout" className="dropdown-item"><li>Logout</li></Link>
                                    </>
                                }
                            </ul>
                        </li>            
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {userContext != 'true' &&
                                    <>Vendor Account</>                               
                                }                                                          
                                {userContext == 'true' &&
                                    <>{UserName}</>
                                }
                            </a>
                            <ul className="dropdown-menu">                                
                                {userContext != 'true' &&
                                    <>
                                        <Link to="/customer/register" className="dropdown-item"><li>Register</li></Link>
                                        <Link to="/customer/login" className="dropdown-item"><li>Login</li></Link>  
                                    </>
                                }                                                          
                                {userContext == 'true' &&
                                    <>
                                        <Link to="/customer/dashboard" className="dropdown-item"><li>Dashboard</li></Link>
                                        <Link to="/customer/logout" className="dropdown-item"><li>Logout</li></Link>
                                    </>
                                }                                
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="/seller/orders"><button type="button" className="btn position-relative">
                                <Truck/>
                                <span className="position-absolute top-0 mt-2 start-100 translate-middle badge rounded-pill bg-danger">
                                    0
                                </span>
                            </button></Link>
                        </li> 
                        <li className="nav-item">
                            <Link to="/checkout"><button type="button" className="btn position-relative">
                                <ShoppingCart/>
                                <span className="position-absolute top-0 mt-2 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartItems } 
                                </span>
                            </button></Link>
                        </li> 
                        <li className="nav-item">
                            <div className="nav-link">
                                <select onChange={changeCurrency}>
                                    {CurrencyData != 'usd' &&
                                        <>                                            
                                            <option value='ksh' selected>Ksh</option>
                                            <option value='usd'>USD</option>
                                        </>
                                    }
                                    {CurrencyData == 'usd' &&
                                        <>                 
                                            <option value='usd' selected>USD</option>                           
                                            <option value='ksh'>Ksh</option>
                                        </>
                                    }
                                </select>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav ms-auto mb-4 mb-lg-0">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    </form>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/categories">Categories</Link>
                    </li>               
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">                            
                            {vendorContext != 'true' &&
                                <>Vendor Account</>                               
                            }                                                          
                            {vendorContext == 'true' &&
                                <>{VendorName}</>
                            }
                        </a>
                        <ul className="dropdown-menu">
                                {vendorContext != 'true' &&
                                    <>
                                        <Link to="/seller/register" className="dropdown-item"><li>Register</li></Link>
                                        <Link to="/seller/login" className="dropdown-item"><li>Login</li></Link>  
                                    </>
                                }                                                          
                                {vendorContext == 'true' &&
                                    <>
                                        <Link to="/seller/dashboard" className="dropdown-item"><li>Dashboard</li></Link>
                                        <Link to="/seller/logout" className="dropdown-item"><li>Logout</li></Link>
                                    </>
                                }
                        </ul>
                    </li>            
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            
                            {userContext != 'true' &&
                                <>My Account</>                               
                            }                                                          
                            {userContext == 'true' &&
                                <>{UserName}</>
                            }  
                        </a>
                        <ul className="dropdown-menu">                                
                            {userContext != 'true' &&
                                <>
                                    <Link to="/customer/register" className="dropdown-item"><li>Register</li></Link>
                                    <Link to="/customer/login" className="dropdown-item"><li>Login</li></Link>  
                                </>
                            }                                                          
                            {userContext == 'true' &&
                                <>
                                    <Link to="/customer/dashboard" className="dropdown-item"><li>Dashboard</li></Link>
                                    <Link to="/customer/logout" className="dropdown-item"><li>Logout</li></Link>
                                </>
                            }                                
                        </ul>
                    </li>
                    <li className="nav-item">
                        <Link to="/seller/orders"><button type="button" className="btn position-relative">
                            <Truck/>
                            <span className="position-absolute top-0 mt-2 start-100 translate-middle badge rounded-pill bg-danger">
                                0
                            </span>
                        </button></Link>
                    </li> 
                    <li className="nav-item">
                        <Link to="/checkout"><button type="button" className="btn position-relative">
                            <ShoppingCart/>
                            <span className="position-absolute top-0 mt-2 start-100 translate-middle badge rounded-pill bg-danger">        
                                {cartItems }  
                            </span>
                        </button></Link>
                    </li> 
                    <li className="nav-item">
                        <div className="nav-link">
                            <select onChange={changeCurrency}>
                                {CurrencyData != 'usd' &&
                                    <>                                            
                                        <option value='ksh' selected>Ksh</option>
                                        <option value='usd'>USD</option>
                                    </>
                                }
                                {CurrencyData == 'usd' &&
                                    <>                 
                                        <option value='usd' selected>USD</option>                           
                                        <option value='ksh'>Ksh</option>
                                    </>
                                }
                            </select>
                        </div>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    )
}

export default Header;