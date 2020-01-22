// Same syntax as a Redux reducer
const jobsInputReducer = (state, action) => {
    switch (action.type) {
        case 'SET_JOB_INPUTS':
            return action.jobInputs;
        case 'ADD_JOB_INPUT':
            return [
                ...state,
                action.jobInput
            ];
        case 'REMOVE_JOB_INPUT':
            return state.filter((job) => job.id !== action.id);
        default:
            return state;
    }
}

export { jobsInputReducer as default }