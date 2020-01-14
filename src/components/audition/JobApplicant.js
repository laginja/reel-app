import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { startFetchUser } from '../../actions/users';
import usersReducer from '../../reducers/users';

const JobApplicant = ({ jobApplicant }) => {

    const [applicant, dispatchApplicant] = useReducer(usersReducer, [])
    const applicantId = jobApplicant.userId

    useEffect(() => {
        // fetch applicant on component mount. Needed to get displayName for the applicant
        startFetchUser(applicantId, dispatchApplicant)
    }, [applicantId])

    return (
        <Link to={`/user/${jobApplicant.userId}`}>
            <div>{applicant.displayName}</div>
        </Link>    
    )
}

export default JobApplicant;