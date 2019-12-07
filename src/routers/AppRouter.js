import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// we use this function to create our own history
import createHistory from 'history/createBrowserHistory';
import AuthProvider from '../contextProviders/auth-context-provider';
import LoginPage from '../components/LoginPage';
import Main from '../components/Main';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory()

const AppRouter = () => {
    return (
        <AuthProvider>
            <Router history={history}>
                <div>
                    <Switch>
                        <PublicRoute path="/" component={LoginPage} exact={true} />
                        <PrivateRoute path="/index" component={Main} exact={true}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </div>
            </Router>
        </AuthProvider>  
    )
}

export default AppRouter;