import { ACTION_TYPES } from 'lib/Constants'
import authService from "services/AuthService"

import validator from 'validators/InvitationFormValidator'

const {
    CLEAR_CREATE_PASSWORD_FORM,
    CLEAR_CREATE_PASSWORD_FORM_ERROR,
    CLEAR_CREATE_PASSWORD_FORM_FIELD_ERROR,
    CHANGE_CREATE_PASSWORD_FORM_FIELD,
    CHANGE_CREATE_PASSWORD_FORM_FIELDS,
    VALIDATE_CREATE_PASSWORD_FORM,
    CREATE_PASSWORD_REQUEST,
    CREATE_PASSWORD_SUCCESS,
    CREATE_PASSWORD_FAILURE,
    DECLINE_INVITATION_REQUEST,
    DECLINE_INVITATION_SUCCESS,
    DECLINE_INVITATION_FAILURE,
} = ACTION_TYPES

export function clear() {
    return { type: CLEAR_CREATE_PASSWORD_FORM }
}

export function clearError() {
    return { type: CLEAR_CREATE_PASSWORD_FORM_ERROR }
}

export function clearFieldError(field) {
    return {
        type: CLEAR_CREATE_PASSWORD_FORM_FIELD_ERROR,
        payload: field
    }
}

export function validate (data, options) {
    return dispatch => {
        return validator.validate(data, options).then(success => {
            dispatch({ type: VALIDATE_CREATE_PASSWORD_FORM, payload: { success } })
            return true
        }).catch(errors => {
            dispatch({ type: VALIDATE_CREATE_PASSWORD_FORM, payload: { success: false, errors } })
            return false
        })
    }
}

export function changeField (field, value) {
    return {
        type: CHANGE_CREATE_PASSWORD_FORM_FIELD,
        payload: { field, value }
    }
}

export function changeFields (changes) {
    return {
        type: CHANGE_CREATE_PASSWORD_FORM_FIELDS,
        payload: changes
    }
}

export function submit (requestBody) {
    return dispatch => {
        dispatch({ type: CREATE_PASSWORD_REQUEST })
        return authService.createPassword(requestBody).then(response => {
            dispatch({ type: CREATE_PASSWORD_SUCCESS, payload: response })
            return response
        }).catch(e => {
            dispatch({ type: CREATE_PASSWORD_FAILURE, payload: e })
            throw e
        })
    }
}

export function decline (token) {
    return dispatch => {
        dispatch({ type: DECLINE_INVITATION_REQUEST })
        return authService.declineInvitation(token).then(response => {
            dispatch({ type: DECLINE_INVITATION_SUCCESS, payload: response })
            return response
        }).catch(e => {
            dispatch({ type: DECLINE_INVITATION_FAILURE, payload: e })
            throw e
        })
    }
}