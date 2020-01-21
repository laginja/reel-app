import React, { useState, useEffect, useReducer } from 'react';
import { startAddAudition } from '../../actions/auditions';
import { startFetchAudition } from '../../actions/auditions';
import auditionsReducer from '../../reducers/auditions';
import AuditionForm from './AuditionForm';
import Loading from '../Loading';

const EditAuditionPage = (props) => {
    const {id: auditionId} = props.match.params
    const [audition, dispatchAudition] = useReducer(auditionsReducer, [])
    const [auditionLoaded, setAuditionLoaded] = useState(false)

    useEffect(() => {
        console.log("first")
        startFetchAudition(auditionId, dispatchAudition).then((result) => {
            setAuditionLoaded(true)
            
        })
    }, [auditionId]);

    return (
        <div className="content-main__item-wide">
            <h3>Edit audition</h3>
            <h5>{audition.title}</h5>
            { auditionLoaded ? (
                <AuditionForm 
                audition={audition}
                onSubmit={(audition) => {
                    /* TODO: Do I need to dispatch to the store in here ??? */
                    startAddAudition(audition)
                    props.history.push('/')
                }} />
            ) : (
                <Loading/>
            )}
        </div>
    )
}

export default EditAuditionPage;