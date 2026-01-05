import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_TREATMENT_SERVICE_LIST,
    LOAD_TREATMENT_SERVICE_LIST_REQUEST,
    LOAD_TREATMENT_SERVICE_LIST_SUCCESS,
    LOAD_TREATMENT_SERVICE_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_TREATMENT_SERVICE_LIST }
}

export function load (primaryFocusIds) {
    return dispatch => {
        dispatch({ type: LOAD_TREATMENT_SERVICE_LIST_REQUEST })
        return service.findTreatmentServices(primaryFocusIds).then(response => {
            const { data } = response

            dispatch({
                type: LOAD_TREATMENT_SERVICE_LIST_SUCCESS,
                payload: { data }
            })
        }).catch(e => {
            dispatch({
                type: LOAD_TREATMENT_SERVICE_LIST_FAILURE,
                payload: e
            })
        })
    }
}

