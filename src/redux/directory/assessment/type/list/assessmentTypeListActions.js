import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_ASSESSMENT_TYPE_LIST,
    CLEAR_ASSESSMENT_TYPE_LIST_ERROR,
    LOAD_ASSESSMENT_TYPE_LIST_REQUEST,
    LOAD_ASSESSMENT_TYPE_LIST_SUCCESS,
    LOAD_ASSESSMENT_TYPE_LIST_FAILURE,
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_ASSESSMENT_TYPE_LIST }
}

export function clearError () {
    return { type: CLEAR_ASSESSMENT_TYPE_LIST_ERROR }
}

export function load (params) {
    return dispatch => {
        dispatch({ type: LOAD_ASSESSMENT_TYPE_LIST_REQUEST })

        return service.findAssessmentTypes(params).then(response => {
            dispatch({
                type: LOAD_ASSESSMENT_TYPE_LIST_SUCCESS,
                payload: response.data
            })

            return response
        }).catch(e => {
            dispatch({ type: LOAD_ASSESSMENT_TYPE_LIST_FAILURE, payload: e })
        })
    }
}

