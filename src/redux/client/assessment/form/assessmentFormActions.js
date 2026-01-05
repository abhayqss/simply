import { ACTION_TYPES } from 'lib/Constants'

import { defer } from 'lib/utils/Utils'

import service from 'services/AssessmentService'

const {
    CLEAR_ASSESSMENT_FORM,
    CLEAR_ASSESSMENT_FORM_ERROR,
    CLEAR_ASSESSMENT_FORM_FIELD_ERROR,

    CHANGE_ASSESSMENT_FORM_TAB,

    CHANGE_ASSESSMENT_FORM_FIELD,
    CHANGE_ASSESSMENT_FORM_FIELDS,

    SAVE_ASSESSMENT_REQUEST,
    SAVE_ASSESSMENT_SUCCESS,
    SAVE_ASSESSMENT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_ASSESSMENT_FORM }
}

export function clearError () {
    return { type: CLEAR_ASSESSMENT_FORM_ERROR }
}

export function clearFieldError (field) {
    return {
        type: CLEAR_ASSESSMENT_FORM_FIELD_ERROR,
        payload: field
    }
}

export function changeTab (tab) {
    return {
        type: CHANGE_ASSESSMENT_FORM_TAB,
        payload: tab
    }
}

export function changeField (field, value) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_ASSESSMENT_FORM_FIELD,
                payload: { field, value }
            })
        })
    }
}

export function changeFields (changes) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_ASSESSMENT_FORM_FIELDS,
                payload: changes
            })
        })
    }
}

export function submit (clientId, data) {
    return dispatch => {
        dispatch({ type: SAVE_ASSESSMENT_REQUEST })
        return service.save(clientId, data).then(response => {
            dispatch({ type: SAVE_ASSESSMENT_SUCCESS, payload: response })
            return response
        }).catch(e => {
            dispatch({ type: SAVE_ASSESSMENT_FAILURE, payload: e })
        })
    }
}
