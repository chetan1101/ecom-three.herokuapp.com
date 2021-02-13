import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function DashbordHeader() {

    const orders = useSelector(state => state.myOrders);
    const { orderList } = orders;

    return (
        <div className="nav-scroller bg-white shadow-sm">
            <nav className="nav nav-underline" aria-label="Secondary navigation">
                <Link className="nav-link active" aria-current="page" to="#">Dashboard</Link>
                <Link className="nav-link" to="/orders-history">Orders <span className="badge bg-light text-dark rounded-pill align-text-bottom">{orderList.length}</span>
                </Link>
                <Link className="nav-link" to="/my-profile">My Profile</Link>
                <Link className="nav-link" to="#">Notification</Link>
      
            </nav>
        </div>
    )
}

export default DashbordHeader;
