import { ACTION_TYPES } from 'lib/Constants'

import { defer } from 'lib/utils/Utils'

import service from 'services/NoteService'
import noteFormValidator from 'validators/NoteFormValidator'

const {
    CLEAR_NOTE_FORM,
    CLEAR_NOTE_FORM_ERROR,
    CLEAR_NOTE_FORM_FIELD_ERROR,

    CHANGE_NOTE_FORM_FIELD,
    CHANGE_NOTE_FORM_FIELDS,

    VALIDATE_NOTE_FORM,

    SAVE_NOTE_REQUEST,
    SAVE_NOTE_SUCCESS,
    SAVE_NOTE_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_NOTE_FORM }
}

export function clearError () {
    return { type: CLEAR_NOTE_FORM_ERROR }
}

export function clearFieldError (field) {
    return {
        type: CLEAR_NOTE_FORM_FIELD_ERROR,
        payload: field
    }
}

export function changeField (field, value) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_NOTE_FORM_FIELD,
                payload: { field, value }
            })
        })
    }
}

export function changeFields (changes) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_NOTE_FORM_FIELDS,
                payload: changes
            })
        })
    }
}

export function validate (data, options) {
    return dispatch => {
        return noteFormValidator.validate(data, options).then(success => {
            dispatch({ type: VALIDATE_NOTE_FORM, payload: { success } })
            return success
        }).catch(errors => {
            dispatch({ type: VALIDATE_NOTE_FORM, payload: { success: false, errors } })
        })
    }
}

export function submit (note, clientId) {
    return dispatch => {
        dispatch({ type: SAVE_NOTE_REQUEST })
        return service.save(note, clientId).then(response => {
            dispatch({ type: SAVE_NOTE_SUCCESS, payload: response })
            return response
        }).catch(e => {
            dispatch({ type: SAVE_NOTE_FAILURE, payload: e })
            throw e
        })
    }
}
