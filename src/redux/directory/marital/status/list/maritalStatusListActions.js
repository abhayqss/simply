import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_MARITAL_STATUS_LIST,
    LOAD_MARITAL_STATUS_LIST_SUCCESS,
    LOAD_MARITAL_STATUS_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_MARITAL_STATUS_LIST }
}

export function load () {
    return dispatch => {
        return service.findMaritalStatus().then(response => {
            const { data } = response

            dispatch({
                type: LOAD_MARITAL_STATUS_LIST_SUCCESS,
                payload: { data }
            })
        }).catch(e => {
            dispatch({ type: LOAD_MARITAL_STATUS_LIST_FAILURE, payload: e })
        })
    }
}