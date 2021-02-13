import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from '../Components/Loading';

function OrderDetailPage(props) {
    const orderId = props.match.params.id;
    const { userInfo } = props.signIn;

    const { orderDetail, loading, error } = props.orderDetail;




    useEffect(() => {
        const token = userInfo.token;
        props.getOrderDetail(orderId, token)


    }, [])

    return (loading ? <Loading/> : error ? <div>{error}</div> :
        <>
            <div className="container">
                <div className="card px-3 pt-3">
                    <div className="row">
                        <div className="col-sm-6">





                            <table className="table border bor" >
                                <thead>
                                    <tr>

                                        <td>Total Amount Paid:</td>
                                        <td>Payment Status:</td>
                                        <td>Paid At:</td>
                                        <td>Shipping Status:</td>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>

                                        <td>Rs. {orderDetail.priceDetail.totalPrice}</td>
                                        <td>{orderDetail.isPaid ? "Payment recevied" : "Not paid"}</td>
                                        <td>{orderDetail.paidAt}</td>
                                        <td>{orderDetail.isDelivered ? "Delivered" : "Not Dispatched"}</td>
                                    </tr>
                                </tbody>
                            </table>

                  
                        </div>

                        <div className="col-sm-6">

                        <button onClick={()=>props.history.push('/login?redirect=orders-history')} type="button" class=" w-100 btn btn-lg btn-primary my-2">My Orders History</button>
                        <button onClick={()=>props.history.push('/')} type="button" class=" w-100 btn btn-lg btn-warning">Continue Shopping...</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                {orderDetail.orderItems.map((product) =>


                    <div className="card mt-2">
                        <div className="row">
                            <aside className="col-sm-3 border-right">
                                <article className="gallery-wrap">
                                    <div className="img-big-wrap">
                                        <div><div className="text-center m-3">
                                            <img style={{ height: "auto" }} className="img-fluid" src={product.img} alt={product.name} height="auto" />
                                        </div></div>
                                    </div>

                                </article>
                            </aside>
                            <aside className="col-sm-9">
                                <article className="card-body p-5">
                                    <h3 className="title mb-3">{product.name}</h3>
                                    <p className="price-detail-wrap">
                                        <span className="price h3 text-warning">
                                            <span className="currency">INR &#8377;</span><span className="num">{product.price}</span>
                                        </span>
                                    </p>

                                    <dl className="param param-feature">
                                        <dt>Item Number</dt>
                                        <dd>{product._id}</dd>
                                    </dl>
                                    <dl className="param param-feature">
                                        <dt>Qty sold: {product.qty}</dt>
                                    </dl>




                                    <hr />





                                </article>
                            </aside>
                        </div>
                    </div>




                )}
            </div>

        </>
    )
}

const mapStateToProps = (state) => ({
    signIn: state.signIn,
    orderDetail: state.orderDetail,

});

const mapDispatchToProps = (dispatch) => ({
    getOrderDetail: (orderId, token) => dispatch({ type: "@ORDER_DETAIL_REQUEST", orderId, token })
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailPage);
