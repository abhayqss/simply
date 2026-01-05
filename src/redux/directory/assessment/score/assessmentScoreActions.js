import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_ASSESSMENT_SCORE,
    CLEAR_ASSESSMENT_SCORE_ERROR,

    LOAD_ASSESSMENT_SCORE_REQUEST,
    LOAD_ASSESSMENT_SCORE_SUCCESS,
    LOAD_ASSESSMENT_SCORE_FAILURE
} = ACTION_TYPES

export function clear () {
    return {
        type: CLEAR_ASSESSMENT_SCORE
    }
}

export function clearError () {
    return {
        type: CLEAR_ASSESSMENT_SCORE_ERROR
    }
}

export function load (params) {
    return dispatch => {
        dispatch({ type: LOAD_ASSESSMENT_SCORE_REQUEST })
        return service.getAssessmentScore(params).then(response => {
            const { data } = response
            dispatch({ type: LOAD_ASSESSMENT_SCORE_SUCCESS, payload: data })
            return data
        }).catch((e) => {
            dispatch({ type: LOAD_ASSESSMENT_SCORE_FAILURE, payload: e })
        })
    }
}
