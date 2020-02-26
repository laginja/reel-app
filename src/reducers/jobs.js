// Same syntax as a Redux reducer
const jobsReducer = (state, action) => {
    switch (action.type) {
        case 'POPULATE_JOBS':
            return action.jobs;
        case 'ADD_JOBS':
            return [
                ...state,
                action.job
            ];
        case 'APPEND_JOBS':
            return [
                ...state,
                ...action.jobs
            ];
        case 'REMOVE_JOB':
            return state.filter(job => job.id !== action.id);
        case 'FIND_JOB':
            return action.job;
        case 'FIND_JOBS':
            return state.find(job => job.ownerId === action.ownerId);
        default:
            return state;
    }
}

export { jobsReducer as default }