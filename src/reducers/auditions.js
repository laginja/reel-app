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
        case 'APPEND_AUDITIONS':
            return [
                ...state,
                ...action.auditions
            ];
        case 'REMOVE_AUDITION':
            return state.filter((audition) => audition.id !== action.id);
        case 'FIND_AUDITION':
            return action.audition;
        case 'FIND_AUDITIONS':
            return state.find((audition) => audition.ownerId === action.ownerId);
        default:
            return state;
    }
}

export { auditionsReducer as default }