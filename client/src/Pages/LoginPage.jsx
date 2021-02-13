import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../Redux/actionTypes';
import '../Styles/login.css';

function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    const { userInfo, loading, error } = props.signIn;

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])

    const hendleSubmit = (e) => {
        e.preventDefault();
        props.getSignIn(email, password)
    }
    return (
        <div className="container my-5">
            <div>{error}</div>
            <form onSubmit={(e) => hendleSubmit(e)}>

                <h1 className="h1 mb-4 fw-normal">Login</h1>
                <label htmlFor="inputEmail" className="fw-bolder mb-1">Email address</label>
                <input type="email"
                    id="inputEmail"
                    className="form-control mb-3"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                />

                <label htmlFor="inputPassword" className="fw-bolder mb-1">Password</label>
                <input
                    type="password"
                    id="inputPassword"
                    className="form-control mb-5"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required

                />

                <button className="w-100 btn btn-lg btn-primary" type="submit">{loading ? "Loading" : "SignIn"}</button>
                <button onClick={()=>props.history.push(`/register?redirect=${redirect}`)} className="w-100 btn btn-lg btn-outline-dark mt-2" type="button">Register</button>
            </form>
        </div>

    )
}

const mapStateToProps = state => ({
    signIn: state.signIn
})

const mapDispatchToProps = (dispatch) => ({
    getSignIn: (email, password) => dispatch({ type: actionTypes.GET_SIGNIN_REQUEST, email, password })
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
