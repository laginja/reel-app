// Same syntax as a Redux reducer
const crewMembersInputReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CREW_MEMBER_INPUTS':
            return action.crewMemberInputs;
        case 'ADD_CREW_MEMBER_INPUT':
            return [
                ...state,
                action.crewMemberInput
            ];
        case 'REMOVE_CREW_MEMBER_INPUT':
            return state.filter((crewMember) => crewMember.id !== action.id);
        default:
            return state;
    }
}

export { crewMembersInputReducer as default }