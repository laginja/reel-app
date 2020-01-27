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

    database.ref(`auditions/`).push(audition).then((ref) => {
        const auditionId = ref.key

        jobs.forEach((job) => {
            job.auditionId = auditionId
            database.ref(`jobs/`).push(job).then((ref) => {
                database.ref(`auditions/${auditionId}/jobs`).push(ref.key)
            })
        })

        database.ref(`users/${ownerId}/auditions`).push(auditionId)
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
/* When deleting an audition we need to delete audition data in multiple objects */
export const startRemoveAudition = (audition = {}, dispatchAuditions) => {
    const { 
        id: auditionId, 
        ownerId, 
        jobs 
    } = audition

    const deleteAuditionPromise = (() => {
        return new Promise((resolve) => {

            // array to store applicants which need to be deleted
            const applicantsToRemove = []
        
            // array to store jobs which need to be deleted
            const jobsToRemove = []
        
            // iterate over jobs collection of an audition in order to get all applicants 
            for (var job in jobs) {
                // get each job's id
                const jobId = jobs[job]
        
                // query for that job in the 'jobs' object
                database.ref(`jobs/${jobId}`).once('value').then((snapshot) => {
                    // add the job ID to the jobsToRemove array because we need to remove those jobs from the 'users' object
                    jobsToRemove.push(jobId)
        
                    // iterate through job's applicants
                    for (var applicant in snapshot.val().applicants) {
                        // get applicantId
                        const applicantId = snapshot.val().applicants[applicant]
                        // push that ID to the array because we need to know which users have applied for the job
                        applicantsToRemove.push(applicantId)
                    }
                    // remove the job from the DB
                    database.ref(`jobs/${jobId}`).remove().then(() => {
                        // iterate over users that have applied for the job
                        applicantsToRemove.forEach((applicant) => {
                            // find their applications
                            database.ref(`users/${applicant}/applications`).once('value').then((snapshot) => {
                                // iterate over users job application
                                snapshot.forEach((childSnapshot) => {
                                    // check if job application is in jobsToRemove array
                                    if (jobsToRemove.includes(childSnapshot.val())) {
                                        // remove job application from 'users' object
                                        database.ref(`users/${applicant}/applications/${childSnapshot.key}`).remove()
                                    }
                                })
                            })
                        })
                    })
                })
            }
        
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

                        // resolve after everything before has finished
                        resolve()
                    })
                })
            });
        })
    })

    deleteAuditionPromise()
};

/* Triggers when a user edits an audition. Responsible for updating DB with most recent data */
export const startEditAudition = (auditionId, auditionData = {}) => {
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

    // Promise to update the audition in DB
    const updateAuditionPromise = (() => {
        return new Promise((resolve) => {
            // update audition in DB
            database.ref(`auditions/${auditionId}`).update(audition).then(() => {
                resolve()
            })
        })
    })

    // Promise to fill an array with jobs. Each element is a promise but they get resolved in 'Promise.all()'
    const fillJobsArrayPromise = (() => {
        return new Promise((resolve) => {
            // array to store promises
            const promises = []

            jobs.forEach((job) => {
                promises.push(database.ref(`jobs/${job.id}`).update(job))
            })

            // resolve with an array of promises
            resolve(promises)
        })
    })

    // Promise to update jobs in DB
    const updateJobsPromise = ((promises) => {
        return new Promise((resolve) => {
            Promise.all(promises).then(() => {
                resolve()
            })
        })
    })

    updateAuditionPromise().then(() => {
        return fillJobsArrayPromise()
    }).then((promises) => {
        return updateJobsPromise(promises)
    }).then(() => {
        // updating audition done
        console.log("Done updating!")
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
/* In order to fetch data, I need to make several DB queries. Since all queries to firebase return promises (which are async)
   I need to make sure that everything gets done sequentially and 'audition' should be dispatched to the store as the last step.
*/
export const startFetchAudition = (auditionId = null, dispatchAudition) => {

    let audition = undefined

    // Promise to get the audition from the DB
    const getAuditionPromise = (() => {
        return new Promise((resolve) => {
            // fetch audition from the DB
            database.ref(`auditions/${auditionId}`).once('value').then((snapshot) => {
                // store audition data in a variable
                audition = snapshot.val()
                // resolve with the snapshot object
                resolve(snapshot)
            })
        })
    })

    // Promise to fill an array with jobs. Each element is a promise but they don't get resolved until the next promise
    const fillJobsArrayPromise = ((snapshot) => {
        return new Promise((resolve) => {
            // array to store promises
            const promises = []

            // iterate over jobs collection
            for (var jobItem in snapshot.val().jobs) {
                // get each job's id
                const jobId = snapshot.val().jobs[jobItem]
                // query for that job in the 'jobs' object and push the returned promise to the array
                promises.push(database.ref(`jobs/${jobId}`).once('value'))
            }
            // resolve with an array of promises
            resolve(promises)
        })
    })

    // Promise to get all jobs from the DB. Promises that get passed contain promises to get the jobs
    const fetchAllJobsPromise = ((promises) => {
        return new Promise((resolve) => {
            Promise.all(promises).then((snapshot) => {
                // array to store jobs state
                const jobs = []

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
                // resolve with an array of job objects
                resolve(jobs)
            })
        })
    })

    // Promise to dispatch 'audition' to the state
    const dispatch = ((jobs, audition) => {
        return new Promise((resolve) => {
            // replace jobs collection with jobs array because it's easier to manipulate later
            audition = { id: auditionId, ...audition, jobs }
            // add audition to the component state
            dispatchAudition(fetchAudition(audition))
            // resolve with nothing
            resolve(audition)
        })
    })

    // Chaining promises - each method call returns a promise so we can call .then(). That way we are sure
    // that the promise has resolved
    return getAuditionPromise().then((snapshot) => {
        return fillJobsArrayPromise(snapshot)
    }).then((promises) => {
        return fetchAllJobsPromise(promises)
    }).then((jobs) => {
        return dispatch(jobs, audition)
    })
};

/* Fetch auditions from the DB for the given user */
export const startFetchUserAuditions = (userId, dispatchAuditions) => {

    const fetchUserAuditionsPromise = (() => {
        return new Promise((resolve) => {
            // get all auditions created by the user
            database.ref(`users/${userId}/auditions`).once('value').then((snapshot) => {
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

                    // resolve after everything before has finished
                    resolve()
                })
            })
        })
    })

    return fetchUserAuditionsPromise()
};

/* Fetch auditions from the DB for the given user */
export const startFetchUserJobApplications = (userId, dispatchAuditions) => {

    const fetchUserJobApplicationsPromise = (() => {
        return new Promise((resolve) => {
            // get all user application
            database.ref(`users/${userId}/applications`).once('value').then((snapshot) => {
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

                    // resolve after everything before has finished
                    resolve()
                })
            })
        })
    })

    return fetchUserJobApplicationsPromise()
};