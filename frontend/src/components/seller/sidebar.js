import {Link} from 'react-router-dom';
function Sidebar(){
    return (
        <ul className="list-group">
            <Link to="/seller/dashboard" className="list-group-item" aria-current="true">Dashboard</Link>
            <Link to="/seller/products" className="list-group-item">View Products</Link>
            <Link to="/seller/addproduct" className="list-group-item">Add Products</Link>
            <Link to="/seller/orders" className="list-group-item">Orders</Link>
            <Link to="/seller/customers" className="list-group-item">Customers</Link>
            <Link to="/seller/reports" className="list-group-item">Reports</Link>
            <Link to="/seller/profile" className="list-group-item">Profile</Link>
            <Link to="/seller/change-password" className="list-group-item">Change Password</Link>
            <Link to="/seller/logout" className="list-group-item text-danger">Logout</Link>
        </ul>
    )
}

export default Sidebar;