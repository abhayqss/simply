import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/AssessmentService'

const {
    CLEAR_ASSESSMENT_HISTORY_ERROR,

    CLEAR_ASSESSMENT_HISTORY,

    LOAD_ASSESSMENT_HISTORY_REQUEST,
    LOAD_ASSESSMENT_HISTORY_SUCCESS,
    LOAD_ASSESSMENT_HISTORY_FAILURE,
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_ASSESSMENT_HISTORY }
}

export function clearError () {
    return { type: CLEAR_ASSESSMENT_HISTORY_ERROR }
}

export function load (params) {

    return dispatch => {
        dispatch({ type: LOAD_ASSESSMENT_HISTORY_REQUEST, payload: params.page })
        return service.findHistory(params).then(response => {
            const { page, size } = params
            const { data, totalCount } = response
            dispatch({
                type: LOAD_ASSESSMENT_HISTORY_SUCCESS,
                payload: { data, page, size, totalCount }
            })
        }).catch(e => {
            dispatch({ type: LOAD_ASSESSMENT_HISTORY_FAILURE, payload: e })
        })
    }
}

