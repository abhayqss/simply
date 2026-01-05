import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_ORGANIZATION_TYPE_LIST,
    LOAD_ORGANIZATION_TYPE_LIST_SUCCESS,
    LOAD_ORGANIZATION_TYPE_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_ORGANIZATION_TYPE_LIST }
}

export function load (config) {
    return dispatch => {
        return service.findOrganizationTypes(config).then(response => {
            const { data } = response

            dispatch({
                type: LOAD_ORGANIZATION_TYPE_LIST_SUCCESS,
                payload: { data }
            })
        }).catch(e => {
            dispatch({ type: LOAD_ORGANIZATION_TYPE_LIST_FAILURE, payload: e })
        })
    }
}

