import { ACTION_TYPES } from 'lib/Constants'

import { defer } from 'lib/utils/Utils'

import service from 'services/MarketplaceCommunityService'
import validator from 'validators/AppointmentFormValidator'

const {
    CLEAR_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM,
    CLEAR_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM_ERROR,
    CLEAR_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM_FIELD_ERROR,

    CHANGE_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM_FIELD,
    CHANGE_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM_FIELDS,

    VALIDATE_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM,

    SAVE_MARKETPLACE_COMMUNITY_APPOINTMENT_REQUEST,
    SAVE_MARKETPLACE_COMMUNITY_APPOINTMENT_SUCCESS,
    SAVE_MARKETPLACE_COMMUNITY_APPOINTMENT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM }
}

export function clearError () {
    return { type: CLEAR_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM_ERROR }
}

export function clearFieldError (field) {
    return {
        type: CLEAR_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM_FIELD_ERROR,
        payload: field
    }
}

export function changeField (field, value) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM_FIELD,
                payload: { field, value }
            })
        })
    }
}

export function changeFields (changes) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM_FIELDS,
                payload: changes
            })
        })
    }
}

export function validate (data) {
    return dispatch => {
        return validator.validate(data).then(success => {
            dispatch({ type: VALIDATE_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM, payload: { success } })
            return success
        }).catch(errors => {
            dispatch({ type: VALIDATE_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM, payload: { success: false, errors } })
        })
    }
}

export function appointment (communityId, data) {
    return dispatch => {
        dispatch({ type: SAVE_MARKETPLACE_COMMUNITY_APPOINTMENT_REQUEST })
        return service.appointment(communityId, data).then(response => {
            dispatch({ type: SAVE_MARKETPLACE_COMMUNITY_APPOINTMENT_SUCCESS, payload: response })
            return response
        }).catch(e => {
            dispatch({ type: SAVE_MARKETPLACE_COMMUNITY_APPOINTMENT_FAILURE, payload: e })
        })
    }
}
