// Same syntax as a Redux reducer
const usersReducer = (state, action) => {
    switch(action.type) {
        case 'FIND_USER':
            return action.user;
        default:
            return state;
    }
}

export { usersReducer as default }