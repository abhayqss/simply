import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_PRIMARY_FOCUS_LIST,
    LOAD_PRIMARY_FOCUS_LIST_REQUEST,
    LOAD_PRIMARY_FOCUS_LIST_SUCCESS,
    LOAD_PRIMARY_FOCUS_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_PRIMARY_FOCUS_LIST }
}

export function load (config) {
    return dispatch => {
        dispatch({ type: LOAD_PRIMARY_FOCUS_LIST_REQUEST })
        return service.findPrimaryFocuses(config).then(response => {
            const { data } = response
            dispatch({
                type: LOAD_PRIMARY_FOCUS_LIST_SUCCESS,
                payload: { data }
            })
        }).catch(e => {
            dispatch({ type: LOAD_PRIMARY_FOCUS_LIST_FAILURE, payload: e })
        })
    }
}

