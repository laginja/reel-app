import React, { useState, useEffect } from 'react';
import AuthContext from '../context/auth-context';
import { firebase } from '../firebase/firebase';

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    /* called only when the component mounts */
    useEffect(() => {
        firebase.auth().onAuthStateChanged(setCurrentUser);
    }, [])

    return (
        <AuthContext.Provider value={{ currentUser }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;