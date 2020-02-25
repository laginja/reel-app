import React, { useState, useEffect } from 'react';
import { defaultInputs, positions, actorRoles, genders, ethnicities, compensations } from '../../helpers/jobInputsSpecificData';

/* TODO refactor this using a reducer and useReducer */

//MUI
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';

const JobsInput = ({ job, index, removeJob, handleJobInputChange, resetPositionSpecificData }) => {
    const jobId = `job-${job.id}`;
    const descriptionId = `descriptionId-${job.id}`;
    const compensationId = `compensationId-${job.id}`;

    // Actor
    const ageId = `ageId-${job.id}`;
    const roleId = `roleId-${job.id}`;
    const genderId = `genderId-${job.id}`;
    const ethnicityId = `ethnicityId-${job.id}`;

    // Editor
    const experienceId = `experienceId-${job.id}`;

    const [positionSelect, setPositionSelect] = useState('');
    const [positionSpecificData, setPositionSpecificData] = useState({ defaultInputs })

    const onPositionChange = e => {
        resetPositionSpecificData(positionSelect, e)
        setPositionSelect(e.target.value)
        setPositionSpecificData(defaultInputs)
        handleJobInputChange(e)
    }

    const handleInputChange = (e) => {
        const value = e.target.value
        setPositionSpecificData({
            ...positionSpecificData,
            [e.target.name]: value
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
                <div>
                    <FormControl>
                        <InputLabel htmlFor={roleId}>Role Type</InputLabel>
                        <NativeSelect
                            id={roleId}
                            inputProps={{ 'data-idx': `${index}` }}
                            name="roleType"
                            onChange={handleInputChange}
                            required
                            value={positionSpecificData.roleType}
                        >
                            {actorRoles.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        id={ageId}
                        inputProps={{ 'data-idx': `${index}` }}
                        label="Age"
                        name="age"
                        onChange={handleInputChange}
                        value={positionSpecificData.age}
                        type="number"
                    />
                </div>
                <div>
                    <FormControl>
                        <InputLabel htmlFor={genderId}>Gender</InputLabel>
                        <NativeSelect
                            id={genderId}
                            inputProps={{ 'data-idx': `${index}` }}
                            name="gender"
                            onChange={handleInputChange}
                            required
                            value={positionSpecificData.gender}
                        >
                            {genders.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </div>
                <div>
                    <FormControl>
                        <InputLabel htmlFor={ethnicityId}>Ethnicity</InputLabel>
                        <NativeSelect
                            id={ethnicityId}
                            inputProps={{ 'data-idx': `${index}` }}
                            name="ethnicity"
                            onChange={handleInputChange}
                            required
                            value={positionSpecificData.ethnicity}
                        >
                            {ethnicities.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </div>
            </div>
        )
    }

    const renderEditorDetails = () => {
        return (
            <div>
                <TextField
                    inputProps={{ 'data-idx': `${index}` }}
                    id={experienceId}
                    label="Years of experience"
                    name="experience"
                    onChange={handleInputChange}
                    value={positionSpecificData.experience}
                    type="number"
                />
            </div>
        )
    }

    // Remove Job 
    const handleRemovejob = (e) => {
        removeJob(e, job);
    };

    useEffect(() => {
    
        setPositionSelect(job.position)
        setPositionSpecificData({
            age: job.age,
            compensation: job.compensation,
            ethnicity: job.ethnicity,
            gender: job.gender,
            roleType: job.roleType,
            experience: job.experience
        })
    }, [job])

    return (
        <div key={`member-${job.id}`} className="jobs-input">
            <div>
                <FormControl>
                    <InputLabel htmlFor={jobId}>Position</InputLabel>
                    <NativeSelect
                        id={jobId}
                        inputProps={{ 'data-idx': `${index}` }}
                        name="position"
                        onChange={onPositionChange}
                        required
                        value={job.position}
                    >
                        {positions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </NativeSelect>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <InputLabel htmlFor={compensationId}>Compensation</InputLabel>
                    <NativeSelect
                        id={compensationId}
                        inputProps={{ 'data-idx': `${index}` }}
                        name="compensation"
                        onChange={handleInputChange}
                        required
                        value={job.compensation}
                    >
                        {compensations.map(option => (
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
                    id={descriptionId}
                    inputProps={{ 'data-idx': `${index}` }}
                    label="Job description"
                    name="description"
                    onChange={handleJobInputChange}
                    required
                    value={job.description}
                />
            </div>
            <div>
                <Button
                    color="secondary"
                    onClick={handleRemovejob}
                    size="small"
                    startIcon={<DeleteIcon />}
                    variant="contained"
                >
                    Remove job
                </Button>
            </div>
        </div>
    );
};

export default JobsInput;