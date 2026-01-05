import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_ASSESSMENT_SURVEY,
    CLEAR_ASSESSMENT_SURVEY_ERROR,
    LOAD_ASSESSMENT_SURVEY_REQUEST,
    LOAD_ASSESSMENT_SURVEY_SUCCESS,
    LOAD_ASSESSMENT_SURVEY_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_ASSESSMENT_SURVEY }
}

export function clearError () {
    return { type: CLEAR_ASSESSMENT_SURVEY_ERROR }
}

export function load (params) {
    return dispatch => {
        dispatch({ type: LOAD_ASSESSMENT_SURVEY_REQUEST })
        return service.findAssessmentSurvey(params).then(response => {
            dispatch({ type: LOAD_ASSESSMENT_SURVEY_SUCCESS, payload: response.data })
            return response
        }).catch(e => {
            dispatch({ type: LOAD_ASSESSMENT_SURVEY_FAILURE, payload: e })
        })
    }
}
