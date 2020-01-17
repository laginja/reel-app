import database from '../firebase/firebase';

/*  Action generators

    WORKFLOW WITH ASYNC : 
    component call action generator
    action generator returns function that does some asynchronous work
    component dispatches function (?)
    function runs (has the ability to dispatch other actions and do whatever it wants) 
*/

/* AddAudition - return an object that gets dispatched to change the state */
export const addAudition = (audition) => {
    return {
        type: 'ADD_AUDITION',
        audition: audition
    }
};

/* ASYNC action that is responsible for adding data to firebase */
export const startAddAudition = (auditionData = {}) => {
    const {
        title = '',
        description = '',
        createdAt = 0,
        category = '',
        auditionDate = 0,
        location = '',
        paid = 'false',
        jobs = [],
        ownerId = null
    } = auditionData;

    const audition = { title, description, createdAt, category, auditionDate, location, paid, ownerId }

    /* consider returning this promise for later usage */
    database.ref(`auditions/`).push(audition).then((ref) => {
        const auditionId = ref.key

        jobs.forEach((job) => {
            database.ref(`auditions/${auditionId}/jobs`).push(job)
        })

        database.ref(`users/${ownerId}/auditions`).push(auditionId)
        //  after the data if pushed, call dispatch to add data to redux store
        /* dispatchAuditions(addAudition({
            id: ref.key,
            ...audition
        })); */
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
export const startRemoveAudition = (dispatchAuditions, audition = {}) => {
    const { id } = audition
    /* consider returning this promise for later usage */
    database.ref(`auditions/${id}`).remove().then(() => {
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
export const startSetAuditions = (dispatchAuditions) => {

    return database.ref(`auditions/`).once('value').then((snapshot) => {
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

/* Set audition to the component state */
export const fetchAudition = (audition) => {
    return {
        type: 'FIND_AUDITION',
        audition: audition
    };
};

/* Fetch audition from the DB and store it into component state */
export const startFetchAudition = (auditionId = null, dispatchAudition) => {

    // fetch audition from the DB
    return database.ref(`auditions/${auditionId}`).once('value').then((snapshot) => {
        const jobs = []

        // iterate over jobs collection
        for (var jobItem in snapshot.val().jobs) {
            // get a job lol
            let job = snapshot.val().jobs[jobItem]
            // set it's id as the FB entry
            job.id = jobItem
            // append it to the jobs array
            jobs.push(job)
        }      

        let audition = snapshot.val()
        // replace jobs collection with jobs array because it's easier to manipulate later
        audition = {...audition, jobs }
        // add audition to the component state
        dispatchAudition(fetchAudition(audition))
    });
};

/* Fetch auditions from the DB for the given user */
export const startFetchUserAuditions = (userId, dispatchAuditions) => {

    // get all auditions created by the user
    return database.ref(`users/${userId}/auditions`).once('value').then((snapshot) => {
        // array to store auditions state
        const userAuditions = []

        // array to store promises
        const promises = []

        // iterate over each audition to get it's ID
        snapshot.forEach((childSnapshot) => {
            // query for that audition in the 'auditions' object and push the returned promise to the array
            promises.push(database.ref(`auditions/${childSnapshot.val()}`).once('value'))
        })

        // make sure to execute this only after all auditions have been queried
        Promise.all(promises).then((snapshot) => {
            // iterate over each audition
            snapshot.forEach((childSnapshot) => {
                // store each audition in the array that gets dispatched to set the state
                userAuditions.push({
                    // append audition's ID to the audition object
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            // dispatch userAuditions to the store
            dispatchAuditions(setAuditions(userAuditions))
        })
    }) 
};