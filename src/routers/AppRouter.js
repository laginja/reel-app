import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// we use this function to create our own history
import createHistory from 'history/createBrowserHistory';
import AuditionPage from '../components/AuditionPage';
import LoginPage from '../components/LoginPage';
import Main from '../components/Main';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import UserProfilePage from '../components/UserProfilePage';

export const history = createHistory()

const AppRouter = () => {
    return (
        <Router history={history}>
            <div>
                <Switch>
                    <PublicRoute path="/" component={LoginPage} exact={true} />
                    <PrivateRoute path="/index" component={Main} exact={true}/>
                    <PrivateRoute path="/user/:id" component={UserProfilePage} />
                    <PrivateRoute path="/audition/:id" component={AuditionPage} />
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>
        </Router>
        
    )
}

export default AppRouter;