import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { firebase } from '../firebase/firebase';
import AuthContext from '../context/auth-context';
import BrowsingHistory from '../components/browsing history/BrowsingHistory'
import Header from '../components/navigation/Header';
import RecommendedAuditions from '../components/RecommendedAuditions';

const PrivateRoute = ({ component: Component, componentName, ...rest}) => {
    /* get user that is logged-in */
    const currentUser = firebase.auth().currentUser

    return (
        <AuthContext.Provider value={{ currentUser }}>
            <Route {...rest} component={(props) => (
                !!currentUser ? (
                    <div>
                        <Header />
                        <div className="container">
                            <div className="content-main">
                                <div className="content-main__item-narrow">
                                    <RecommendedAuditions />
                                </div>
                                <div className="content-main__item-wide">
                                    <Component {...props}/>
                                    {!componentName ? <BrowsingHistory /> : ""}                           
                                </div>
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