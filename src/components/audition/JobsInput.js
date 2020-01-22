import React from 'react';

/* TODO refactor this using a reducer and useReducer */

const JobsInput = ({ job, index, removeJob, handleJobInputChange }) => {
    const jobId = `job-${job.id}`;
    const descriptionId = `descriptionId-${job.id}`;

    /* Remove Crew members */
    const handleRemovejob = (e) => {
        removeJob(e, job);
    };

    return (
        <div key={`member-${job.id}`} className="crew-member-input">
            <div className="crew-member-input__header">
                <h3>Member #{job.id + 1}</h3>
                <button className="button button--remove" onClick={handleRemovejob}>X</button>
            </div>
            <input
                type="text"
                name="job"
                placeholder="Job"
                data-idx={index}
                id={jobId}
                className="text-input"
                value={job.job}
                onChange={handleJobInputChange}
            />
            <textarea
                type="textarea"
                name="description"
                placeholder="Description"
                data-idx={index}
                id={descriptionId}
                className="text-input"
                value={job.description}
                onChange={handleJobInputChange}
            />

        </div>
    );
};

export default JobsInput;