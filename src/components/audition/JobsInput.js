import React from 'react';

/* TODO refactor this using a reducer and useReducer */

//MUI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const JobsInput = ({ job, index, removeJob, handleJobInputChange }) => {
    const jobId = `job-${job.id}`;
    const descriptionId = `descriptionId-${job.id}`;

    const positions = [
        {
            value: 'Actor',
            label: 'Actor',
        },
        {
            value: 'Editor',
            label: 'Editor',
        }
    ];

    /* Remove Job */
    const handleRemovejob = (e) => {
        removeJob(e, job);
    };

    return (
        <div key={`member-${job.id}`} className="jobs-input">
            <div>
            <FormControl>
                <NativeSelect
                    value={job.position}
                    required
                    name="position"
                    id={jobId}
                    
                    inputProps={{ 'data-idx': `${index}` }}
                    onChange={handleJobInputChange("idx")}
                >
                    {positions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </NativeSelect>
                </FormControl>
            </div>
            {/* <div>
                <TextField
                    value={job.position}
                    required
                    name="position"
                    inputProps={{ 'data-idx': `${index}` }}
                    id={jobId}
                    label="Position"
                    onChange={handleJobInputChange} />
            </div> */}
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