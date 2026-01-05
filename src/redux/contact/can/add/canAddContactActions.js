import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ContactService'

const {
    CLEAR_CAN_ADD_CONTACT,
    CLEAR_CAN_ADD_CONTACT_ERROR,
    LOAD_CAN_ADD_CONTACT_REQUEST,
    LOAD_CAN_ADD_CONTACT_SUCCESS,
    LOAD_CAN_ADD_CONTACT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CAN_ADD_CONTACT }
}

export function clearError () {
    return { type: CLEAR_CAN_ADD_CONTACT_ERROR }
}

export function load (params) {
    return dispatch => {
        dispatch({ type: LOAD_CAN_ADD_CONTACT_REQUEST })
        return service.canAdd(params).then(response => {
            dispatch({ type: LOAD_CAN_ADD_CONTACT_SUCCESS, payload: response.data })
        }).catch(e => {
            dispatch({ type: LOAD_CAN_ADD_CONTACT_FAILURE, payload: e })
        })
    }
}
