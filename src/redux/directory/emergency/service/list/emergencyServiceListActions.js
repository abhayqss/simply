import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_EMERGENCY_SERVICE_LIST,
    LOAD_EMERGENCY_SERVICE_LIST_SUCCESS,
    LOAD_EMERGENCY_SERVICE_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_EMERGENCY_SERVICE_LIST }
}

export function load () {
    return dispatch => {
        return service.findEmergencyServices().then(response => {
            const { data } = response

            dispatch({
                type: LOAD_EMERGENCY_SERVICE_LIST_SUCCESS,
                payload: { data }
            })
        }).catch(e => {
            dispatch({
                type: LOAD_EMERGENCY_SERVICE_LIST_FAILURE,
                payload: e
            })
        })
    }
}

