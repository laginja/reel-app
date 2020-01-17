import React, { useContext } from 'react';
import JobsContext from '../../context/jobs-context';
import JobListItem from './JobListItem';

const JobList = () => {

    const { audition } = useContext(JobsContext)
    
    return (
        <div className="list-body">
            {audition.jobs.length === 0 ? (
                <p>No jobs specified for this project</p>
            ) : (
                audition.jobs.map((job) => (
                        <JobListItem key={job.id} job={job} />
                    ))
                )
            }
        </div>
    )
}

export default JobList;