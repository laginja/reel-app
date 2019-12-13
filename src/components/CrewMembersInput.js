import React from 'react';
import PropTypes from 'prop-types';


/* TODO refactor this using a reducer and useReducer */


const CrewMembersInput = ({ crewMember, removeCrewMember, handleCrewMemberChange }) => {
    const jobId = `job-${crewMember.id}`;
    const descriptionId = `descriptionId-${crewMember.id}`;

    /* Remove Crew members */
    const handleRemoveCrewMember = (e) => {
        removeCrewMember(e, crewMember);
    };

    return (
        <div key={`member-${crewMember.id}`}>
            <label htmlFor={jobId}>Job</label>
            <input
                type="text"
                name={jobId}
                data-idx={crewMember.id}
                id={jobId}
                className="job"
                value={crewMember.job}
                onChange={handleCrewMemberChange}
            />
            <label htmlFor={descriptionId}>Description</label>
            <textarea
                type="textarea"
                name={descriptionId}
                data-idx={crewMember.id}
                id={descriptionId}
                className="description"
                value={crewMember.description}
                onChange={handleCrewMemberChange}
            />
            <button onClick={handleRemoveCrewMember}>X</button>
        </div>
    );
};

CrewMembersInput.propTypes = {
    idx: PropTypes.number,
    handleCrewMemberChange: PropTypes.func,
};

export default CrewMembersInput;