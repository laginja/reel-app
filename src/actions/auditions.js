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
export const startAddAudition = (auditionData = {}) => {
    const { 
        title = '', 
        description = '', 
        createdAt = 0,
        category = '',
        auditionDate = 0,
        location = '',
        paid = 'false',
        crewMembers = [],
        ownerId = null 
    } = auditionData;
    
    const audition = { title, description, createdAt, category, auditionDate, location, paid, crewMembers, ownerId }

    /* consider returning this promise for later usage */
    database.ref(`auditions/`).push(audition).then((ref) => {
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
    database.ref(`auditions/${id}`).remove().then(() =>{
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
        // add audition to the component state
        dispatchAudition(fetchAudition(snapshot.val()))
    });
};

/* Add applicant to the component state */
export const addApplicant =  (applicant) => {
    return {
        type: 'ADD_APPLICANT',
        applicant: applicant
    }
};

/* Triggers when a user applies for a job in an audition  */
export const startApplyToJob = (auditionId, jobId, userId, dispatchApplicants) => {

    // create applicant object
    let applicant = { userId }

    // add applicant to the DB
    return database.ref(`auditions/${auditionId}/crewMembers/${jobId}/applicants`).push(applicant).then((ref) => {

        // get reference key under which the applicant is stored and add it to the 'applicant' object 
        applicant = {id: ref.key, ...applicant}

        // dispatch that applicant to update the component state 
        dispatchApplicants(addApplicant(applicant))

    });
};

/* Remove applicant from the component state */
export const removeApplicant = (id) => {
    return {
        type: 'REMOVE_APPLICANT',
        id: id
    }
};

/* Triggers when a user un-applies from a job */
export const startUnapplyFromJob = (auditionId, jobId, userId, dispatchApplicants) => {

    // remove applicant from DB
    return database.ref(`auditions/${auditionId}/crewMembers/${jobId}/applicants/${userId}`).remove().then((ref) => {
        // remove applicant from component state
        dispatchApplicants(removeApplicant(userId))
    });
};

/* Set applicants' state */
export const setApplicants = (applicants) => {
    return {
        type: 'POPULATE_APPLICANTS',
        applicants: applicants
    };
};

/* Set applicants for a job */
export const startSetApplicants = (auditionId, jobId, dispatchApplicants) => {

    // fetch applicants of a job
    return database.ref(`auditions/${auditionId}/crewMembers/${jobId}/applicants`).once('value').then((snapshot) => {
        const applicants = [];

        // add 'ref.key' as applicant id
        snapshot.forEach((childSnapshot) => {
            applicants.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        // set applicants to the component state
        dispatchApplicants(setApplicants(applicants))
    });
};
