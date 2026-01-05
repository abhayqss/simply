import {ACTION_TYPES} from 'lib/Constants'

import service from 'services/AlertService'

const {
    CLEAR_SYSTEM_ALERT_COUNT,
    CLEAR_SYSTEM_ALERT_COUNT_ERROR,
    LOAD_SYSTEM_ALERT_COUNT_REQUEST,
    LOAD_SYSTEM_ALERT_COUNT_SUCCESS,
    LOAD_SYSTEM_ALERT_COUNT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_SYSTEM_ALERT_COUNT }
}

export function clearError () {
    return { type: CLEAR_SYSTEM_ALERT_COUNT_ERROR }
}

export function load (type) {
    return dispatch => {
        dispatch({ type: LOAD_SYSTEM_ALERT_COUNT_REQUEST })
        return service.count(type).then(response => {
            dispatch({ type: LOAD_SYSTEM_ALERT_COUNT_SUCCESS, payload: response.data })
        }).catch(e => {
            dispatch({ type: LOAD_SYSTEM_ALERT_COUNT_FAILURE, payload: e })
        })
    }
}
