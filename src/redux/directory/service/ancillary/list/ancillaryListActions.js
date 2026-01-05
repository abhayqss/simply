import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_ADDITIONAL_SERVICE_LIST,
    LOAD_ADDITIONAL_SERVICE_LIST_SUCCESS,
    LOAD_ADDITIONAL_SERVICE_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_ADDITIONAL_SERVICE_LIST }
}

export function load (config) {
    return dispatch => {
        return service.findAdditionalServices(config).then(response => {
            const { data } = response

            dispatch({
                type: LOAD_ADDITIONAL_SERVICE_LIST_SUCCESS,
                payload: { data }
            })
        }).catch(e => {
            dispatch({ type: LOAD_ADDITIONAL_SERVICE_LIST_FAILURE, payload: e })
        })
    }
}

