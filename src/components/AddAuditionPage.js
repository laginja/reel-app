import React from 'react';
import AuditionForm from './AuditionForm';
import { startAddAudition } from '../actions/auditions';

const AddAuditionPage = (props) => {
    return (
        <div className="main">
            <h3>New audition</h3>
            <AuditionForm 
                onSubmit={(audition) => {
                    /* TODO: Do I need to dispatch to the store in here ??? */
                    startAddAudition(audition)
                    props.history.push('/')
                }} />
        </div>
    )
}

export default AddAuditionPage;