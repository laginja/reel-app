import React, { useContext, useEffect, useReducer } from 'react';
import { startApplyToJob, startUnapplyFromJob, startSetApplicants } from '../../actions/applicants';
import applicantsReducer from '../../reducers/applicants';
import AuthContext from '../../context/auth-context';
import JobsContext from '../../context/jobs-context';
import Button from 'react-bootstrap/Button';
import JobApplicant from './JobApplicant';

const JobListItem = ({ job }) => {

    const { currentUser } = useContext(AuthContext)
    const { auditionId } = useContext(JobsContext)
    const [applicants, dispatchApplicants] = useReducer(applicantsReducer, [])

    const userUid = currentUser.uid
    const jobId = job.id
    let userId = null
    let hasApplied = false

    // 'applicants' is an object so we need to iterate over it like a collection 
    for (var i in applicants) {
        // check if user is one of the applicants
        if (applicants[i].id === userUid) {
            // set user's ID (ref.key) so the user can be deleted from the DB by the 'ref.key'
            userId = applicants[i].id
            // change the 'Apply' button to 'Applied'
            hasApplied = true
        }      
    }
    
    // apply to a job
    const applyToJob = () => {
        startApplyToJob(jobId, userUid, dispatchApplicants)
    }

    // unapply from a job
    const unapplyFromJob = () => {
        startUnapplyFromJob(jobId, userId, dispatchApplicants).then(() => {
            hasApplied = false
        })
    }

    useEffect(() => {
        // fetch all applicant for this job when the component mounts
        startSetApplicants(jobId, dispatchApplicants)
    }, [auditionId, jobId])

    return (
        <div >
            <h3>{job.job}</h3>
            <p>{job.description}</p>
            {hasApplied ? <Button variant="outline-danger" onClick={unapplyFromJob}>Applied</Button> : <Button variant="success" onClick={applyToJob}>Apply</Button>}
            {applicants.length === 0 ? (
                <p>No Applicants for this job</p>
            ) : (
                    <div>
                        <h3>Applicants:</h3>
                        {
                            applicants.map(jobApplicant => <JobApplicant key={jobApplicant.id} jobApplicant={jobApplicant} />)
                        }
                    </div>
                )}
        </div>
    )
}

export default JobListItem;