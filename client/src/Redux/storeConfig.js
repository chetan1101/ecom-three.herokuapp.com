import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { cartReducer, orderDetailReducer, orderReducer, paymentReducer } from "./Reducers/cartReducer";
import { productListReducer, productReducer } from "./Reducers/productReducer";
import { signInReducer, userUpdateReducer } from "./Reducers/userReducer";
import { myorderListReducer } from "./Reducers/orderReducer";
import rootSaga from "./Sagas/rootSaga";


const sagaMiddleware = createSagaMiddleware();

const middlewares = [];

const initalState = {
    signIn: { userInfo: null },
    orders: { order: null }
}

const rootReducer = combineReducers({
    productList: productListReducer,
    product: productReducer,
    cart: cartReducer,
    signIn: signInReducer,
    orders: orderReducer,
    payment: paymentReducer,
    orderDetail: orderDetailReducer,
    myOrders: myorderListReducer,
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, initalState, composeEnhancers(
    applyMiddleware(sagaMiddleware, ...middlewares)
));

sagaMiddleware.run(rootSaga);

export default store;