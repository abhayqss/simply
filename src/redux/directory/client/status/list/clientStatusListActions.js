import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_CLIENT_STATUS_LIST,
    LOAD_CLIENT_STATUS_LIST_REQUEST,
    LOAD_CLIENT_STATUS_LIST_SUCCESS,
    LOAD_CLIENT_STATUS_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CLIENT_STATUS_LIST }
}

export function load () {
    return dispatch => {
        dispatch({ type: LOAD_CLIENT_STATUS_LIST_REQUEST })
        return service.findClientStatuses().then(response => {
            dispatch({
                type: LOAD_CLIENT_STATUS_LIST_SUCCESS,
                payload: { data: response.data }
            })

            return response
        }).catch(e => {
            dispatch({ type: LOAD_CLIENT_STATUS_LIST_FAILURE, payload: e })
        })
    }
}

