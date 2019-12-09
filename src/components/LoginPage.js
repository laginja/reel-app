import React from 'react';
import { startLogin } from '../actions/auth';

const LoginPage = () => {
    return (
        <div>
            <h1>Login Page</h1>
            <p>Find auditions near you</p>
            <button onClick={startLogin}>Login with Google</button>
        </div>
    )
}

export default LoginPage;