import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_AGE_GROUP_LIST,
    LOAD_AGE_GROUP_LIST_SUCCESS,
    LOAD_AGE_GROUP_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_AGE_GROUP_LIST }
}

export function load (config) {
    return dispatch => {
        return service.findAgeGroups(config).then(response => {
            const { data } = response

            dispatch({
                type: LOAD_AGE_GROUP_LIST_SUCCESS,
                payload: { data }
            })
        }).catch(e => {
            dispatch({ type: LOAD_AGE_GROUP_LIST_FAILURE, payload: e })
        })
    }
}

