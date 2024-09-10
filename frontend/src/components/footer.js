import {Link} from 'react-router-dom';
import {Instagram, Twitter, Linkedin } from "react-feather";

function Footer(){
    return (
        <footer className="container d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
            <span className="text-muted fttxt"><Link to="/">©2024 Code Marketplace</Link></span>
            </div>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3"><a className="text-muted" href="#">< Linkedin/></a></li>
            <li className="ms-3"><a className="text-muted" href="#">< Twitter/></a></li>
            <li className="ms-3"><a className="text-muted" href="#">< Instagram/></a></li>
            </ul>
        </footer>
    )
}

export default Footer;