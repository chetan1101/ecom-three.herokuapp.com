import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DashbordHeader from '../Components/DashbordHeader';
import Loading from '../Components/Loading';

function MyOrders(props) {

    const { orderList, loading, error } = props.myOrders;

    console.log(orderList)


    useEffect(() => {
        const token = props.signIn.userInfo.token;
        props.getMyOrders(token)
    }, [])


    return (loading ? <Loading/> : error ? <div>{error}</div> :
        <div>
            <DashbordHeader/>
            <main className="container">
                <div className="d-flex align-items-center p-3 my-3 text-white bg-dark rounded shadow-sm">
                    <div className="lh-1">
                        <h1 className="h6 mb-0 text-white lh-1">Orders History</h1>
                    </div>
                </div>
                <div className="bg-white rounded shadow-sm">

                    {orderList.length > 0 ? 
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Total Price</th>
                                <th>Order Date</th>
                                <th>Payment Status</th>
                                <th>Shipping Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {orderList.map((order) =>
                                <tr>
                                    <td>
                                        <div className="media">
                                            <Link onClick={() => props.history.push(`/order-detail/${order._id}`)}>
                                                {order._id}
                                            </Link>
                                        </div>
                                    </td>
                                    <td>
                                        <strong>&#8377; {order.priceDetail.totalPrice}</strong>
                                    </td>
                                    <td>
                                        {order.paidAt ? order.paidAt : "Untracked"}
                                    </td>
                                    <td >
                                        {order.isPaid ? "Paid" : "Unpaid"}
                                    </td>
                                    <td >
                                        {order.isDelivered ? "Dispatched" : "Not Dispatched"}
                                    </td>
                                    <td >
                                        <button onClick={() => props.history.push(`/order-detail/${order._id}`)} type="button" className="btn btn-dark btn-sm">
                                        <span className="fa fa-remove" />View Details</button>
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                    : <div className="p-3">No any order created yet...</div>


                            }
                </div>
            </main>
        </div>
    )
}

const mapStateToProps = state => ({
    signIn: state.signIn,
    myOrders: state.myOrders
})

const mapDispatchToProps = dispatch => ({
    getMyOrders: (token) => dispatch({ type: "@GET_MYORDERS_REQUEST", token })
})

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
