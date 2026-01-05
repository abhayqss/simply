import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_ASSESSMENT_MANAGEMENT,
    CLEAR_ASSESSMENT_MANAGEMENT_ERROR,

    LOAD_ASSESSMENT_MANAGEMENT_REQUEST,
    LOAD_ASSESSMENT_MANAGEMENT_SUCCESS,
    LOAD_ASSESSMENT_MANAGEMENT_FAILURE
} = ACTION_TYPES

export function clear () {
    return {
        type: CLEAR_ASSESSMENT_MANAGEMENT
    }
}

export function clearError () {
    return {
        type: CLEAR_ASSESSMENT_MANAGEMENT_ERROR
    }
}

export function load (params) {
    return dispatch => {
        dispatch({ type: LOAD_ASSESSMENT_MANAGEMENT_REQUEST })
        return service.getAssessmentManagement(params).then(response => {
            const { data } = response
            dispatch({ type: LOAD_ASSESSMENT_MANAGEMENT_SUCCESS, payload: data })
            return data
        }).catch((e) => {
            dispatch({ type: LOAD_ASSESSMENT_MANAGEMENT_FAILURE, payload: e })
        })
    }
}
