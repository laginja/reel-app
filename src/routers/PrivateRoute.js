import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { firebase } from '../firebase/firebase';
import AuthContext from '../context/auth-context';
import BrowsingHistory from '../components/browsing history/BrowsingHistory'
import Header from '../components/navigation/Header';
import RecommendedAuditions from '../components/RecommendedAuditions';

// MUI
import Grid from '@material-ui/core/Grid';

const PrivateRoute = ({ component: Component, componentName, ...rest }) => {
    /* get user that is logged-in */
    const currentUser = firebase.auth().currentUser

    return (
        <AuthContext.Provider value={{ currentUser }}>
            <Route {...rest} component={(props) => (
                !!currentUser ? (
                    <Fragment>
                        <Header />
                        <div className="container">
                            <Grid container>
                                <Grid item xs={12} sm={2}>
                                    <div className="container-fixed">
                                        <RecommendedAuditions />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={10}>
                                    <Grid
                                        container
                                        direction="column"
                                        justify="space-between"
                                    >
                                        <Grid item sm={12}>
                                            <Component {...props} />
                                        </Grid>
                                        <Grid item sm={12}>
                                            {!componentName ? <BrowsingHistory /> : ""}                                           
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </Fragment>
                ) : (
                        <Redirect to='/' />
                    )
            )} />
        </AuthContext.Provider>
    )
}

export default PrivateRoute;