// Same syntax as a Redux reducer
const auditionsReducer = (state, action) => {
    switch (action.type) {
        case 'POPULATE_AUDITIONS':
            return action.auditions;
        case 'ADD_AUDITION':
            return [
                ...state,
                action.audition
            ];
        case 'REMOVE_AUDITION':
            return state.filter((audition) => audition.id !== action.id);
        case 'FIND_AUDITION':
            return action.audition;
        case 'POPULATE_APPLICANTS':
            return action.applicants;
        case 'ADD_APPLICANT':
            return [
                ...state,
                action.applicant
            ];
        case 'REMOVE_APPLICANT':
            return state.filter((applicant) => applicant.id !== action.id);
        default:
            return state;
    }
}

export { auditionsReducer as default }