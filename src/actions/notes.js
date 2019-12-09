import database from '../firebase/firebase';

/*  Action generators

    WORKFLOW WITH ASYNC : 
    component call action generator
    action generator returns function that does some asynchronous work
    component dispatches function (?)
    function runs (has the ability to dispatch other actions and do whatever it wants) 
*/

/* AddNote - return an object that gets dispatched to change the state */
export const addNote =  (note) => {
    return {
        type: 'ADD_NOTE',
        note: note
    }
};

/* ASYNC action that is responsible for adding data to firebase */
export const startAddNote = (dispatchNotes, {title = '', body = ''}, currentUser ) => {
    const note = { title, body };

    /* get uid from the logged in user */
    const uid = currentUser.uid;

    /* consider returning this promise for later usage */
    database.ref(`users/${uid}/notes/`).push(note).then((ref) => {
        //  after the data if pushed, call dispatch to add data to redux store
        dispatchNotes(addNote({
            id: ref.key,
            ...note
        }));
    });
};

/* RemoveNote - return an object that gets dispatched to change the state */
export const removeNote = ({ id }) => {
    return {
        type: 'REMOVE_NOTE',
        id: id
    }
};

/* ASYNC action that is responsible for removing data from firebase */
export const startRemoveNote = (dispatchNotes, note = {}, currentUser) => {
    /* get uid from the logged in user */
    const uid = currentUser.uid;

    const { id } = note
    /* consider returning this promise for later usage */
    database.ref(`users/${uid}/notes/${id}`).remove().then(() =>{
        dispatchNotes(removeNote({ id }));
    });
}; 

/* SetNote - return an object that gets dispatched to change the state */
export const setNotes = (notes) => {
    return {
        type: 'POPULATE_NOTES',
        notes: notes
    };
};

/* ASYNC action that is responsible for fetching data from firebase */
export const startSetNotes = (dispatchNotes, currentUser) => {
    /* get uid from the logged in user */
    const uid = currentUser.uid;

    return database.ref(`users/${uid}/notes`).once('value').then((snapshot) => {
        const notes = [];

        snapshot.forEach((childSnapshot) => {
            notes.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        dispatchNotes(setNotes(notes))
    });
};

