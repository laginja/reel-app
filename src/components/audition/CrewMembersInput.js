import React from 'react';
import PropTypes from 'prop-types';


/* TODO refactor this using a reducer and useReducer */


const CrewMembersInput = ({ crewMember, removeCrewMember, handleCrewMemberInputChange }) => {
    const jobId = `job-${crewMember.id}`;
    const descriptionId = `descriptionId-${crewMember.id}`;

    /* Remove Crew members */
    const handleRemoveCrewMember = (e) => {
        removeCrewMember(e, crewMember);
    };

    return (
        <div key={`member-${crewMember.id}`} className="crew-member-input">
            <div className="crew-member-input__header">
                <h3>Member #{crewMember.id + 1}</h3>
                <button className="button button--remove" onClick={handleRemoveCrewMember}>X</button>
            </div>
            <input
                type="text"
                name="job"
                placeholder="Job"
                data-idx={crewMember.id}
                id={jobId}
                className="text-input"
                value={crewMember.job}
                onChange={handleCrewMemberInputChange}
            />
            <textarea
                type="textarea"
                name="description"
                placeholder="Description"
                data-idx={crewMember.id}
                id={descriptionId}
                className="text-input"
                value={crewMember.description}
                onChange={handleCrewMemberInputChange}
            />

        </div>
    );
};

CrewMembersInput.propTypes = {
    idx: PropTypes.number,
    handleCrewMemberInputChange: PropTypes.func,
};

export default CrewMembersInput;