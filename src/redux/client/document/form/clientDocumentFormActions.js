import { defer } from 'lib/utils/Utils'
import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ClientDocumentService'
import clientDocumentFormValidator from 'validators/ClientDocumentFormValidator'

const {
    CLEAR_CLIENT_DOCUMENT_FORM,
    CLEAR_CLIENT_DOCUMENT_FORM_ERROR,
    CLEAR_CLIENT_DOCUMENT_FORM_FIELD_ERROR,

    CHANGE_CLIENT_DOCUMENT_FORM_FIELD,

    VALIDATE_CLIENT_DOCUMENT_FORM,

    SAVE_CLIENT_DOCUMENT_REQUEST,
    SAVE_CLIENT_DOCUMENT_SUCCESS,
    SAVE_CLIENT_DOCUMENT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CLIENT_DOCUMENT_FORM }
}

export function clearError () {
    return { type: CLEAR_CLIENT_DOCUMENT_FORM_ERROR }
}

export function clearFieldError (field) {
    return {
        type: CLEAR_CLIENT_DOCUMENT_FORM_FIELD_ERROR,
        payload: field
    }
}

export function changeField (field, value) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_CLIENT_DOCUMENT_FORM_FIELD,
                payload: { field, value }
            })
        })
    }
}

export function validate (data) {
    return dispatch => {
        return clientDocumentFormValidator.validate(data).then(success => {
            dispatch({ type: VALIDATE_CLIENT_DOCUMENT_FORM, payload: { success } })
            return success
        }).catch(errors => {
            dispatch({ type: VALIDATE_CLIENT_DOCUMENT_FORM, payload: { success: false, errors } })
        })
    }
}

export function submit (document, clientId, userId) {
    return dispatch => {
        dispatch({ type: SAVE_CLIENT_DOCUMENT_REQUEST })
        return service.save(document, clientId, userId).then(response => {
            dispatch({ type: SAVE_CLIENT_DOCUMENT_SUCCESS, payload: response })
            return response
        }).catch(e => {
            dispatch({ type: SAVE_CLIENT_DOCUMENT_FAILURE, payload: e })
            throw e
        })
    }
}
