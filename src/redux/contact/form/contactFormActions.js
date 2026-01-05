import { ACTION_TYPES } from 'lib/Constants'

import { defer } from 'lib/utils/Utils'

import service from 'services/ContactService'
import contactFormValidator from 'validators/ContactFormValidator'

const {
    CLEAR_CONTACT_FORM,
    CLEAR_CONTACT_FORM_ERROR,
    CLEAR_CONTACT_FORM_FIELD_ERROR,

    CHANGE_CONTACT_FORM_TAB,

    CHANGE_CONTACT_FORM_FIELD,
    CHANGE_CONTACT_FORM_FIELDS,

    VALIDATE_CONTACT_FORM,
    VALIDATE_CONTACT_DATA_UNIQ_REQUEST,
    VALIDATE_CONTACT_DATA_UNIQ_SUCCESS,
    VALIDATE_CONTACT_DATA_UNIQ_FAILURE,

    SAVE_CONTACT_REQUEST,
    SAVE_CONTACT_SUCCESS,
    SAVE_CONTACT_FAILURE,

    INVITE_CONTACT_REQUEST,
    INVITE_CONTACT_SUCCESS,
    INVITE_CONTACT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CONTACT_FORM }
}

export function setError (e) {
    return { type: CLEAR_CONTACT_FORM }
}

export function clearError () {
    return { type: CLEAR_CONTACT_FORM_ERROR }
}

export function clearFieldError (field) {
    return {
        type: CLEAR_CONTACT_FORM_FIELD_ERROR,
        payload: field
    }
}

export function changeTab (tab) {
    return {
        type: CHANGE_CONTACT_FORM_TAB,
        payload: tab
    }
}

export function changeField (name, value) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_CONTACT_FORM_FIELD,
                payload: { name, value }
            })
        })
    }
}

export function changeFields (changes) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_CONTACT_FORM_FIELDS,
                payload: changes
            })
        })
    }
}

export function validate (data, opts) {
    return dispatch => {
        return contactFormValidator.validate(data, opts).then(() => {
            dispatch({ type: VALIDATE_CONTACT_FORM, payload: { success: true } })
            return true
        }).catch(errors => {
            dispatch({ type: VALIDATE_CONTACT_FORM, payload: { success: false, errors } })
            return false
        })
    }
}

export function validateUniq (data) {
    return dispatch => {
        dispatch({ type: VALIDATE_CONTACT_DATA_UNIQ_REQUEST })
        return service.validateUniq(data).then(({ data } = {}) => {
            dispatch({ type: VALIDATE_CONTACT_DATA_UNIQ_SUCCESS, payload: data })
            return data
        }).catch(e => {
            dispatch({ type: VALIDATE_CONTACT_DATA_UNIQ_FAILURE, payload: e })
        })
    }
}

export function submit (data) {
    return dispatch => {
        dispatch({ type: SAVE_CONTACT_REQUEST })
        return service.save(data).then(response => {
            dispatch({ type: SAVE_CONTACT_SUCCESS, payload: response })
            return response
        }).catch(e => {
            dispatch({ type: SAVE_CONTACT_FAILURE, payload: e })
        })
    }
}

export function invite (contactId) {
    return dispatch => {
        dispatch({ type: INVITE_CONTACT_REQUEST })
        return service.invite(contactId).then(response => {
            dispatch({ type: INVITE_CONTACT_SUCCESS, payload: response })
            return response
        }).catch(e => {
            dispatch({ type: INVITE_CONTACT_FAILURE, payload: e })
        })
    }
}
