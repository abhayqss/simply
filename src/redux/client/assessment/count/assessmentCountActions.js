import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/AssessmentService'

const {
    CLEAR_ASSESSMENT_COUNT,
    CLEAR_ASSESSMENT_COUNT_ERROR,
    LOAD_ASSESSMENT_COUNT_REQUEST,
    LOAD_ASSESSMENT_COUNT_SUCCESS,
    LOAD_ASSESSMENT_COUNT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_ASSESSMENT_COUNT }
}

export function clearError () {
    return { type: CLEAR_ASSESSMENT_COUNT_ERROR }
}

export function load (clientId) {
    return dispatch => {
        dispatch({ type: LOAD_ASSESSMENT_COUNT_REQUEST })
        return service.count(clientId).then(response => {
            dispatch({ type: LOAD_ASSESSMENT_COUNT_SUCCESS, payload: response.data })
            return response
        }).catch(e => {
            dispatch({ type: LOAD_ASSESSMENT_COUNT_FAILURE, payload: e })
        })
    }
}
