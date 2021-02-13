import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';


function PrivateRoute({ component: Component, props, ...rest }) {
    const userSign = useSelector(state => state.signIn);
    const { userInfo } = userSign;
    const location = useLocation();
    const redirect = location.search ? location.search.split("=")[1] : '/';
    return (
        <Route {...rest} render={(props) => userInfo ? <Component {...props} /> : <Redirect to={redirect ? redirect : '/login'} />} />
    )
}

export default PrivateRoute;
