import React, { useEffect, useReducer, useState, useContext } from 'react';
import { filtersReducer, filtersReducerDefaultState } from '../reducers/filters';
import auditionsReducer from '../reducers/auditions';
import AuthContext from '../context/auth-context';
import AddAuditionForm from './AddAuditionForm';
import Loading from './Loading';
import AuditionList from './AuditionList';
import AuditionListFilters from './AuditionListFilters';
import AuditionsContext from '../context/audition-context';
import { startSetAuditions } from '../actions/auditions';

const AuditionApp = () => {
    const { currentUser } = useContext(AuthContext)
    
    // create states and provide dispatch function for the reducer to update that state
    const [auditions, dispatchAuditions] = useReducer(auditionsReducer, [])
    const [filters, dispatchFilters] = useReducer(filtersReducer, filtersReducerDefaultState)

    /* State to track if auditions have been loaded */
    const [auditionsLoaded, setAuditionsLoaded] = useState(false)

    /* Fires only once when the component mounts (or the user gets set) */
    useEffect(() => {
        /* Start async call to get auditions from the DB */
        startSetAuditions(dispatchAuditions, currentUser).then(() => {
            /* auditions have been loaded, set to true*/
            setAuditionsLoaded(true)
        })
    }, [currentUser])

    return (
        <AuditionsContext.Provider value={{ auditions, dispatchAuditions, filters, dispatchFilters }}>
            <AuditionListFilters />
            { auditionsLoaded ? <AuditionList /> : <Loading />}
            <AddAuditionForm />
        </AuditionsContext.Provider>
    )
}

export default AuditionApp

