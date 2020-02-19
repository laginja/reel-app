import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { firebase } from '../firebase/firebase';
import AuthContext from '../context/auth-context';
import BrowsingHistory from '../components/browsing history/BrowsingHistory'
import Header from '../components/navigation/Header';
import RecommendedAuditions from '../components/RecommendedAuditions';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        padding: '16px 0 0 0'
    }
}));

const PrivateRoute = ({ component: Component, componentName, ...rest }) => {
    /* get user that is logged-in */
    const currentUser = firebase.auth().currentUser

    const classes = useStyles();
    return (
        <AuthContext.Provider value={{ currentUser }}>
            <Route {...rest} component={(props) => (
                !!currentUser ? (
                    <Fragment>
                        <Header />
                        <div className={classes.root}>
                            <Grid container>
                                <Hidden smDown>
                                    <Grid item xs={12} md={3} lg={2} >
                                        <div className="container-fixed">
                                            <RecommendedAuditions />
                                        </div>
                                    </Grid>
                                </Hidden>
                                <Grid item xs={12} md={9} lg={10}>
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