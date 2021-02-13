import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';



function PaymentPage(props) {


    const { order } = props.order;
    const [sdkready, setSdkready] = useState(false)
    const { userInfo } = props.signIn;
    const { payment } = props.payment;
    const dispatch = useDispatch()

    useEffect(() => {
        if (!order.isPaid) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://checkout.razorpay.com/v1/checkout.js`;
            script.async = true;
            script.onload = () => {
                setSdkready(true)
            }
            document.body.appendChild(script)
            if (sdkready) {
                const token = userInfo.token;
                props.rozorPay({
                    amount: order.priceDetail.totalPrice,
                    currency: "INR",
                }, token)
            }
        }
    }, [order, sdkready]);

    useEffect(() => {
        if(order.razorpay_payment_id){
            props.history.push(`/login?redirect=order-detail/${order._id}`)
            dispatch({type:"CART_RESET"})
            dispatch({type:"@ORDER_RESET"})
        }
    }, [order.razorpay_payment_id])

    const paymentHandler = () => {
        if (payment) {
            const options = {
                key: payment.key,
                amount: payment.amount,
                currency: payment.currency,
                name: "Rozorpay Test Mode",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: payment.id,
                handler: function (response) {
                    props.savePaymentSuccess(order._id, {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature
                    }, userInfo.token)
                },
                prefill: {
                    name: userInfo.name,
                    email: userInfo.email,
                    contact: userInfo.mobile
                },
                notes: {
                    address: order.shippingAddress
                }

            };
            console.log(options)
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }
    }
    return (
        <div className="container mt-5">
            <div className="row text-center">
                <div className="col-sm-12">
                    <div className="mb-5">

                    <p><strong>orderId: {order._id}</strong></p>

                            <p><strong>Amount to be paid: Rs. {order.priceDetail.totalPrice} </strong></p>
                    </div>
             
                    {!order.isPaid &&
                        <button className="w-100 btn btn-primary btn-lg" onClick={paymentHandler} type="button">Make payment</button>
                    }
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    order: state.orders,
    signIn: state.signIn,
    payment: state.payment
})
const mapDispatchToProps = (dispatch) => ({
    rozorPay: (options, token) => dispatch({ type: "@ROZORPAY", options, token }),
    savePaymentSuccess: (orderId, paymentDetail, token) => dispatch({ type: "@ROZORPAY_REQUEST", orderId, paymentDetail, token })
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);