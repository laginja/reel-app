import React from 'react';
import { startAddAudition } from '../../actions/auditions';
import AuditionForm from './AuditionForm';

const AddAuditionPage = (props) => {
    return (
        <div className="content-main__item-wide">
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