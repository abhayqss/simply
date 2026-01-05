import { ACTION_TYPES } from 'lib/Constants'

import { defer } from 'lib/utils/Utils'

import service from 'services/ClientService'
import caseloadFormValidator from 'validators/CaseloadFormValidator'

const {
    CLEAR_CASELOAD_FORM,
    CLEAR_CASELOAD_FORM_ERROR,
    CLEAR_CASELOAD_FORM_FIELD_ERROR,

    ADD_CASELOAD_FORM,
    REMOVE_CASELOAD_FORM,
    CHANGE_CASELOAD_FORM_FIELD,
    CHANGE_CASELOAD_FORM_FIELDS,
    UPDATE_CASELOAD_FORM_CLIENT_LIST,

    CLEAR_CASELOAD_FORM_FILTER,
    CHANGE_CASELOAD_FORM_FILTER,

    VALIDATE_CASELOAD_FORM,

    SAVE_CASELOAD_REQUEST,
    SAVE_CASELOAD_SUCCESS,
    SAVE_CASELOAD_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CASELOAD_FORM }
}

export function clearError () {
    return { type: CLEAR_CASELOAD_FORM_ERROR }
}

export function addCaseload () {
    return {
        type: ADD_CASELOAD_FORM,
    }
}

export function removeCaseload (index) {
    return {
        type: REMOVE_CASELOAD_FORM,
        payload: index
    }
}

export function changeCaseloadField (index, field, value) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_CASELOAD_FORM_FIELD,
                payload: { index, field, value }
            })
        })
    }
}

export function changeCaseloadFields (changes) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_CASELOAD_FORM_FIELDS,
                payload: changes
            })
        })
    }
}

export function updateClientList (index, data) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: UPDATE_CASELOAD_FORM_CLIENT_LIST,
                payload: { index, data }
            })
        })
    }
}

export function clearFieldError (field) {
    return {
        type: CLEAR_CASELOAD_FORM_FIELD_ERROR,
        payload: field
    }
}

export function clearFilter () {
    return { type: CLEAR_CASELOAD_FORM_FILTER }
}

export function changeFilter (index, changes, shouldReload) {
    return {
        type: CHANGE_CASELOAD_FORM_FILTER,
        payload: { index, changes, shouldReload }
    }
}

export function validate (index, data) {
    return dispatch => {
        return caseloadFormValidator.validate(data).then(success => {
            dispatch({ type: VALIDATE_CASELOAD_FORM, payload: { index, success } })
            return success
        }).catch(errors => {
            dispatch({ type: VALIDATE_CASELOAD_FORM, payload: {  index, success: false, errors } })
        })
    }
}

export function submit (contact) {
    return dispatch => {
        dispatch({ type: SAVE_CASELOAD_REQUEST })
        return service.save(contact).then(response => {
            dispatch({ type: SAVE_CASELOAD_SUCCESS, payload: response })
            return response
        }).catch(e => {
            dispatch({ type: SAVE_CASELOAD_FAILURE, payload: e })
            throw e
        })
    }
}
