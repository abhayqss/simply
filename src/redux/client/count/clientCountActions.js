import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ClientService'

const {
    CLEAR_CLIENT_COUNT,
    CLEAR_CLIENT_COUNT_ERROR,
    LOAD_CLIENT_COUNT_REQUEST,
    LOAD_CLIENT_COUNT_SUCCESS,
    LOAD_CLIENT_COUNT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CLIENT_COUNT }
}

export function clearError () {
    return { type: CLEAR_CLIENT_COUNT_ERROR }
}

export function load () {
    return dispatch => {
        dispatch({ type: LOAD_CLIENT_COUNT_REQUEST })
        return service.count().then(response => {
            dispatch({ type: LOAD_CLIENT_COUNT_SUCCESS, payload: response.data })
        }).catch(e => {
            dispatch({ type: LOAD_CLIENT_COUNT_FAILURE, payload: e })
        })
    }
}
