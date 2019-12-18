import database from '../firebase/firebase';

export const checkForUser = (uid) => {
    /* Return a promise */
    return database.ref(`users/${uid}`).once('value')
}

export const createUser = (auth) => {
    const { 
        uid, 
        displayName = 'Random User', 
        photoURL = '', 
        email = '',
        profession = 'Actor'
    } = auth.user

    const user = { uid, displayName, photoURL, email, profession }

    return database.ref(`users/${uid}`).set(user).then(() => {
        console.log('User created')
    });   
}

/* SetUser - return an object that gets dispatched to change the state */
export const fetchUser = (user) => {
    return {
        type: 'FIND_USER',
        user: user
    };
};

/* ASYNC action that is responsible for fetching data from firebase */
export const startFetchUser = (id = null, dispatchUser) => {
    
    return database.ref(`users/${id}`).once('value').then((snapshot) => {
        dispatchUser(fetchUser(snapshot.val()))
    });
};