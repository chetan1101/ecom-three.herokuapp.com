import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionTypes from '../Redux/actionTypes';
import Loading from '../Components/Loading';
import '../Styles/cart.css';

function CartPage(props) {

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;

    const { cartItems, loading } = props.cart;

    useEffect(() => {
        if (productId) {
            props.addToCart(productId, qty);
        }
    }, [productId, qty])


    const SubtotalPrice = cartItems.reduce((e, c) => e + c.price * c.qty, 0);
    const shippingPrice = SubtotalPrice > 2000 ? 0 : 50;
    const totalPrice = SubtotalPrice + shippingPrice;




    console.log(props.cart.cartItems)

    return ( loading ? <Loading/> : cartItems.length === 0 ? <div>Cart Is Empty</div> : 
        <div className="container">
            <div className="col-sm-12 col-md-12 col-md-offset-1">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th colSpan="2">Product</th>
                            <th>Quantity</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Total</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) =>

                            <tr>
                                <td colSpan="2" className="col-sm-8 col-md-6">
                                    <div className="media">
                                        <Link className="thumbnail pull-left" to="#">
                                            <img className="media-object" src={item.img} style={{ width: 72, height: 72 }} alt="test" />
                                        </Link>
                                        <div className="media-body">
                                            <h4 className="media-heading">
                                                <Link to="#">{item.name}</Link>
                                            </h4>
                                            <span>Status: </span>
                                            <span className="text-warning"><strong>In Stock</strong>
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                <td className="col-sm-1 col-md-1" style={{ textAlign: 'center' }}>

                                    <select value={item.qty} onChange={(e) => props.addToCart(item._id, Number(e.target.value))} class="form-select" aria-label="Default select example">

                                        {[...Array(item.countInStock).keys()].map((x) =>

                                            <option key={x + 1} value={x + 1}>{x + 1}</option>

                                        )}


                                    </select>


                                </td>
                                <td className="col-sm-1 col-md-1 text-center">
                                    <strong>&#8377;{item.price}</strong>
                                </td>
                                <td className="col-sm-1 col-md-1 text-center">
                                    <strong>&#8377;{item.qty * item.price}</strong>
                                </td>
                                <td className="col-sm-1 col-md-1">
                                    <button onClick={()=>props.removeFromCart(item._id)} type="button" className="btn btn-danger">
                                        <span className="fa fa-remove" />Remove</button>
                                </td>
                            </tr>

                        )}



                        <tr>
                            <td> </td>
                            <td> </td>
                            <td > </td>
                            <td><h5>Subtotal</h5></td>
                            <td colSpan="2" className="text-right"><h5><strong>

                                &#8377; {SubtotalPrice}

                            </strong></h5></td>
                        </tr>
                        <tr>
                            <td > </td>
                            <td> </td>
                            <td> </td>
                            <td colSpan="2"><h5>Estimated shipping</h5></td>

                            <td className="text-right"><h5><strong>&#8377; {shippingPrice}</strong></h5></td>

                        </tr>
                        <tr className="text-right">
                            <td > </td>
                            <td> </td>
                            <td> </td>
                            <td><h3>Total</h3></td>
                            <td colSpan="2" className="text-right"><h3><strong>&#8377; {totalPrice}</strong></h3></td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td colSpan="2">
                                <button type="button" className="btn btn-default">
                                    <span className="fa fa-shopping-cart" /> 
                                    Continue Shopping
          </button></td>
                            <td>
                                <button onClick={()=>props.history.push("/login?redirect=checkout")} type="button" className="btn btn-success">
                                    Checkout <span className="fa fa-play" />
                                </button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}

const mapStateToProps = state => ({
    cart: state.cart
});

const mapDispatchToProps = dispatch =>({
    addToCart: (productId, qty) => dispatch({type:actionTypes.CART_ADD_REQUEST, productId, qty}),
    removeFromCart: (productId) => dispatch({type:actionTypes.CART_REMOVE_REQUEST, productId})
})
export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
