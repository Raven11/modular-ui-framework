export const notification = (state={}, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            let { notification_type, message } = action
            return Object.assign({}, state, {
                message,
                notification_type,
            })
        case 'CLEAR_NOTIFICATION':
            return {}
    }
    return state;
}


export const ui = (state={}, action) => {
    switch (action.type) {
        case 'IS_LOADING':
            return Object.assign({}, state, {
                isLoading: action.isLoading
            });
            break;
        case 'IS_SUBMITTING':
            return Object.assign({}, state, {
                isSubmitting: action.isSubmitting
            });
            break;
    }
    return state;
}

export const generic = (state={}, action) => {
    switch (action.type) {
        case 'UPDATE_STATE':
            return {
              ...state,
              newState:action.newState
            }
            break;
    }
    return state;
}
