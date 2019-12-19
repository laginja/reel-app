import React, { useContext } from 'react';
import { startApplyToJob } from '../../actions/auditions';
import AuthContext from '../../context/auth-context';
import JobsContext from '../../context/jobs-context';

const JobListItem = ({ job }) => {

    const { currentUser } = useContext(AuthContext)
    const { auditionId } = useContext(JobsContext)
    
    const userId = currentUser.uid

    let hasApplied = false
    const applicants = job.applicants

    for (var i in applicants) {
        if (applicants[i] === currentUser.uid)
            hasApplied = true
    }

    const applyToJob = () => {
        startApplyToJob(auditionId, job.id, userId)
        console.log(auditionId)
    }

    return (
        <div >
            <h3>{job.job}</h3>
            <p>{job.description}</p>
            {hasApplied ? <h3>Applied</h3> : <button onClick={applyToJob}>Apply</button>}
        </div>
    )
}

export default JobListItem