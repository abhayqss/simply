import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_STATE_LIST,
    LOAD_STATE_LIST_SUCCESS,
    LOAD_STATE_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_STATE_LIST }
}

export function load () {
    return dispatch => {
        return service.findStates().then(response => {
            const { data } = response

            dispatch({
                type: LOAD_STATE_LIST_SUCCESS,
                payload: { data }
            })
        }).catch(e => {
            dispatch({ type: LOAD_STATE_LIST_FAILURE, payload: e })
        })
    }
}

