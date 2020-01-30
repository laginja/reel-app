import database from '../firebase/firebase';

/**
 * Check if user exists in DB
 * @param {string} uid 
 */
export const checkForUser = (uid) => {
    return database.ref(`users/${uid}`).once('value')
}

/**
 * Create user and insert it into DB
 * @param {Auth} auth 
 */
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

/**
 * Return object to represent user state
 * @param {User} user 
 */
export const fetchUser = (user) => {
    return {
        type: 'FIND_USER',
        user: user
    };
};

/**
 * Fetch user from DB and dispatch to update state
 * @param {string} id 
 * @param {function} dispatchUser - dispatch
 */
export const startFetchUser = (id = null, dispatchUser) => {

    return database.ref(`users/${id}`).once('value').then((snapshot) => {
        dispatchUser(fetchUser(snapshot.val()))
    });
};


/**
 * Return object to represent users state
 * @param {[]} users 
 */
export const setUsers = (users) => {
    return {
        type: 'POPULATE_USERS',
        users: users
    };
};

/**
 * Fetch users from DB and dispatch to update state
 * @param {function} dispatchUsers - dispatch
 */
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

/**
 * Start listening for notifications
 * @param {string} userId 
 * @param {function} setNotifications 
 */
export const startSubscribeToNotifications = (userId = null, setNotifications) => {
    const newPromise = (() => {
        return new Promise(resolve => {
            const onNotificationUpdate = database.ref(`users/${userId}/notifications`).limitToLast(10).on('value', (snapshot) => {
                const notifications = [];
        
                // iterate over all of them
                snapshot.forEach((childSnapshot) => {
                    // add notification to the 'notifications' array
                    notifications.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    }
                    );
                });
                // set 'notifications' state
                // need to reverse the array because firebase always returns data chronologically
                //dispatchNotifications(setNotifications(notifications.reverse()))
                setNotifications(notifications.reverse())
                // resolve with 
                resolve(onNotificationUpdate)
            });
        })
    })
    return newPromise()
};

/**
 * Unsubscribe from notifications
 * @param {string} userId 
 * @param {function} onNotificationChange 
 */
export const unSubscribeToNotifications = (userId = null, onNotificationChange) => {
    database.ref(`users/${userId}/notifications`).off('value', onNotificationChange);
};

/**
 * Update notifications object to mark notifications as 'read'
 * @param {string} userId 
 * @param {[]} notifications 
 */
export const markNotificationsRead = (userId = null, notifications) => {
    notifications.forEach(not => {
        database.ref(`users/${userId}/notifications/${not.id}`).update(not)
    })
};