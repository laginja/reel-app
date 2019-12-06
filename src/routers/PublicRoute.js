import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { firebase } from '../firebase/firebase';

const PublicRoute = ({ component: Component, ...rest}) => {
    return (
        <Route {...rest} component={(props) => (
            firebase.auth().currentUser ? (
                <Redirect to='/index' />
            ) : (
                <Component {...props} />
            )
        )}/>
    )
}

export default PublicRoute;