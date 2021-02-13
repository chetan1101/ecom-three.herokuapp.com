import {
    GET_PRODUCTLIST_FAIL,
    GET_PRODUCTLIST_SUCCESS,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    GET_PRODUCTLIST_REQUEST,
    GET_PRODUCT_REQUEST,
} from "../actionTypes";

const initalState = {
    productList: [],
    recentView: [],
    product: {},
    loading: false,
    error: "",
}

export const productListReducer = (state, action) => {
    state = state || initalState;

    switch (action.type) {
        case GET_PRODUCTLIST_REQUEST:
            return {
                loading: true
            }
        case GET_PRODUCTLIST_SUCCESS:
            return {
                loading: false,
                productList: action.payload,
            }
        case GET_PRODUCTLIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const productReducer = (state, action) => {
    state = state || initalState;

    switch (action.type) {
        case GET_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_PRODUCT_SUCCESS:
            const recentExist = state.recentView.find((x)=> x._id === action.payload._id);
            return {
                ...state,
                loading: false,
                product: action.payload,
                recentView: recentExist ? [...state.recentView] : [...state.recentView, action.payload]
            }

        case GET_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}