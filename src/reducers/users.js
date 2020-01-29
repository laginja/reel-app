// Same syntax as a Redux reducer
const usersReducer = (state, action) => {
    switch (action.type) {
        case 'POPULATE_USERS':
            return action.users;
        case 'FIND_USER':
            return action.user;
        case 'SET_NOTIFICATIONS':
            console.log("reducer", action.notifications)
            return action.notifications;
        default:
            return state;
    }
}

export { usersReducer as default }