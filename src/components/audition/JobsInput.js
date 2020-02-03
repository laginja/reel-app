import React from 'react';

/* TODO refactor this using a reducer and useReducer */

//MUI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const JobsInput = ({ job, index, removeJob, handleJobInputChange }) => {
    const jobId = `job-${job.id}`;
    const descriptionId = `descriptionId-${job.id}`;

    /* Remove Job */
    const handleRemovejob = (e) => {
        removeJob(e, job);
    };

    return (
        <div key={`member-${job.id}`} className="crew-member-input">
            <div>
                <TextField
                    value={job.job}
                    required
                    name="job"
                    inputProps={{ 'data-idx': `${index}` }}
                    id={jobId}
                    label="Position"
                    onChange={handleJobInputChange} />
            </div>
            <div>
                <TextField
                    value={job.description}
                    required
                    name="description"
                    inputProps={{ 'data-idx': `${index}` }}
                    id={descriptionId}
                    label="Job description"
                    onChange={handleJobInputChange} />
            </div>
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleRemovejob}
                    startIcon={<DeleteIcon />}
                >
                    Remove job
                </Button>
            </div>
        </div>
    );
};

export default JobsInput;