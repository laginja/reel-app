import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import Header from '../components/Header';
import RecommendedAuditions from '../components/RecommendedAuditions';
import RecommendedProfiles from '../components/RecommendedProfiles';

const PrivateRoute = ({ component: Component, ...rest}) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Route {...rest} component={(props) => (
            !!currentUser ? (
                <div>
                    <Header />
                    <div className="content-container-full">
                        <div className="content-main">
                            <div className="content-main__item-narrow border-right">
                                <RecommendedAuditions />
                            </div>
                            <div className="content-main__item-wide">
                                <Component {...props}/>
                            </div>
                            <div className="content-main__item-narrow border-left">
                                <RecommendedProfiles />
                            </div>
                        </div>
                    </div>  
                </div>
            ) : (
                <Redirect to='/' />
            )
        )}/>
    )
}

export default PrivateRoute;