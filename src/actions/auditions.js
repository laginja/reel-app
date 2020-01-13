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

/* SetAuditions - return an object that gets dispatched to change the state */
export const fetchAudition = (audition) => {
    return {
        type: 'FIND_AUDITION',
        audition: audition
    };
};

export const startFetchAudition = (auditionId = null, dispatchAudition) => {
    
    return database.ref(`auditions/${auditionId}`).once('value').then((snapshot) => {
        dispatchAudition(fetchAudition(snapshot.val()))
    });
};

/* Triggers when a user applies for a job in an audition  */
export const startApplyToJob = (auditionId, jobId, userId, dispatchAudition) => {

    const applicantInformation = { userId }

    return database.ref(`auditions/${auditionId}/crewMembers/${jobId}/applicants`).push(applicantInformation).then((ref) => {
        // TODO try to mitigate call to database  
        dispatchAudition(startFetchAudition(auditionId, dispatchAudition))

    });
};

/* Triggers when a user un-applies from a job */
export const startUnapplyFromJob = (auditionId, jobId, userId, dispatchAudition) => {

    return database.ref(`auditions/${auditionId}/crewMembers/${jobId}/applicants/`).remove().then((ref) => {
        // TODO try to mitigate call to database  
        dispatchAudition(startFetchAudition(auditionId, dispatchAudition))

    });
};

/* SetAuditions - return an object that gets dispatched to change the state */
export const setApplicants = (applicants) => {
    return {
        type: 'POPULATE_APPLICANTS',
        applicants: applicants
    };
};

/* ASYNC action that is responsible for fetching data from firebase */
export const startSetApplicants = (auditionId, jobId, dispatchApplicants) => {

    return database.ref(`auditions/${auditionId}/crewMembers/${jobId}/applicants`).once('value').then((snapshot) => {
        const applicants = [];

        snapshot.forEach((childSnapshot) => {
            applicants.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        dispatchApplicants(setApplicants(applicants))
    });
};
