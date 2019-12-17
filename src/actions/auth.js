import { firebase, googleAuthProvider } from '../firebase/firebase';
import database from '../firebase/firebase';

export const startLogin = () => {
    /* Return a promise. You could also return a function here and then call it from the login component */
    return firebase.auth().signInWithPopup(googleAuthProvider).then((auth) => {
        const { uid, displayName, photoURL, email } = auth.user
        const user = { displayName, photoURL, email}
        database.ref(`users/${uid}`).set(user)
        
    });
}

export const startLogout = () => {
    return firebase.auth().signOut();
}