import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_DOMAIN_LIST,
    LOAD_DOMAIN_LIST_SUCCESS,
    LOAD_DOMAIN_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_DOMAIN_LIST }
}

export function load (config) {
    return dispatch => {
        return service.findDomains(config).then(response => {
            const { data } = response

            dispatch({
                type: LOAD_DOMAIN_LIST_SUCCESS,
                payload: { data }
            })
        }).catch(e => {
            dispatch({ type: LOAD_DOMAIN_LIST_FAILURE, payload: e })
        })
    }
}

