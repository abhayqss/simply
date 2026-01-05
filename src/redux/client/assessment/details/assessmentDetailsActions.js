import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/AssessmentService'

const {
    CLEAR_ASSESSMENT_DETAILS,
    CLEAR_ASSESSMENT_DETAILS_ERROR,

    LOAD_ASSESSMENT_DETAILS_REQUEST,
    LOAD_ASSESSMENT_DETAILS_SUCCESS,
    LOAD_ASSESSMENT_DETAILS_FAILURE
} = ACTION_TYPES

export function clear (shouldReload) {
    return {
        type: CLEAR_ASSESSMENT_DETAILS,
        payload: shouldReload
    }
}

export function clearError () {
    return {
        type: CLEAR_ASSESSMENT_DETAILS_ERROR
    }
}

export function load (clientId, assessmentId) {
    return dispatch => {
        dispatch({ type: LOAD_ASSESSMENT_DETAILS_REQUEST, payload: assessmentId })
        return service.findById(clientId, assessmentId).then(response => {
            dispatch({ type: LOAD_ASSESSMENT_DETAILS_SUCCESS, payload: response.data })
            return response
        }).catch((e) => {
            dispatch({ type: LOAD_ASSESSMENT_DETAILS_FAILURE, payload: e })
        })
    }
}
