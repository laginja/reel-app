import React, { useContext } from 'react';
import { startApplyToJob } from '../../actions/auditions';
import AuthContext from '../../context/auth-context';
import JobsContext from '../../context/jobs-context';

const JobListItem = ({ job }) => {

    const { currentUser } = useContext(AuthContext)
    const { auditionId } = useContext(JobsContext)
    const { dispatchAudition } = useContext(JobsContext)
    
    const userId = currentUser.uid

    let hasApplied = false
    const applicants = []

    for (var i in job.applicants) {
        applicants.push(job.applicants[i])
        if (job.applicants[i] === currentUser.uid)
            hasApplied = true
    }

    const applyToJob = () => {
        startApplyToJob(auditionId, job.id, userId, dispatchAudition)
    }

    return (
        <div >
            <h3>{job.job}</h3>
            <p>{job.description}</p>
            {hasApplied ? <h3>Applied</h3> : <button onClick={applyToJob}>Apply</button>}
            <h3>Applicants:</h3>
            {applicants}
        </div>
    )
}

export default JobListItem