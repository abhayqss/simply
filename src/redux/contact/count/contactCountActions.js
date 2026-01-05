import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ContactService'

const {
    CLEAR_CONTACT_COUNT,
    CLEAR_CONTACT_COUNT_ERROR,
    LOAD_CONTACT_COUNT_REQUEST,
    LOAD_CONTACT_COUNT_SUCCESS,
    LOAD_CONTACT_COUNT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CONTACT_COUNT }
}

export function clearError () {
    return { type: CLEAR_CONTACT_COUNT_ERROR }
}

export function load (receiverId) {
    return dispatch => {
        dispatch({ type: LOAD_CONTACT_COUNT_REQUEST })
        return service.count(receiverId).then(response => {
            dispatch({ type: LOAD_CONTACT_COUNT_SUCCESS, payload: response.data })
        }).catch(e => {
            dispatch({ type: LOAD_CONTACT_COUNT_FAILURE, payload: e })
        })
    }
}
