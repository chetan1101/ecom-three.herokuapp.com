
import axios from "axios"
import { all, call, put, takeLatest } from "redux-saga/effects";
import * as actionTypes from '../actionTypes';

export function* addToCart({ productId, qty }) {

    const { data } = yield call(axios.get, `/api/products/${productId}`)
    yield put({
        type: actionTypes.CART_ADD_ITEM,
        payload: {
            _id: data.product._id,
            name: data.product.name,
            img: data.product.img,
            price: data.product.price,
            countInStock: data.product.countInStock,
            qty
        }
    })
}

export function* removeFromCart(action) {
    yield put({ type: actionTypes.REMOVE_FROM_CART, payload: action.productId })
}

export function* saveShipping({ shippingAddress }) {

    yield put({
        type: actionTypes.SAVE_CHECKOUT_SUCCESS,
        payload: shippingAddress
    })
}

export function* savePriceDetail({ SubtotalPrice, shippingPrice, discontPrice, totalPrice }) {

    yield put({
        type: actionTypes.SAVE_PAYMENT_SUCCESS,
        payload: { SubtotalPrice, shippingPrice, discontPrice, totalPrice }
    })
}

export function* saveOrder(action) {
    try {
        const token = action.token
        console.log(action);
        const { data } = yield call(axios.post, '/api/orders', action.order, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        yield put({
            type: actionTypes.SAVE_ORDER_SUCCESS,
            payload: data.order
        })
    } catch (error) {
        yield put({
            type: actionTypes.SAVE_ORDER_FAIL,
            payload: error.response && error.response.data.massage ? error.response.data.massage : error.massage
        })
    }
}

export function* rozorPay(action) {
    try {
        const { data } = yield call(axios.post, '/api/orders/rozorpay', action.options, {
            headers: {
                Authorization: `Bearer ${action.token}`
            }
        });
        yield put({
            type: "@PAYMENT_SUCCESS",
            payload: data.response
        })
    } catch (error) {
        yield put({
            type: "@PAYMENT_FAIL",
            payload: error.response && error.response.data.massage ? error.response.data.massage : error.massage
        })
    }
}

export function* savePaymentSuccess({ orderId, paymentDetail, token }) {
    try {
        const { data } = yield call(axios.put, `/api/orders/${orderId}/pay`, paymentDetail, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        yield put({
            type: "@ROZORPAY_PAYMENT_SUCCESS",
            payload: data.savePayment
        })
    } catch (error) {
        yield put({
            type: "@ROZORPAY_PAYMENT_FAIL",
            payload: error.response && error.response.data.massage ? error.response.data.massage : error.massage
        })
    }
}


export function* getOrderDetail(action) {
    try {
        const { data } = yield call(axios.get, `/api/orders/${action.orderId}`, {
            headers: {
                Authorization: `Bearer ${action.token}`
            }
        })
        yield put({
            type: "@ORDER_DETAIL_SUCCESS",
            payload: data.order
        })
    } catch (error) {
        yield put({
            type: "@ORDER_DETAIL_FAIL",
            payload: error.response && error.response.data.massage ? error.response.data.massage : error.massage
        })
    }
}
export default function* cartRootSaga() {
    yield all([
        takeLatest(actionTypes.CART_ADD_REQUEST, addToCart),
        takeLatest(actionTypes.CART_REMOVE_REQUEST, removeFromCart),
        takeLatest(actionTypes.SAVE_CHECKOUT_REQUEST, saveShipping),
        takeLatest(actionTypes.SAVE_PAYMENT_REQUEST, savePriceDetail),
        takeLatest(actionTypes.SAVE_ORDER_REQUEST, saveOrder),
        takeLatest("@ROZORPAY", rozorPay),
        takeLatest("@ROZORPAY_REQUEST", savePaymentSuccess),
        takeLatest("@ORDER_DETAIL_REQUEST", getOrderDetail)
    ])
}