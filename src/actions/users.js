import database from '../firebase/firebase';

export const createUser = (auth) => {
    const { 
        uid, 
        displayName = 'Random User', 
        photoURL = '', 
        email = '',
        profession = 'Editor' 
    } = auth.user

    const user = { displayName, photoURL, email, profession}

    return database.ref(`users/${uid}`).set(user).then((ref) => {
        console.log('User created')
    });   
}

export const fetchUser = (auth) => {
    const { 
        uid, 
    } = auth.user

    return database.ref(`users/${uid}`).once('value').then((ref) => {
        console.log('User exists')
    })   
}