import { ACTION_TYPES } from 'lib/Constants'
import authService from "services/AuthService"

import resetPasswordFormValidator from 'validators/ResetPasswordFormValidator'

const {
    CLEAR_RESET_PASSWORD_FORM,
    CLEAR_RESET_PASSWORD_FORM_ERROR,
    CLEAR_RESET_PASSWORD_FORM_FIELD_ERROR,
    CHANGE_RESET_PASSWORD_FORM_FIELD,
    CHANGE_RESET_PASSWORD_FORM_FIELDS,
    VALIDATE_RESET_PASSWORD_FORM,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
} = ACTION_TYPES

export function clear() {
    return { type: CLEAR_RESET_PASSWORD_FORM }
}

export function clearError() {
    return { type: CLEAR_RESET_PASSWORD_FORM_ERROR }
}

export function clearFieldError(field) {
    return {
        type: CLEAR_RESET_PASSWORD_FORM_FIELD_ERROR,
        payload: field
    }
}

export function validate (data, options) {
    return dispatch => {
        return resetPasswordFormValidator.validate(data, options).then(success => {
            dispatch({ type: VALIDATE_RESET_PASSWORD_FORM, payload: { success } })
            return true
        }).catch(errors => {
            dispatch({ type: VALIDATE_RESET_PASSWORD_FORM, payload: { success: false, errors } })
            return false
        })
    }
}

export function changeField (field, value) {
    return {
        type: CHANGE_RESET_PASSWORD_FORM_FIELD,
        payload: { field, value }
    }
}

export function changeFields (changes) {
    return {
        type: CHANGE_RESET_PASSWORD_FORM_FIELDS,
        payload: changes
    }
}

export function submit (requestBody) {
    return dispatch => {
        dispatch({ type: RESET_PASSWORD_REQUEST })
        return authService.requestPasswordReset(requestBody).then(response => {
            dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response })
            return response
        }).catch(e => {
            dispatch({ type: RESET_PASSWORD_FAILURE, payload: e })
        })
    }
}