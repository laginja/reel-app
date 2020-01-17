import database from '../firebase/firebase';

/* Add applicant to the component state */
export const applyToJob = (applicant) => {
    return {
        type: 'ADD_APPLICANT',
        applicant: applicant
    }
};

/* Triggers when a user applies for a job in an audition  */
export const startApplyToJob = (auditionId, jobId, userId, dispatchApplicants) => {

    // create applicant object
    let applicant = { id: userId }

    // add applicant to the DB
    return database.ref(`auditions/${auditionId}/jobs/${jobId}/applicants`).push(userId).then(() => {
        // dispatch that applicant to update the component state 
        dispatchApplicants(applyToJob(applicant))

        // add auditionId to the 'users' object under 'applications'
        // this way we track user's applications under 'users' object 
        database.ref(`users/${userId}/applications`).push(auditionId)
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

    // get all applicants for the job
    database.ref(`auditions/${auditionId}/jobs/${jobId}/applicants`).once('value').then((snapshot) => {
        let applicantToRemove = undefined
        // iterate over all of them
        snapshot.forEach((childSnapshot) => {
            // find the user in the applicants list
            if (childSnapshot.val() === userId) {
                // get user's key
                applicantToRemove = childSnapshot.key
            }
        })
        // remove applicant from the 'applicants' object by it's key 
        database.ref(`auditions/${auditionId}/jobs/${jobId}/applicants/${applicantToRemove}`).remove().then(() => {
            // get all user's applications
            database.ref(`users/${userId}/applications`).once('value').then((snapshot) => {
                let applicationToRemove = undefined
                // iterate over all of them
                snapshot.forEach((childSnapshot) => {
                    // find the audition he applied to in the auditions list
                    if (childSnapshot.val() === auditionId) {
                        // get audition's key
                        applicationToRemove = childSnapshot.key
                    }
                })
                // remove audition from the applications for the user in 'users' object
                database.ref(`users/${userId}/applications/${applicationToRemove}`).remove().then(() => {
                    // remove applicant from component state
                    dispatchApplicants(unapplyFromJob(userId))
                })
            })
        })
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

    // get all applicants of a job
    return database.ref(`auditions/${auditionId}/jobs/${jobId}/applicants`).once('value').then((snapshot) => {
        const applicants = [];

        // iterate over all of them
        snapshot.forEach((childSnapshot) => {
            // add applicant to the 'applicants' array and append it the ID
            applicants.push({
                id: childSnapshot.val()
            });
        });

        // set applicants to the component state
        dispatchApplicants(setApplicants(applicants))
    });
};
