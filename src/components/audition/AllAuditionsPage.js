import React, { useReducer, useState, useRef, useCallback } from 'react';
import { filtersReducer, filtersReducerDefaultState } from '../../reducers/filters';
import auditionsReducer from '../../reducers/auditions';
//import AuthContext from '../context/auth-context';
import Loading from '../Loading';
import AuditionList from './AuditionList';
import AuditionListFilters from './AuditionListFilters';
import AuditionsContext from '../../context/audition-context';

import { useAuditionSearch } from '../../hooks/useSearch';

const AllAuditionsPage = () => {
    //const { currentUser } = useContext(AuthContext)

    // create states and provide dispatch function for the reducer to update that state
    const [auditions, dispatchAuditions] = useReducer(auditionsReducer, [])
    const [filters, dispatchFilters] = useReducer(filtersReducer, filtersReducerDefaultState)
    // number to keep track when we need to load more auditions
    const [pageNumber, setPageNumber] = useState(1)

    const {
        hasMore,
        loading,
        error
    } = useAuditionSearch(pageNumber, dispatchAuditions)

    const observer = useRef()
    const lastAuditionElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                // this means we scrolled to the last element therefore increase the pageNumber to fetch more auditions
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    return (
        <div>
            <AuditionsContext.Provider value={{ auditions, dispatchAuditions, filters, dispatchFilters, lastAuditionElementRef }}>
                <AuditionListFilters />
                <AuditionList />
            </AuditionsContext.Provider>
            <div>{loading && <Loading />}</div>
            <div>{error && 'Error'}</div>
        </div>
    )
}

export default AllAuditionsPage;

