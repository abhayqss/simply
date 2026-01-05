import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_SYSTEM_ROLE_LIST,
    LOAD_SYSTEM_ROLE_LIST_SUCCESS,
    LOAD_SYSTEM_ROLE_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_SYSTEM_ROLE_LIST }
}

export function load (config) {
    return dispatch => {
        return service.findSystemRoles(config).then(response => {
            const { data } = response

            dispatch({
                type: LOAD_SYSTEM_ROLE_LIST_SUCCESS,
                payload: data
            })

            return response
        }).catch(e => {
            dispatch({ type: LOAD_SYSTEM_ROLE_LIST_FAILURE, payload: e })
        })
    }
}

