import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/auth-context';

const PublicRoute = ({ component: Component, ...rest}) => {
    /* get user that is logged-in */
    const { currentUser } = useContext(AuthContext);

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