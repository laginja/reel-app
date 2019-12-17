import { firebase, googleAuthProvider } from '../firebase/firebase';
import { createUser, fetchUser } from './users';

export const startLogin = () => {
    /* Return a promise. You could also return a function here and then call it from the login component */
    return firebase.auth().signInWithPopup(googleAuthProvider).then((auth) => {
        const userExists = fetchUser(auth)

        /* if user doesn't exist */
        if (!userExists) {
            /* createUser */
            createUser(auth)
        }
    });
}

export const startLogout = () => {
    return firebase.auth().signOut();
}