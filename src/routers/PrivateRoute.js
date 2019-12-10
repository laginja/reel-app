import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { firebase } from '../firebase/firebase';
import AuthContext from '../context/auth-context';
import Header from '../components/Header';
import RecommendedAuditions from '../components/RecommendedAuditions';

const PrivateRoute = ({ component: Component, ...rest}) => {
    /* get user that is logged-in */
    const currentUser = firebase.auth().currentUser

    return (
        <AuthContext.Provider value={{ currentUser }}>
            <Route {...rest} component={(props) => (
                !!currentUser ? (
                    <div>
                        <Header />
                        <div className="content-container-full">
                            <div className="content-main">
                                <RecommendedAuditions />
                                <Component {...props}/>    
                            </div>
                        </div> 
                    </div>
                ) : (
                    <Redirect to='/' />
                )
            )}/>
        </AuthContext.Provider>
    )
}

export default PrivateRoute;