import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_DIRECTORY_ORGANIZATION_LIST,
    LOAD_DIRECTORY_ORGANIZATION_LIST_SUCCESS,
    LOAD_DIRECTORY_ORGANIZATION_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_DIRECTORY_ORGANIZATION_LIST }
}

export function load () {
    return dispatch => {
        return service.findOrganizations().then(response => {
            const { data } = response

            dispatch({
                type: LOAD_DIRECTORY_ORGANIZATION_LIST_SUCCESS,
                payload: { data }
            })

            return response
        }).catch(e => {
            dispatch({ type: LOAD_DIRECTORY_ORGANIZATION_LIST_FAILURE, payload: e })
        })
    }
}

