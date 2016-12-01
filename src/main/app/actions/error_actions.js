export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export function receiveErrors(errors) {
    return {
        type: RECEIVE_ERRORS,
        errors: errors
    }
}

export function clearErrors() {
    return {
        type: CLEAR_ERRORS,
        errors: []
    }
}

export function flashErrors(errors) {
    return (dispatch) => {
        dispatch(receiveErrors(errors));
        setTimeout(function() {
            dispatch(clearErrors())
        }, 1500)

    }
}