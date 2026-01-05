import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/OrganizationService'

const {
    CLEAR_CAN_ADD_ORGANIZATION,
    CLEAR_CAN_ADD_ORGANIZATION_ERROR,
    LOAD_CAN_ADD_ORGANIZATION_REQUEST,
    LOAD_CAN_ADD_ORGANIZATION_SUCCESS,
    LOAD_CAN_ADD_ORGANIZATION_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CAN_ADD_ORGANIZATION }
}

export function clearError () {
    return { type: CLEAR_CAN_ADD_ORGANIZATION_ERROR }
}

export function load () {
    return dispatch => {
        dispatch({ type: LOAD_CAN_ADD_ORGANIZATION_REQUEST })
        return service.canAdd().then(response => {
            dispatch({ type: LOAD_CAN_ADD_ORGANIZATION_SUCCESS, payload: response.data })
        }).catch(e => {
            dispatch({ type: LOAD_CAN_ADD_ORGANIZATION_FAILURE, payload: e })
        })
    }
}
