import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { firebase } from '../firebase/firebase';

const PublicRoute = ({ component: Component, ...rest}) => {
    /* get user that is logged-in */
    const currentUser = firebase.auth().currentUser

    return (
        <Route {...rest} component={(props) => (
            !!currentUser ? (
                <Redirect to='/index' />
            ) : (
                <Component {...props} />
            )
        )}/>
    )
}

export default PublicRoute;