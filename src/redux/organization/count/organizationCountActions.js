import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/OrganizationService'

const {
    CLEAR_ORGANIZATION_COUNT,
    CLEAR_ORGANIZATION_COUNT_ERROR,
    LOAD_ORGANIZATION_COUNT_REQUEST,
    LOAD_ORGANIZATION_COUNT_SUCCESS,
    LOAD_ORGANIZATION_COUNT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_ORGANIZATION_COUNT }
}

export function clearError () {
    return { type: CLEAR_ORGANIZATION_COUNT_ERROR }
}

export function load () {
    return dispatch => {
        dispatch({ type: LOAD_ORGANIZATION_COUNT_REQUEST })
        return service.count().then(response => {
            dispatch({ type: LOAD_ORGANIZATION_COUNT_SUCCESS, payload: response.data })
        }).catch(e => {
            dispatch({ type: LOAD_ORGANIZATION_COUNT_FAILURE, payload: e })
        })
    }
}
