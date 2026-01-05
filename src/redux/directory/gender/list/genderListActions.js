import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_GENDER_LIST,
    LOAD_GENDER_LIST_SUCCESS,
    LOAD_GENDER_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_GENDER_LIST }
}

export function load () {
    return dispatch => {
        return service.findGenders().then(response => {
            const { data } = response

            dispatch({
                type: LOAD_GENDER_LIST_SUCCESS,
                payload: { data }
            })
        }).catch(e => {
            dispatch({ type: LOAD_GENDER_LIST_FAILURE, payload: e })
        })
    }
}

