import { ACTION_TYPES } from 'lib/Constants'
import authService from "services/AuthService"

import validator from 'validators/OldPasswordFormValidator'

const {
    CLEAR_OLD_PASSWORD_FORM,
    CLEAR_OLD_PASSWORD_FORM_ERROR,
    CLEAR_OLD_PASSWORD_FORM_FIELD_ERROR,
    CHANGE_OLD_PASSWORD_FORM_FIELD,
    CHANGE_OLD_PASSWORD_FORM_FIELDS,
    VALIDATE_OLD_PASSWORD_FORM,
    OLD_PASSWORD_REQUEST,
    OLD_PASSWORD_SUCCESS,
    OLD_PASSWORD_FAILURE,
} = ACTION_TYPES

export function clear() {
    return { type: CLEAR_OLD_PASSWORD_FORM }
}

export function clearError() {
    return { type: CLEAR_OLD_PASSWORD_FORM_ERROR }
}

export function clearFieldError(field) {
    return {
        type: CLEAR_OLD_PASSWORD_FORM_FIELD_ERROR,
        payload: field
    }
}

export function changeField (field, value) {
    return {
        type: CHANGE_OLD_PASSWORD_FORM_FIELD,
        payload: { field, value }
    }
}

export function changeFields (changes) {
    return {
        type: CHANGE_OLD_PASSWORD_FORM_FIELDS,
        payload: changes
    }
}

export function validate (data, options) {
    return dispatch => {
        return validator.validate(data, options).then(success => {
            dispatch({ type: VALIDATE_OLD_PASSWORD_FORM, payload: { success } })
            return true
        }).catch(errors => {
            dispatch({ type: VALIDATE_OLD_PASSWORD_FORM, payload: { success: false, errors } })
            return false
        })
    }
}

export function submit (data) {
    return dispatch => {
        dispatch({ type: OLD_PASSWORD_REQUEST })

        return authService
            .changePassword(data)
            .then(response => {
                dispatch({ type: OLD_PASSWORD_SUCCESS, payload: response })
                return response
            })
            .catch(e => {
                dispatch({ type: OLD_PASSWORD_FAILURE, payload: e })
            })
    }
}