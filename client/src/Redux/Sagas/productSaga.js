
import axios from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";
import * as actionTypes from '../actionTypes';


export function* getProductList() {
    try {
        const { data } = yield call(axios.get, '/api/products');
        yield put({
            type: actionTypes.GET_PRODUCTLIST_SUCCESS,
            payload: data.productList
        })
    } catch (error) {
        yield put({
            type: actionTypes.GET_PRODUCTLIST_FAIL,
            payload: error.response && error.response.data.massage ? error.response.data.massage : error.massage
        })
    }
}

export function* getProduct(action){
    try {
        const {data} = yield call(axios.get, `/api/products/${action.productId}`)
        yield put({
            type:actionTypes.GET_PRODUCT_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        yield put({
            type:actionTypes.GET_PRODUCT_FAIL,
            payload: error.response && error.response.data.massage ? error.response.data.massage : error.massage
        })
    }
}

export default function* productRootSaga(){
    yield all([
        takeEvery(actionTypes.GET_PRODUCTLIST_REQUEST, getProductList),
        takeEvery(actionTypes.GET_PRODUCT_REQUEST, getProduct)
    ])
}



