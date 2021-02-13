import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";


export function* getMyOrders(action){
    try {
        const {data} = yield call(axios.get, '/api/orders/myorders', {
            headers:{
                Authorization: `Bearer ${action.token}`
            }
        })
        yield put({
            type:"@GET_MYORDERS_SUCCESS",
            payload:data.myorders
        })
    } catch (error) {
        yield put({
            type: "@GET_MYORDERS_FAIL",
            payload: error.response && error.response.data.massage ? error.response.data.massage : error.massage
        })
    }
}


export default function* ordersRootSaga(){
    yield all([
        takeLatest("@GET_MYORDERS_REQUEST", getMyOrders),
    ])
}