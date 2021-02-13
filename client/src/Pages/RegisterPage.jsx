import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as actionTypes from '../Redux/actionTypes';
import '../Styles/login.css';

function RegisterPage(props) {
    const { register, handleSubmit } = useForm();

    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    const { userInfo, loading, error } = props.signIn;

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])

    const onSubmit = (userData) => {
        props.getRegister(userData);
        console.log(userData)
    }
    return (
        <div className="container my-5">
            <div>{error}</div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <h1 className="h1 mb-4 fw-normal">Register</h1>

                <label htmlFor="name" className="fw-bolder mb-1">Name</label>
                <input type="name"
                    id="name"
                    name="name"
                    className="form-control mb-3"
                    placeholder="Name"
                    ref={register}
                    required
                    autoFocus
                />


                <label htmlFor="inputEmail" className="fw-bolder mb-1">Email address</label>
                <input type="email"
                    id="inputEmail"
                    className="form-control mb-3"
                    name="email"
                    placeholder="Email address"
                    ref={register}
                    required
                    
                />

                <label htmlFor="inputEmail" className="fw-bolder mb-1">Mobile</label>
                <input type="number"
                    id="mobile"
                    className="form-control mb-3"
                    name="mobile"
                    placeholder="Mobile Number"
                    ref={register}
                    required
                    
                />

                <label htmlFor="inputPassword" className="fw-bolder mb-1">Password</label>
                <input
                    type="password"
                    id="inputPassword"
                    className="form-control mb-3"
                    placeholder="Password"
                    name="password"
                    ref={register}
                    required

                />
                <label htmlFor="inputPassword" className="fw-bolder mb-1">Confirm Password</label>
                <input
                    type="password"
                    id="inputPassword"
                    className="form-control mb-5"
                    placeholder="Confirm Password"
                    name="confirmpPassword"
                    required

                />

                <button className="w-100 btn btn-lg btn-primary" type="submit">{loading ? "Loading" : "Register"}</button>
                <button onClick={()=>props.history.push('/login')} className="w-100 btn btn-lg btn-outline-dark mt-2" type="button">Sign in</button>
            </form>
        </div>

    )
}

const mapStateToProps = state => ({
    signIn: state.signIn
})

const mapDispatchToProps = (dispatch) => ({
    getRegister: (userData) => dispatch({ type: actionTypes.GET_REGISTER_REQUEST, userData })
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
