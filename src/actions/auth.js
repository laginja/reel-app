import { firebase, googleAuthProvider } from '../firebase/firebase';

export const startLogin = () => {
    /* Return a promise. You could also return a function here and then call it from the login component */
    return firebase.auth().signInWithPopup(googleAuthProvider);
}

export const startLogout = () => {
    return firebase.auth().signOut();
}