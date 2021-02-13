import { GET_REGISTER_FAIL, GET_REGISTER_REQUEST, GET_REGISTER_SUCCESS, GET_SIGNIN_FAIL, GET_SIGNIN_REQUEST, GET_SIGNIN_SUCCESS, GET_SIGNOUT, GET_SIGNOUT_REQUEST } from "../actionTypes";

const initalState = {
    loading: false,
    userInfo: {},
    updatedUser: null,
    updateSuccess: false,
    updateSuccessMsg: {},
    error: ""
}
export const signInReducer = (state, action) => {
    state = state || initalState;

    switch (action.type) {
        case GET_SIGNIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_SIGNIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload
            }
        case GET_SIGNIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload
            }
        case GET_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_SIGNOUT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case "@GET_USERUPDATE_REQUEST":
            return {
                ...state,
                loading: true
            }

        case "@GET_USERUPDATE_SUCCESS":
            return {
                ...state,
                loading: false,
                userInfo: action.payload.updatedUser,
                updateSuccessMsg: action.payload.massage,
                updateSuccess: true,

            }
        case "@REMOVE_ALERT":
            return {
                ...state,
                updateSuccess: false,
            }
        case "@GET_USERUPDATE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_SIGNOUT:
            return {}

        default:
            return state;
    }
}

