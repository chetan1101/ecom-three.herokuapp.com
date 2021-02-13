import { all } from 'redux-saga/effects';
import cartRootSaga from './cartSaga';
import ordersRootSaga from './ordersSaga';
import productRootSaga from './productSaga';
import userRootSaga from './userSaga';

export default function* rootSaga() {
    yield all([
        productRootSaga(),
        cartRootSaga(),
        userRootSaga(),
        ordersRootSaga()
    ])
}