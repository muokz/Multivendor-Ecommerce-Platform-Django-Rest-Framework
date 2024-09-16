import {Link} from 'react-router-dom';
import logo from '../logo.svg';
import { GitBranch} from 'react-feather';
function SingleSeller(props){
    if(!props.seller.profile_img){
        props.seller.profile_img=logo;
    }

    const imgStyle = {
        width: '100%',
        height: '10vw',
        objectFit: 'contain',
    };
    return (
        <div className="col-12 col-md-4 col-lg-3 mb-4">
            <div className="card shadow border-0">
            <Link to={`/seller/${props.seller.id}/${props.seller.user.username}`}><img style={imgStyle} src={props.seller.profile_img} className="card-img-top" alt="..."/></Link>
                <div className="card-body">
                    <h4 className="card-title"><Link to={`/seller/${props.seller.id}/${props.seller.user.username}`}>{props.seller.user.username}</Link></h4>
                </div>
                <div className="card-footer border-0">
                    <GitBranch /> 
                    {
                        props.seller.categories.map((item)=><Link to={`/category/${item.category__title}/${item.category__id}`} className='mn-2'>{item.category__title}</Link>)
                    }
                </div>
            </div>
        </div> 
    )
}

export default SingleSeller;