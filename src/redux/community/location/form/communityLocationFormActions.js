import { ACTION_TYPES } from 'lib/Constants'

import { defer } from 'lib/utils/Utils'

import service from 'services/CommunityLocationService'
import validator from 'validators/CommunityLocationFormValidator'

const {
    CLEAR_COMMUNITY_LOCATION_FORM,
    CLEAR_COMMUNITY_LOCATION_FORM_ERROR,
    CLEAR_COMMUNITY_LOCATION_FORM_FIELD_ERROR,

    CHANGE_COMMUNITY_LOCATION_FORM_TAB,

    CHANGE_COMMUNITY_LOCATION_FORM_FIELD,
    CHANGE_COMMUNITY_LOCATION_FORM_FIELDS,

    VALIDATE_COMMUNITY_LOCATION_FORM,
    SAVE_COMMUNITY_LOCATION_REQUEST,
    SAVE_COMMUNITY_LOCATION_SUCCESS,
    SAVE_COMMUNITY_LOCATION_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_COMMUNITY_LOCATION_FORM }
}

export function clearError () {
    return { type: CLEAR_COMMUNITY_LOCATION_FORM_ERROR }
}

export function clearFieldError (field) {
    return {
        type: CLEAR_COMMUNITY_LOCATION_FORM_FIELD_ERROR,
        payload: field
    }
}

export function changeTab (tab) {
    return {
        type: CHANGE_COMMUNITY_LOCATION_FORM_TAB,
        payload: tab
    }
}

export function changeField (field, value) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_COMMUNITY_LOCATION_FORM_FIELD,
                payload: { field, value }
            })
        })
    }
}

export function changeFields (changes) {
    return {
        type: CHANGE_COMMUNITY_LOCATION_FORM_FIELDS,
        payload: changes
    }
}


export function validate (data) {
    return dispatch => {
        return validator.validate(data).then(success => {
            dispatch({
                type: VALIDATE_COMMUNITY_LOCATION_FORM,
                payload: { success }
            })
            return success
        }).catch(errors => {
            dispatch({
                type: VALIDATE_COMMUNITY_LOCATION_FORM,
                payload: { success: false, errors }
            })
        })
    }
}


export function submit (orgId, commId, handset) {
    return dispatch => {
        dispatch({ type: SAVE_COMMUNITY_LOCATION_REQUEST })
        return service.save(orgId, commId, handset).then(response => {
            dispatch({ type: SAVE_COMMUNITY_LOCATION_SUCCESS, payload: response })
            return response
        }).catch(e => {
            dispatch({ type: SAVE_COMMUNITY_LOCATION_FAILURE, payload: e })
            throw e
        })
    }
}
