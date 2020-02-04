import database from '../firebase/firebase';

/* Add applicant to the component state */
export const applyToJob = (applicant) => {
    return {
        type: 'ADD_APPLICANT',
        applicant: applicant
    }
};

/* Triggers when a user applies for a job in an audition  */
export const startApplyToJob = (job, userId, userName, ownerId, auditionTitle, time, dispatchApplicants) => {

    const { auditionId, id: jobId, position: jobTitle } = job

    const applyToJobPromise = (() => {
        return new Promise((resolve) => {
            // create applicant object
            let applicant = { id: userId }

            // add applicant to the DB
            database.ref(`jobs/${jobId}/applicants`).push(userId).then(() => {
                // dispatch that applicant to update the component state 
                dispatchApplicants(applyToJob(applicant))

                // add jobId to the 'users' object under 'applications'
                // this way we track user's job applications under 'users' object 
                database.ref(`users/${userId}/applications`).push(jobId).then(() => {
                    // resolve after everything before has finished
                    resolve()
                })
            });
        })
    })

    const notifiyOwnerPromise =(() => {
        // create a notification object
        const notification = {
            auditionId,
            auditionTitle,
            jobTitle,
            senderId: userId,
            read: false,
            time,
            type: 'applied',
            senderName: userName
        }

        new Promise((resolve) => {
            database.ref(`users/${ownerId}/notifications/`).push(notification).then(() => {
                // resolve after everything before has finished
                resolve()
            })
        })
    })

    applyToJobPromise().then(() => {
        notifiyOwnerPromise()
    })
};

/* Remove applicant from the component state */
export const unapplyFromJob = (id) => {
    return {
        type: 'REMOVE_APPLICANT',
        id: id
    }
};

/* Triggers when a user un-applies from a job */
export const startUnapplyFromJob = (jobId, userId, dispatchApplicants) => {

    const unapplyFromJobPromise = (() => {
        return new Promise((resolve) => {
            // get all applicants for the job
            database.ref(`jobs/${jobId}/applicants`).once('value').then((snapshot) => {
                let applicantToRemove = undefined
                // iterate over all of them
                snapshot.forEach((childSnapshot) => {
                    // find the user in the applicants list
                    if (childSnapshot.val() === userId) {
                        // get user's key
                        applicantToRemove = childSnapshot.key
                    }
                })
                // remove applicant from the 'jobs' object by it's key 
                database.ref(`jobs/${jobId}/applicants/${applicantToRemove}`).remove().then(() => {
                    // get all user's applications
                    database.ref(`users/${userId}/applications`).once('value').then((snapshot) => {
                        let jobToRemove = undefined
                        // iterate over all of them
                        snapshot.forEach((childSnapshot) => {
                            // find the job he applied to in the auditions list
                            if (childSnapshot.val() === jobId) {
                                // get job's key
                                jobToRemove = childSnapshot.key
                            }
                        })
                        // remove job from the applications for the user in 'users' object
                        database.ref(`users/${userId}/applications/${jobToRemove}`).remove().then(() => {
                            // remove applicant from component state
                            dispatchApplicants(unapplyFromJob(userId))
                            // resolve after everything before has finished
                            resolve()
                        })
                    })
                })
            });
        })
    })

    return unapplyFromJobPromise()
};

/* Set applicants' state */
export const setApplicants = (applicants) => {
    return {
        type: 'POPULATE_APPLICANTS',
        applicants: applicants
    };
};

/* Triggers when the component mounts to retrieve all applicants for a JobListItem */
export const startSetApplicants = (jobId, dispatchApplicants) => {

    const setApplicantsPromise = (() => {
        new Promise((resolve) => {
            // get all applicants of a job
            database.ref(`jobs/${jobId}/applicants`).once('value').then((snapshot) => {
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
                // resolve after everything before has finished
                resolve()
            });
        })
    })

    setApplicantsPromise()
};
