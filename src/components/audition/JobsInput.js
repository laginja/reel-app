import React, { useState, useEffect } from 'react';

/* TODO refactor this using a reducer and useReducer */

//MUI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const JobsInput = ({ job, index, removeJob, handleJobInputChange }) => {
    const defaultInputs = {
        age: ''
    }

    const positions = [
        {
            value: '',
            label: '',
        },
        {
            value: 'Actor',
            label: 'Actor',
        },
        {
            value: 'Editor',
            label: 'Editor',
        },
        {
            value: 'Producer',
            label: 'Producer',
        }
        ,
        {
            value: 'Camera',
            label: 'Camera',
        },
        {
            value: 'Sound designer',
            label: 'Sound designer',
        },
        {
            value: 'Composer',
            label: 'Composer',
        }
    ];

    const jobId = `job-${job.id}`;
    const descriptionId = `descriptionId-${job.id}`;
    const ageId = `ageId-${job.id}`;

    const [positionSelect, setPositionSelect] = useState(''); 
    const [positionSpecificData, setPositionSpecificData] = useState({defaultInputs})
    
    const onPositionChange = e => {
        setPositionSelect(e.target.value)
        setPositionSpecificData(defaultInputs)
        handleJobInputChange(e)
    }

    const handleInputChange = (e) => {
        const value = e.target.value
        setPositionSpecificData({
            ...positionSpecificData,
            [e.target.name] : value
        })
        handleJobInputChange(e)
    }

    const renderSwitch = positionSelect => {
        switch (positionSelect) {
            case "Actor":
                return renderActorDetails();
            case "Editor":
                return renderEditorDetails();


            default:
                break;
        }
    }

    const renderActorDetails = () => {
        return (
            <div>
                <TextField
                    value={positionSpecificData.age}
                    name="age"
                    inputProps={{ 'data-idx': `${index}` }}
                    id={ageId}
                    label="Age"
                    onChange={handleInputChange} />
            </div>
        )
    }

    const renderEditorDetails = () => {
        return <div>Editor</div>
    }

    /* Remove Job */
    const handleRemovejob = (e) => {
        removeJob(e, job);
    };

    useEffect(() => {
        setPositionSelect(job.position)
        setPositionSpecificData({
            age: job.age
        })
    }, [job])

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
                        onChange={onPositionChange}
                    >
                        {positions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </NativeSelect>
                </FormControl>
            </div>
            {
                positionSelect !== "" ? renderSwitch(positionSelect) : ""
            }
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