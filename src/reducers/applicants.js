const applicantsReducer = (state,action) => {
    switch(action.type) {
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

export { applicantsReducer as default }