import database from '../firebase/firebase';

/* Add applicant to the component state */
export const applyToJob =  (applicant) => {
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
    return database.ref(`auditions/${auditionId}/jobs/${jobId}/applicants`).push(applicant).then((ref) => {

        // get reference key under which the applicant is stored and add it to the 'applicant' object 
        applicant = {id: ref.key, ...applicant}

        // dispatch that applicant to update the component state 
        dispatchApplicants(applyToJob(applicant))

    });
};

/* Remove applicant from the component state */
export const unapplyFromJob = (id) => {
    return {
        type: 'REMOVE_APPLICANT',
        id: id
    }
};

/* Triggers when a user un-applies from a job */
export const startUnapplyFromJob = (auditionId, jobId, userId, dispatchApplicants) => {

    // remove applicant from DB
    return database.ref(`auditions/${auditionId}/jobs/${jobId}/applicants/${userId}`).remove().then((ref) => {
        // remove applicant from component state
        dispatchApplicants(unapplyFromJob(userId))
    });
};

/* Set applicants' state */
export const setApplicants = (applicants) => {
    return {
        type: 'POPULATE_APPLICANTS',
        applicants: applicants
    };
};

/* Triggers when the component mounts to retrieve all applicants for a JobListItem */
export const startSetApplicants = (auditionId, jobId, dispatchApplicants) => {

    // fetch applicants of a job
    return database.ref(`auditions/${auditionId}/jobs/${jobId}/applicants`).once('value').then((snapshot) => {
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
