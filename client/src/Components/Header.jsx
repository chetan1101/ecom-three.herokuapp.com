import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as actionTypes from '../Redux/actionTypes';

function Header(props) {

    const { userInfo } = props.signIn;
    const history = useHistory()

    const signOutHandler = () => {
        props.getSignOut()
     //   history.push('/')
    }

    return (
        <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <button onClick={()=>history.push('/')} type="button" class="my-0 me-md-auto fw-normal btn btn-lg btn-dark">MY WEBSITE</button>
         
            <nav className="my-2 my-md-0 me-md-3">
                {/* <Link className="p-2 text-dark text-decoration-none link-primary" to="#">Features</Link>
                <Link className="p-2 text-dark text-decoration-none link-primary" to="#">Enterprise</Link>
                <Link className="p-2 text-dark text-decoration-none link-primary" to="#">Support</Link> */}
                <Link className="p-2 text-dark text-decoration-none link-primary" to="/cart">Cart <span class="badge bg-primary">
                    {props.cart.cartItems.length > 0 && props.cart.cartItems.length}
                    </span></Link>
            </nav>

            {!userInfo ?
                <Link className="btn btn-dark" to="/login">
                    Sign In
                </Link>
                :
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">{userInfo.name}</button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {/* <li><Link className="dropdown-item" to="#">Manage products</Link></li> */}
                        <li><Link className="dropdown-item" to="/orders-history">My orders</Link></li>
                        <li><Link className="dropdown-item" to="/my-profile">My profile</Link></li>
                        <li><Link onClick={() => signOutHandler()} className="dropdown-item"> Sign out</Link></li>
                    </ul>
                </div>
            }
        </header>
    )
}

const mapStateToProps = state => ({
    signIn : state.signIn,
    cart: state.cart
})
const mapDispatchToProps = dispatch => ({
    getSignOut : () => dispatch({type: actionTypes.GET_SIGNOUT_REQUEST})
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
