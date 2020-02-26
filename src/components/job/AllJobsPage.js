import React, { useReducer, useState, useRef, useCallback } from 'react'; 
import { filtersReducer, filtersReducerDefaultState } from '../../reducers/filters';
import JobsContext from '../../context/jobs-context';
import jobsReducer from '../../reducers/jobs';

import JobList from '../job/JobList';
import JobListFilters from '../job/JobListFilters';
import Loading from '../Loading';

import { useJobSearch } from '../../hooks/useSearch';

const AllJobsPage = () => {
    // create states and provide dispatch function for the reducer to update that state
    const [jobs, dispatchJobs] = useReducer(jobsReducer, [])
    const [filters, dispatchFilters] = useReducer(filtersReducer, filtersReducerDefaultState)
    // number to keep track when we need to load more auditions
    const [pageNumber, setPageNumber] = useState(1)

    const {
        hasMore,
        loading,
        error
    } = useJobSearch(pageNumber, dispatchJobs)

    const observer = useRef()
    const lastJobElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                // this means we scrolled to the last element therefore increase the pageNumber to fetch more elements
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    return (
        <div>
            <JobsContext.Provider value={{ jobs, filters, dispatchFilters, lastJobElementRef }}>
                <JobListFilters />
                <JobList />
            </JobsContext.Provider>
            <div>{loading && <Loading />}</div>
            <div>{error && 'Error'}</div>
        </div>
    )
}

export default AllJobsPage;