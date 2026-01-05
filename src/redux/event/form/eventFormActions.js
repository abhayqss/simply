import { ACTION_TYPES } from 'lib/Constants'

import { defer } from 'lib/utils/Utils'

import service from 'services/EventService'
import eventFormValidator from 'validators/EventFormValidator'

const {
    CLEAR_EVENT_FORM,
    CLEAR_EVENT_FORM_ERROR,
    CLEAR_EVENT_FORM_FIELD_ERROR,

    CHANGE_EVENT_FORM_FIELD,
    CHANGE_EVENT_FORM_FIELDS,

    VALIDATE_EVENT_FORM,

    SAVE_EVENT_REQUEST,
    SAVE_EVENT_SUCCESS,
    SAVE_EVENT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_EVENT_FORM }
}

export function clearError () {
    return { type: CLEAR_EVENT_FORM_ERROR }
}

export function clearFieldError (field) {
    return {
        type: CLEAR_EVENT_FORM_FIELD_ERROR,
        payload: field
    }
}

export function changeField (field, value, type) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_EVENT_FORM_FIELD,
                payload: { field, value, type }
            })
        })
    }
}

export function changeFields (changes) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_EVENT_FORM_FIELDS,
                payload: changes
            })
        })
    }
}

export function validate (data) {
    return dispatch => {
        return eventFormValidator.validate(data).then(success => {
            dispatch({ type: VALIDATE_EVENT_FORM, payload: { success } })
            return success
        }).catch(errors => {
            dispatch({ type: VALIDATE_EVENT_FORM, payload: { success: false, errors } })
        })
    }
}

export function submit (event) {
    return dispatch => {
        dispatch({ type: SAVE_EVENT_REQUEST })
        return service.save(event).then(response => {
            dispatch({ type: SAVE_EVENT_SUCCESS, payload: response })
            return response
        }).catch(e => {
            dispatch({ type: SAVE_EVENT_FAILURE, payload: e })
            throw e
        })
    }
}
