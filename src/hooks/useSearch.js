import { useEffect, useState } from 'react'

import { startInitialSetAuditions, startFetchMoreAuditions } from '../actions/auditions'
import { startInitialSetJobs, startFetchMoreJobs } from '../actions/jobs'

export const useAuditionSearch = ((pageNumber, dispatchAuditions) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [referenceToOldest, setReferenceToOldest] = useState()

    // this will get triggered when the page number icreases which happens only when we scroll to the last element i.e. audition
    useEffect(() => {
        setLoading(true)
        setError(false)

        // if 'referenceToOldest' in undefined then this is the initial fetch 
        if (referenceToOldest === undefined) {
            startInitialSetAuditions(dispatchAuditions, setReferenceToOldest, setHasMore, setLoading)
        } else {
            startFetchMoreAuditions(dispatchAuditions, referenceToOldest, setReferenceToOldest, setHasMore, setLoading)
        }
        
        // TODO: CHECK IF THIS IS OK
        // eslint-disable-next-line
    }, [pageNumber, dispatchAuditions])
    return { loading, error, hasMore }
})

export const useJobSearch = ((pageNumber, dispatchJobs) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [referenceToOldest, setReferenceToOldest] = useState()

    // this will get triggered when the page number icreases which happens only when we scroll to the last element i.e. audition
    useEffect(() => {
        setLoading(true)
        setError(false)

        // if 'referenceToOldest' in undefined then this is the initial fetch 
        if (referenceToOldest === undefined) {
            startInitialSetJobs(dispatchJobs, setReferenceToOldest, setHasMore, setLoading)
        } else {
            startFetchMoreJobs(dispatchJobs, referenceToOldest, setReferenceToOldest, setHasMore, setLoading)
        }
        
        // TODO: CHECK IF THIS IS OK
        // eslint-disable-next-line
    }, [pageNumber, dispatchJobs])
    return { loading, error, hasMore }
})
