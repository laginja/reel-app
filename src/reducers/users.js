// Same syntax as a Redux reducer
const usersReducer = (state, action) => {
    switch (action.type) {
        case 'POPULATE_USERS':
            return action.users;
        case 'FIND_USER':
            return action.user;
        case 'SET_NOTIFICATIONS':
            return action.notifications;
        case 'MARK_NOTIFICATIONS_READ':
            state.notifications.forEach(not => not.read = true)
            return {
                ...state
            }
        default:
            return state;
    }
}

export { usersReducer as default }