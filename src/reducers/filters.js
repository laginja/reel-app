/* default states for the reducer */
export const filtersReducerDefaultState = {
    text: ''
    /* sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month') */
}

// Same syntax as a Redux reducer
export const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }    
        default:
            return state;
    }
}
