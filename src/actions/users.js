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


/* SetUsers - return an object that gets dispatched to change the state */
export const setUsers = (users) => {
    return {
        type: 'POPULATE_USERS',
        users: users
    };
};

/* ASYNC action that is responsible for fetching data from firebase */
export const startSetUsers = (dispatchUsers) => {

    return database.ref(`users/`).once('value').then((snapshot) => {
        const users = [];

        snapshot.forEach((childSnapshot) => {
            users.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        dispatchUsers(setUsers(users))
    });
};

/* SetUser - return an object that gets dispatched to change the state */
export const setNotifications = (notifications) => {
    return {
        type: 'SET_NOTIFICATIONS',
        notifications: notifications
    };
};

/**
 * Start listening for notifications
 * @param {*} userId 
 */
export const startSubscribeToNotifications = (userId = null, dispatchNotifications) => {

    const newPromise = (() => {
        return new Promise(resolve => {
            const onNotificationUpdate = database.ref(`users/${userId}/notifications`).on('value', (snapshot) => {
                const notifications = [];
        
                // iterate over all of them
                snapshot.forEach((childSnapshot) => {
                    // add applicant to the 'applicants' array and append it the ID
                    notifications.push(
                        childSnapshot.val()
                    );
                });
        
                //dispatchNotifications(setNotifications(notifications))
                console.log(notifications)
                
                resolve(notifications, this)
            });
        })
    })
    
    return newPromise()
};

/**
 * Unsubscribe from notifications
 * @param {*} userId 
 * @param {*} onNotificationChange 
 */
export const unSubscribeToNotifications = (userId = null, onNotificationChange) => {
    database.ref(`users/${userId}/notifications`).off('value', onNotificationChange);
};
