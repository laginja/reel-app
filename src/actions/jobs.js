import database from '../firebase/firebase';
/**
 * This will set initially loaded jobs to the state
 * 
 * @param {[]} jobs 
 */
export const setJobs = (jobs) => {
    return {
        type: 'POPULATE_JOBS',
        jobs: jobs
    };
};

/**
 * Triggered when user visits the homepage to fetch initial set of data to display
 * 
 * @param {function} dispatchJobs 
 * @param {function} setReferenceToOldest 
 * @param {function} setHasMore 
 * @param {function} setLoading 
 */
export const startInitialSetJobs = (dispatchJobs, setReferenceToOldest, setHasMore, setLoading) => {
    // set how many jobs we want to fetch initially
    const numberToFetch = 16;
    // query DB for most recent jobs (inserted last into DB) ordering them by key (this will order them by having the most recent audition in the last place)
    database.ref('jobs/')
        .orderByKey()
        .limitToLast(numberToFetch)
        .once('value')
        .then((snapshot) => {
            const jobs = [];

            snapshot.forEach((childSnapshot) => {
                jobs.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            // after fetching jobs reverse their order so the most recent audition gets placed on the first place
            jobs.reverse()
            dispatchJobs(setJobs(jobs))
            // check whether we fetch any jobs. If so then find the last audition and mark it as the audition from which next query needs to fetch more jobs
            if (jobs.length !== 0) {
                setReferenceToOldest(jobs[jobs.length - 1].id)
            }

            // if we fetch less than the 'numberToFetch' then we don't have any more jobs in the DB
            setHasMore(jobs.length > 0 && jobs.length >= numberToFetch)
            setLoading(false)
        })
};

/**
 * Append the newly fetched jobs to the existing jobs state
 * 
 * @param {[]} jobs 
 */
export const setMoreJobs = (jobs) => {
    return {
        type: 'APPEND_JOBS',
        jobs: jobs
    };
};

/**
 * Triggers once the user scrolls down the list of jobs. This functions loads jobs 'as-we-go' and appends them to the state
 * 
 * @param {function} dispatchJobs 
 * @param {function} setReferenceToOldest 
 * @param {function} setHasMore 
 * @param {function} setLoading 
 */
export const startFetchMoreJobs = (dispatchJobs, referenceToOldest, setReferenceToOldest, setHasMore, setLoading) => {
    // set how many jobs we want to fetch on each new scroll. Increment that number by 1 because the last audition is a duplicate and it will get removed 
    const numberToFetch = 9;
    // query DB for most recent jobs (inserted last into DB) but start from the audition marked as 'the oldest'
    database.ref('jobs/')
        .orderByKey()
        .endAt(referenceToOldest)
        .limitToLast(numberToFetch)
        .once('value')
        .then((snapshot) => {
            let jobs = [];

            snapshot.forEach((childSnapshot) => {
                jobs.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            // after fetching jobs sort them, reverse their order so the most recent audition gets placed on the first place and remove the last one since it's the one we
            // started with (.endAt() includes the audition we specifie as the last one)
            jobs = jobs.sort().reverse().slice(1)
            dispatchJobs(setMoreJobs(jobs))
            // check whether we fetch any jobs. If so then find the last audition and mark it as the audition from which next query needs to fetch more jobs
            if (jobs.length !== 0) {
                setReferenceToOldest(jobs[jobs.length - 1].id)
            }

            // if we fetch less than the 'numberToFetch - 1' then we don't have any more jobs in the DB
            setHasMore(jobs.length > 0 && jobs.length >= numberToFetch-1)
            setLoading(false)
        })
};