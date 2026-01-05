import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_CONTACT_STATUS_LIST,
    LOAD_CONTACT_STATUS_LIST_REQUEST,
    LOAD_CONTACT_STATUS_LIST_SUCCESS,
    LOAD_CONTACT_STATUS_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CONTACT_STATUS_LIST }
}

export function load () {
    return dispatch => {
        dispatch({ type: LOAD_CONTACT_STATUS_LIST_REQUEST })

        return service.findContactStatuses().then(response => {
            const { data } = response

            dispatch({
                type: LOAD_CONTACT_STATUS_LIST_SUCCESS,
                payload: data
            })

            return response
        }).catch(e => {
            dispatch({ type: LOAD_CONTACT_STATUS_LIST_FAILURE, payload: e })
        })
    }
}

