import { ACTION_TYPES } from 'lib/Constants'

import validator from 'validators/LoginFormValidator'

const {
    CLEAR_LOGIN_FORM,
    CLEAR_LOGIN_FORM_ERROR,
    CLEAR_LOGIN_FORM_FIELD_ERROR,
    CHANGE_LOGIN_FORM_FIELD,
    CHANGE_LOGIN_FORM_FIELDS,
    VALIDATE_LOGIN_FORM
} = ACTION_TYPES

export function clear() {
    return { type: CLEAR_LOGIN_FORM }
}

export function clearError() {
    return { type: CLEAR_LOGIN_FORM_ERROR }
}

export function clearFieldError(field) {
    return {
        type: CLEAR_LOGIN_FORM_FIELD_ERROR,
        payload: field
    }
}

export function validate (data, options) {
    return dispatch => {
        return validator.validate(data, options).then(success => {
            dispatch({ type: VALIDATE_LOGIN_FORM, payload: { success } })
            return true
        }).catch(errors => {
            dispatch({ type: VALIDATE_LOGIN_FORM, payload: { success: false, errors } })
            return false
        })
    }
}

export function changeField (field, value) {
    return {
        type: CHANGE_LOGIN_FORM_FIELD,
        payload: { field, value }
    }
}

export function changeFields (changes) {
    return {
        type: CHANGE_LOGIN_FORM_FIELDS,
        payload: changes
    }
}