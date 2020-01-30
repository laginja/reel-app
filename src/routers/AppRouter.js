import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// we use this function to create our own history
import createHistory from 'history/createBrowserHistory';
import AddAuditionPage from '../components/audition/AddAuditionPage';
import AuditionPage from '../components/audition/AuditionPage';
import EditAuditionPage from '../components/audition/EditAuditionPage';
import LoginPage from '../components/LoginPage';
import ReelsDashboardPage from '../components/ReelsDashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import UserProfilePage from '../components/user/UserProfilePage';

// MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const history = createHistory()

// Create a palette for the app
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#029BEF',
            main: '#0288d1',
            dark: '#037CBD',
            contrastText: '#fff',
        },
        secondary: {
            light: '#FF4801',
            main: '#F54400',
            dark: '#E24002',
            contrastText: '#fff',
        },
        default: {
            main: '#fff'
        },
    },
})

const AppRouter = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Router history={history}>
                <Switch>
                    <PublicRoute path="/" component={LoginPage} exact={true} />
                    <PrivateRoute path="/index" component={ReelsDashboardPage} />
                    <PrivateRoute path="/createAudition" component={AddAuditionPage} />
                    <PrivateRoute path="/user/:id" component={UserProfilePage} componentName="UserProfilePage" />
                    <PrivateRoute path="/audition/:id" component={AuditionPage} />
                    <PrivateRoute path="/editAudition/:id" component={EditAuditionPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        </MuiThemeProvider>
    )
}

export default AppRouter;