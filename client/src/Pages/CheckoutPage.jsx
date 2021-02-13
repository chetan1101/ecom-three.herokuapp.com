import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as actionTypes from '../Redux/actionTypes';

function CheckoutPage(props) {
    const { userInfo } = props.signIn;

    if (!userInfo) {
        props.history.push('/login');
    }

    const { register, handleSubmit } = useForm();
    const { cartItems } = props.cart;
    const { order } = props.order;


    const [promoCode, setPromoCode] = useState("")
    const [promoValue, setPromoValue] = useState(false)
    const [name, setName] = useState("")


    const SubtotalPrice = cartItems.reduce((e, c) => e + c.price * c.qty, 0);
    const shippingPrice = SubtotalPrice > 2000 ? 0 : 50;
    const discontPrice = promoValue === true ? 200 : 0;
    const totalPrice = SubtotalPrice + shippingPrice - discontPrice;



    useEffect(() => {
        if (order) {

            props.history.push(`/login?redirect=payment/${order._id}`)
        }

    }, [order])


    const onSubmit = (data) => {
        props.saveOrder({
            orderItems: props.cart.cartItems,
            shippingAddress: data,
            priceDetail: {
                SubtotalPrice,
                shippingPrice,
                discontPrice,
                totalPrice
            }
        },
            userInfo.token
        )

    }

    const handlePromoSubmit = (e) => {
        e.preventDefault()
        if (promoCode === "rancho") {
            setPromoValue(true)
        }
    }
    return (
        <div>
            <div className="container">
                <div className="row g-3">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Your cart</span>
                            <span className="badge bg-secondary rounded-pill">{cartItems.length}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {cartItems.map((item) =>
                                <li className="list-group-item d-flex justify-content-between lh-sm">
                                    <div>
                                        <h6 className="my-0">{item.name}</h6>
                                    </div>
                                    <span className="text-muted">&#8377;{item.price}</span>
                                </li>
                            )}
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 className="my-0">Shippping</h6>
                                </div>
                                <span className="text-muted">&#8377;{shippingPrice}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between bg-light">
                                <div className="text-success">
                                    <h6 className="my-0">Promo code</h6>
                                    <small>EXAMPLECODE</small>
                                </div>
                                <span className="text-success">-{discontPrice}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (USD)</span>
                                <strong>{totalPrice}</strong>
                            </li>
                        </ul>
                        <form className="card p-2" onSubmit={(e) => handlePromoSubmit(e)}>
                            <div className="input-group">
                                <input type="text" onChange={(e) => setPromoCode(e.target.value)} className="form-control" placeholder="Promo code" />
                                <button type="submit" className="btn btn-secondary">Redeem</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Billing address</h4>
                        <form className="needs-validation" onSubmit={handleSubmit(onSubmit)} >
                            <div className="row g-3">
                                <div className="col-sm-12">
                                    <label htmlFor="firstName" className="form-label">Name</label>
                                    <input type="text"
                                        className="form-control"
                                        id="firstName"
                                        ref={register}
                                        name="name"
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder
                                        required />
                                    <div className="invalid-feedback">
                                        Valid first name is required.
                                </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text"
                                        className="form-control"
                                        id="address"
                                        placeholder=""
                                        ref={register}
                                        name="address"
                                        required />
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                 </div>
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <select
                                        ref={register}
                                        name="country"
                                        className="form-select"
                                        id="country"
                                        required>
                                        <option value>Choose...</option>
                                        <option>United States</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid country.
                                 </div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <select
                                        ref={register}
                                        name="state"
                                        className="form-select"
                                        id="state" required>
                                        <option value>Choose...</option>
                                        <option>California</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please provide a valid state.
                                 </div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="zip" className="form-label">Zip</label>
                                    <input type="text"
                                        ref={register}
                                        name="zip"
                                        className="form-control"
                                        id="zip"
                                        placeholder
                                        required />
                                    <div className="invalid-feedback">
                                        Zip code required.
                                </div>
                                </div>
                            </div>
                            <hr className="my-4" />

                            <button className="w-100 btn btn-primary btn-lg" type="submit">Proceed to Payment</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    signIn: state.signIn,
    cart: state.cart,
    order: state.orders
})
const mapDispatchToProps = (dispatch) => ({

    saveOrder: (order, token) => dispatch({ type: actionTypes.SAVE_ORDER_REQUEST, order, token })

})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
