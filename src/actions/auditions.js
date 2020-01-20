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
            job.auditionId = auditionId
            database.ref(`jobs/`).push(job).then((ref) => {
                database.ref(`auditions/${auditionId}/jobs`).push(ref.key)
            })
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
export const removeAudition = (id) => {
    return {
        type: 'REMOVE_AUDITION',
        id: id
    }
};

/* Triggers when a user deletes an audition */
export const startRemoveAudition = (audition = {}, dispatchAuditions) => {
    const { id: auditionId, ownerId, jobs } = audition

    const jobsPromises = []

    const applicantsToRemove = []

    const jobsToRemove = []

    console.log(jobs)

    // iterate over jobs collection
    for (var job in jobs) {
        // get each job's id
        const jobId = jobs[job]

        // query for that job in the 'jobs' object and push the returned promise to the array
        database.ref(`jobs/${jobId}`).once('value').then((snapshot) => {
            const jobId = snapshot.key
            for (var applicant in snapshot.val().applicants) {
                const applicantId = snapshot.val().applicants[applicant]

                applicantsToRemove.push(applicantId)
                console.log(applicantsToRemove)
            }

            jobsToRemove.push(jobId)
            console.log("jobs", jobsToRemove)
            database.ref(`jobs/${jobId}`).remove().then(() => {
                applicantsToRemove.forEach((applicant) => {
                    database.ref(`users/${applicant}/applications`).once('value').then((snapshot) => {  
        
                        snapshot.forEach((childSnapshot) => {
                            if (jobsToRemove.includes(childSnapshot.val())) {
                                database.ref(`users/${applicant}/applications/${childSnapshot.key}`).remove()
                            }
                        })
                    })
                })
        
                // remove audition from the 'auditions' object
                database.ref(`auditions/${auditionId}`).remove().then(() => {
        
                    // remove the same audition from the 'users' object
                    // fetch all auditions of the owner
                    database.ref(`users/${ownerId}/auditions`).once('value').then((snapshot) => {
                        let auditionToRemove = undefined
        
                        // iterate over user's auditions
                        snapshot.forEach((childSnapshot) => {
                            // find the one that has the value of deleted audition
                            if (childSnapshot.val() === auditionId) {
                                // get that audition's key
                                auditionToRemove = childSnapshot.key
                            }
                        })
        
                        // remove audition from the 'users' object based on the key
                        database.ref(`users/${ownerId}/auditions/${auditionToRemove}`).remove().then(() => {
                            dispatchAuditions(removeAudition(auditionId));
                        })
                    })
                });
            })
        })
    }

    // make sure to execute this only after all auditions have been queried
    Promise.all(jobsPromises).then((snapshot) => {
        // iterate over each audition
        snapshot.forEach((childSnapshot) => {
            
        })

        
    })


};

/* SetAuditions - return an object that gets dispatched to change the state */
export const setAuditions = (auditions) => {
    return {
        type: 'POPULATE_AUDITIONS',
        auditions: auditions
    };
};

/* Triggers when user visits the AllAuditionsPage */
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
        // store audition data in a variable
        let audition = snapshot.val()

        // array to store jobs state
        const jobs = []

        // array to store promises
        const promises = []

        // iterate over jobs collection
        for (var jobItem in snapshot.val().jobs) {
            // get each job's id
            const jobId = snapshot.val().jobs[jobItem]

            // query for that job in the 'jobs' object and push the returned promise to the array
            promises.push(database.ref(`jobs/${jobId}`).once('value'))
        }

        // make sure to execute this only after all jobs have been queried
        Promise.all(promises).then((snapshot) => {
            // iterate over each job
            snapshot.forEach((childSnapshot) => {
                // store each job in the array that gets dispatched to set the state
                jobs.push({
                    // set job info
                    ...childSnapshot.val(),
                    // replace/append job ID 
                    id: childSnapshot.key
                })
            })

            // replace jobs collection with jobs array because it's easier to manipulate later
            audition = { ...audition, jobs }

            console.log(audition)
            // add audition to the component state
            dispatchAudition(fetchAudition(audition))
        })

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

/* Fetch auditions from the DB for the given user */
export const startFetchUserJobApplications = (userId, dispatchAuditions) => {

    // get all user application
    return database.ref(`users/${userId}/applications`).once('value').then((snapshot) => {
        // array to store applications state
        const userJobApplications = []

        // array to store promises
        const promises = []

        // iterate over each job to get it's ID
        snapshot.forEach((childSnapshot) => {
            // query for that job in the 'jobs' object and push the returned promise to the array
            promises.push(database.ref(`jobs/${childSnapshot.val()}`).once('value'))
        })

        // make sure to execute this only after all auditions have been queried
        Promise.all(promises).then((snapshot) => {
            // iterate over each job
            snapshot.forEach((childSnapshot) => {
                // store each job in the array that gets dispatched to set the state
                userJobApplications.push({
                    // append job's ID to the userJobApplications object
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            // dispatch userJobApplications to the store
            dispatchAuditions(setAuditions(userJobApplications))
        })
    })
};