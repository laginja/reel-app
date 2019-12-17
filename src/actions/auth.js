import { firebase, googleAuthProvider } from '../firebase/firebase';
import { createUser, checkForUser } from './users';

export const startLogin = () => {
    /* Return a promise. You could also return a function here and then call it from the login component */
    return firebase.auth().signInWithPopup(googleAuthProvider).then((auth) => {
        /* Resolve a promise and fetch user data */
        checkForUser(auth.user.uid).then((user) => {
            const userExists = user.val()

            /* Check if user exists in the DB */
            if (!userExists) {
                createUser(auth)
            }
        })
    });
}

export const startLogout = () => {
    return firebase.auth().signOut();
}