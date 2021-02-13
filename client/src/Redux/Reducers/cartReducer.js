
import { CART_ADD_REQUEST, CART_REMOVE_REQUEST, CART_ADD_ITEM, REMOVE_FROM_CART, SAVE_CHECKOUT_REQUEST, SAVE_CHECKOUT_SUCCESS, SAVE_PAYMENT_SUCCESS, SAVE_ORDER_REQUEST, SAVE_ORDER_SUCCESS, SAVE_ORDER_FAIL } from "../actionTypes";

const iniialState = {
    cartItems: [],
    loading: false,
    shippingAddress: {},
    priceDetail: {},
    order: {},
}

export const cartReducer = (state, action) => {
    state = state || iniialState;

    switch (action.type) {
        case CART_ADD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);
            if (existItem) {
                return {
                    ...state,
                    loading: false,
                    cartItems: state.cartItems.map((x) => x._id === existItem._id ? item : x)
                }
            } else {
                return {
                    ...state,
                    loading: false,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.filter((x => x._id !== action.payload))
            }
        case SAVE_CHECKOUT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SAVE_CHECKOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                shippingAddress: action.payload
            }
        case SAVE_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                priceDetail: action.payload
            }
        case "CART_RESET":
            return state = iniialState
            
        default:
            return state;
    }
}


export const orderReducer = (state = { order: {} }, action) => {

    switch (action.type) {
        case SAVE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SAVE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload
            }

        case SAVE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                order: action.payload
            }
        case "@ROZORPAY_REQUEST":
            return {
                ...state,
                loading: true,
            }
        case "@ROZORPAY_PAYMENT_SUCCESS":
            return {
                ...state,
                loading: false,
                order: action.payload
            }

        case "@PAYMENT_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case "@ORDER_RESET":
            return{}

        default:
            return state;
    }
}

export const paymentReducer = (state = {}, action) => {
    switch (action.type) {
        case "@ROZORPAY":
            return {
                loading: true,
            }
        case "@PAYMENT_SUCCESS":
            return {
                loading: false,
                payment: action.payload
            }

        case "@PAYMENT_FAIL":
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const orderDetailReducer = (state={loading:true, orderDetail:{}}, action) => {
    switch (action.type) {
        case "@ORDER_DETAIL_REQUEST":
            return {
                loading: true,
            }
        case "@ORDER_DETAIL_SUCCESS":
            return {
                loading: false,
                orderDetail: action.payload
            }

        case "@ORDER_DETAIL_FAIL":
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}
