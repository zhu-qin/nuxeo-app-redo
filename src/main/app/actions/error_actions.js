export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS'

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