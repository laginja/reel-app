/* Add a new crew member input to the audition form */
export const addJobInput =  (jobInput) => {
    return {
        type: 'ADD_JOB_INPUT',
        jobInput: jobInput
    }
};

/* Remove a crew member input from the audition form */
export const removeJobInput = (id) => {
    return {
        type: 'REMOVE_JOB_INPUT',
        id: id
    }
}

/* Update crew member inputs on input change */
export const setJobInputs = (jobInputs) => {
    return {
        type: 'SET_JOB_INPUTS',
        jobInputs: jobInputs
    }
}