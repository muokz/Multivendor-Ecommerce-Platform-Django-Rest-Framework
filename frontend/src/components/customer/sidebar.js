import {Link} from 'react-router-dom';
function Sidebar(){
    return (
        <ul className="list-group">
            <Link to="/customer/dashboard" className="list-group-item" aria-current="true">Dashboard</Link>
            <Link to="/customer/orders" className="list-group-item">Orders</Link>
            <Link to="/customer/wishlist" className="list-group-item">Wishlist</Link>
            <Link to="/customer/profile" className="list-group-item">Profile</Link>
            <Link to="/customer/change-password" className="list-group-item">Change Password</Link>
            <Link to="/customer/addresses" className="list-group-item">Addresses</Link>
            <Link to="/customer/logout" className="list-group-item text-danger">Logout</Link>
        </ul>
    )
}

export default Sidebar;