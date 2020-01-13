import React, { useContext, useEffect, useReducer } from 'react';
import { startApplyToJob, startUnapplyFromJob, startSetApplicants } from '../../actions/auditions';
import auditionsReducer from '../../reducers/auditions';
import AuthContext from '../../context/auth-context';
import JobApplicant from './JobApplicant';
import JobsContext from '../../context/jobs-context';

const JobListItem = ({ job }) => {

    const { currentUser } = useContext(AuthContext)
    const { auditionId } = useContext(JobsContext)
    const { dispatchAudition } = useContext(JobsContext)

    const userId = currentUser.uid
    const jobId = job.id

    let hasApplied = false

    const [applicants, dispatchApplicants] = useReducer(auditionsReducer, [])
    // const applicants = []

    /* Job Applicants is an object so we need to iterate over it like a collection */
    for (var i in applicants) {
        if (applicants[i].userId === currentUser.uid)
            hasApplied = true
    }

    const applyToJob = () => {
        startApplyToJob(auditionId, jobId, userId, dispatchAudition)
    }

    const unapplyFromJob = () => {
        // TODO
        //startUnapplyFromJob()
    }

    useEffect(() => {
        startSetApplicants(auditionId, jobId, dispatchApplicants)
    }, [])

    return (
        <div >
            <h3>{job.job}</h3>
            <p>{job.description}</p>
            {hasApplied ? <button onClick={unapplyFromJob}>Applied</button> : <button onClick={applyToJob}>Apply</button>}
            {applicants.length === 0 ? (
                <p>No Applicants for this job</p>
            ) : (
                    <div>
                        <h3>Applicants:</h3>
                        {
                            applicants.map(jobApplicant => <JobApplicant key={jobApplicant.userId} jobApplicant={jobApplicant} />)
                        }
                    </div>
                )}
        </div>
    )
}

export default JobListItem;