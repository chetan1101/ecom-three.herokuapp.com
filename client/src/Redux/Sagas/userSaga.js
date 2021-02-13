import axios from "axios";
import * as actionTypes from '../actionTypes';
import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";

export function* getSignIn({ email, password }) {
    try {
        const { data } = yield call(axios.post, '/api/users/login', { email, password });
        yield put({
            type: actionTypes.GET_SIGNIN_SUCCESS,
            payload: data
        });

    } catch (error) {
        yield put({
            type: actionTypes.GET_SIGNIN_FAIL,
            payload: error.response && error.response.data.massage ? error.response.data.massage : error.massage
        })
    }
}

export function* getRegister({ userData }) {
    try {
        const { data } = yield call(axios.post, '/api/users/register', userData);
        yield put({
            type: actionTypes.GET_REGISTER_SUCCESS,
            payload: data
        });

    } catch (error) {
        yield put({
            type: actionTypes.GET_REGISTER_FAIL,
            payload: error.response && error.response.data.massage ? error.response.data.massage : error.massage
        })
    }
}

export function* updateUser(action){
    try {
        const {data} = yield call(axios.put, '/api/users/profile', action.userData, {
            headers:{
                Authorization: `Bearer ${action.token}`
            }
        })
        yield put({
            type:"@GET_USERUPDATE_SUCCESS",
            payload: data
        })
    } catch (error) {
        yield put({
            type: "@GET_USERUPDATE_FAIL",
            payload: error.response && error.response.data.massage ? error.response.data.massage : error.massage
        })
    }
}

export function* getSignOut () {
    yield put({type:actionTypes.GET_SIGNOUT})
}

export default function* userRootSaga() {
    yield all([
        takeEvery(actionTypes.GET_SIGNIN_REQUEST, getSignIn),
        takeEvery(actionTypes.GET_REGISTER_REQUEST, getRegister),
        takeEvery("@GET_USERUPDATE_REQUEST", updateUser),
        takeLatest(actionTypes.GET_SIGNOUT_REQUEST, getSignOut),
    ])
}