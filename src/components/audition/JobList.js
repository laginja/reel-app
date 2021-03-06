import React, { useContext } from 'react';
import AuditionJobsContext from '../../context/audition-jobs-context';
import JobListItem from './JobListItem';

const JobList = () => {

    const { audition } = useContext(AuditionJobsContext)
    const { ownerId, title } = audition

    return (
        <div className="list-body">
            {audition.jobs.length === 0 ? (
                <p>No jobs specified for this project</p>
            ) : (
                audition.jobs.map((job) => (
                        <JobListItem key={ job.id } job={ job } ownerId={ ownerId } auditionTitle={ title } />
                    ))
                )
            }
        </div>
    )
}

export default JobList;