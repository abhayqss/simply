import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_EVENT_TYPE_LIST,
    LOAD_EVENT_TYPE_LIST_SUCCESS,
    LOAD_EVENT_TYPE_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_EVENT_TYPE_LIST }
}

export function load (ids) {
    return dispatch => {
        return service.findEventTypes(ids).then(response => {
            const { data } = response

            dispatch({
                type: LOAD_EVENT_TYPE_LIST_SUCCESS,
                payload: { data }
            })
        }).catch(e => {
            dispatch({ type: LOAD_EVENT_TYPE_LIST_FAILURE, payload: e })
        })
    }
}