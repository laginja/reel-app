import React, { useEffect, useState, useReducer } from 'react';
import { startFetchAudition } from '../actions/auditions';
import auditionsReducer from '../reducers/auditions';
import Loading from '../components/Loading';

const AuditionPage = (props) => {

    const { id } = props.match.params

    // create states and provide dispatch function for the reducer to update that state
    const [audition, dispatchAudition] = useReducer(auditionsReducer, [])
    const [auditionLoaded, setAuditionLoaded] = useState(false)

    useEffect(() => {
        startFetchAudition(id, dispatchAudition).then(() => {
            setAuditionLoaded(true)
        })
    }, [])

    return (
        <div className="content-main__item-wide">
            <div className="main">
                { auditionLoaded ? <h1>{audition.title}</h1> : <Loading/>}
            </div>
        </div>
    )
}

export default AuditionPage;