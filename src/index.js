import React from 'react';
import ReactDOM from 'react-dom';

/* Components */
import AppRouter, { history } from './routers/AppRouter';

import { firebase } from './firebase/firebase';

/* Styles */
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import * as serviceWorker from './serviceWorker';

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(<AppRouter />, document.getElementById('root'));
        hasRendered = true;
    }
};

firebase.auth().onAuthStateChanged((user) => {
    // If user is logged in
    
    if(user) {
        //console.log(firebase.auth().currentUser.uid)
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
