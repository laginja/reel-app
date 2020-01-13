import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { startFetchUser } from '../../actions/users';
import usersReducer from '../../reducers/users';

const JobApplicant = ({ jobApplicant }) => {

    const [applicant, dispatchApplicant] = useReducer(usersReducer, [])

    useEffect(() => {
        startFetchUser(jobApplicant.userId, dispatchApplicant)
    })

    return (
        <Link to={`/user/${jobApplicant.userId}`}>
            <div>{applicant.displayName}</div>
        </Link>    
    )
}

export default JobApplicant;