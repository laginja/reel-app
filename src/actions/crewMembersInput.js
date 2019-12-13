/* Add a new crew member input to the audition form */
export const addCrewMemberInput =  (crewMemberInput) => {
    return {
        type: 'ADD_CREW_MEMBER_INPUT',
        crewMemberInput: crewMemberInput
    }
};

/* Remove a crew member input from the audition form */
export const removeCrewMemberInput = (id) => {
    return {
        type: 'REMOVE_CREW_MEMBER_INPUT',
        id: id
    }
}

/* Update crew member inputs on input change */
export const setCrewMemberInputs = (crewMemberInputs) => {
    return {
        type: 'SET_CREW_MEMBER_INPUTS',
        crewMemberInputs: crewMemberInputs
    }
}