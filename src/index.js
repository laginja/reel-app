import React from 'react';
import ReactDOM from 'react-dom';

/* Components */
import AppRouter, { history } from './routers/AppRouter';

/* Styles */
import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';
import * as serviceWorker from './serviceWorker';

/* Firebase */
import { firebase } from './firebase/firebase';

/* TODO Consider REFACTORING code bellow */
/* ensures that the app renders only once */
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(<AppRouter />, document.getElementById('root'));
        hasRendered = true;
    }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

firebase.auth().onAuthStateChanged((user) => {
    // If user is logged in
    if(user) {
        renderApp();
        if (history.location.pathname === '/') {
            history.push('/index');
        }
    } else {
        renderApp();
        history.push('/');
    }
}); 

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
