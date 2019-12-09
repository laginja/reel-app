import database from '../firebase/firebase';

/*  Action generators

    WORKFLOW WITH ASYNC : 
    component call action generator
    action generator returns function that does some asynchronous work
    component dispatches function (?)
    function runs (has the ability to dispatch other actions and do whatever it wants) 
*/

/* AddAudition - return an object that gets dispatched to change the state */
export const addAudition =  (audition) => {
    return {
        type: 'ADD_AUDITION',
        audition: audition
    }
};

/* ASYNC action that is responsible for adding data to firebase */
export const startAddAudition = (dispatchAuditions, {title = '', body = ''}, currentUser ) => {
    const audition = { title, body };

    /* get uid from the logged in user */
    const uid = currentUser.uid;

    /* consider returning this promise for later usage */
    database.ref(`users/${uid}/notes/`).push(audition).then((ref) => {
        //  after the data if pushed, call dispatch to add data to redux store
        dispatchAuditions(addAudition({
            id: ref.key,
            ...audition
        }));
    });
};

/* RemoveAudition - return an object that gets dispatched to change the state */
export const removeAudition = ({ id }) => {
    return {
        type: 'REMOVE_AUDITION',
        id: id
    }
};

/* ASYNC action that is responsible for removing data from firebase */
export const startRemoveAudition = (dispatchAuditions, audition = {}, currentUser) => {
    /* get uid from the logged in user */
    const uid = currentUser.uid;

    const { id } = audition
    /* consider returning this promise for later usage */
    database.ref(`users/${uid}/notes/${id}`).remove().then(() =>{
        dispatchAuditions(removeAudition({ id }));
    });
}; 

/* SetAuditions - return an object that gets dispatched to change the state */
export const setAuditions = (auditions) => {
    return {
        type: 'POPULATE_AUDITIONS',
        auditions: auditions
    };
};

/* ASYNC action that is responsible for fetching data from firebase */
export const startSetAuditions = (dispatchAuditions, currentUser) => {
    /* get uid from the logged in user */
    const uid = currentUser.uid;

    return database.ref(`users/${uid}/notes`).once('value').then((snapshot) => {
        const auditions = [];

        snapshot.forEach((childSnapshot) => {
            auditions.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        dispatchAuditions(setAuditions(auditions))
    });
};

