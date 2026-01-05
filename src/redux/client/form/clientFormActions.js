import { ACTION_TYPES } from 'lib/Constants'

import { defer, allAreTrue } from 'lib/utils/Utils'

import service from 'services/ClientService'
import clientFormValidator from 'validators/ClientFormValidator'

const {
    CLEAR_CLIENT_FORM,
    CLEAR_CLIENT_FORM_ERROR,
    CLEAR_CLIENT_FORM_FIELD_ERROR,

    CHANGE_CLIENT_FORM_FIELD,
    CHANGE_CLIENT_FORM_ADDRESS_FIELD,

    CHANGE_CLIENT_FORM_FIELDS,

    VALIDATE_CLIENT_FORM,

    VALIDATE_CLIENT_DATA_UNIQ_IN_COMMUNITY_REQUEST,
    VALIDATE_CLIENT_DATA_UNIQ_IN_COMMUNITY_SUCCESS,
    VALIDATE_CLIENT_DATA_UNIQ_IN_COMMUNITY_FAILURE,

    VALIDATE_CLIENT_DATA_UNIQ_IN_ORGANIZATION_REQUEST,
    VALIDATE_CLIENT_DATA_UNIQ_IN_ORGANIZATION_SUCCESS,
    VALIDATE_CLIENT_DATA_UNIQ_IN_ORGANIZATION_FAILURE,

    SAVE_CLIENT_REQUEST,
    SAVE_CLIENT_SUCCESS,
    SAVE_CLIENT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CLIENT_FORM }
}

export function clearError () {
    return { type: CLEAR_CLIENT_FORM_ERROR }
}

export function clearFieldError (field) {
    return {
        type: CLEAR_CLIENT_FORM_FIELD_ERROR,
        payload: field
    }
}

export function changeField (name, value) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_CLIENT_FORM_FIELD,
                payload: { name, value }
            })
        })
    }
}

export function changeAddressField (name, value) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_CLIENT_FORM_ADDRESS_FIELD,
                payload: { name, value }
            })
        })
    }
}

export function changeFields (changes) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_CLIENT_FORM_FIELDS,
                payload: changes
            })
        })
    }
}

export function validate (data, opts) {
    return dispatch => {
        return clientFormValidator.validate(data, opts).then(() => {
            dispatch({ type: VALIDATE_CLIENT_FORM, payload: { success: true } })
            return true
        }).catch(errors => {
            dispatch({ type: VALIDATE_CLIENT_FORM, payload: { success: false, errors } })
            return false
        })
    }
}

export function validateUniqInOrganization (data) {
    return dispatch => {
        dispatch({ type: VALIDATE_CLIENT_DATA_UNIQ_IN_ORGANIZATION_REQUEST })
        return service.validateUniqInOrganization(data).then(({ data } = {}) => {
            dispatch({ type: VALIDATE_CLIENT_DATA_UNIQ_IN_ORGANIZATION_SUCCESS, payload: data })
            return data.email
        }).catch(e => {
            dispatch({ type: VALIDATE_CLIENT_DATA_UNIQ_IN_ORGANIZATION_FAILURE, payload: e })
        })
    }
}

export function validateUniqInCommunity (data) {
    return dispatch => {
        dispatch({ type: VALIDATE_CLIENT_DATA_UNIQ_IN_COMMUNITY_REQUEST })
        return service.validateUniqInCommunity(data).then(({ data } = {}) => {
            dispatch({ type: VALIDATE_CLIENT_DATA_UNIQ_IN_COMMUNITY_SUCCESS, payload: data })

            return allAreTrue(
                data.ssn !== null ? data.ssn : true,
                data.memberNumber !== null ? data.memberNumber : true,
                data.medicareNumber !== null ? data.medicareNumber : true,
                data.medicaidNumber !== null ? data.medicaidNumber : true
            )
        }).catch(e => {
            dispatch({ type: VALIDATE_CLIENT_DATA_UNIQ_IN_COMMUNITY_FAILURE, payload: e })
        })
    }
}

export function submit (data) {
    return dispatch => {
        dispatch({ type: SAVE_CLIENT_REQUEST })
        return service.save(data).then(response => {
            dispatch({ type: SAVE_CLIENT_SUCCESS, payload: response })
            return response
        }).catch(e => {
            dispatch({ type: SAVE_CLIENT_FAILURE, payload: e })
        })
    }
}
