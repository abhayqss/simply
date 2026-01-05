import { ACTION_TYPES } from 'lib/Constants'

import { defer } from 'lib/utils/Utils'

import service from 'services/CareTeamMemberService'
import careTeamFormValidator from 'validators/CareTeamFormValidator'

const {
    CLEAR_CARE_TEAM_MEMBER_FORM,
    CLEAR_CARE_TEAM_MEMBER_FORM_ERROR,
    CLEAR_CARE_TEAM_MEMBER_FORM_FIELD_ERROR,

    CHANGE_CARE_TEAM_MEMBER_FORM_FIELD,

    CHANGE_CARE_TEAM_MEMBER_FORM_FIELDS,

    VALIDATE_CARE_TEAM_MEMBER_FORM,

    SAVE_CARE_TEAM_MEMBER_REQUEST,
    SAVE_CARE_TEAM_MEMBER_SUCCESS,
    SAVE_CARE_TEAM_MEMBER_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CARE_TEAM_MEMBER_FORM }
}

export function clearError () {
    return { type: CLEAR_CARE_TEAM_MEMBER_FORM_ERROR }
}

export function clearFieldError (field) {
    return {
        type: CLEAR_CARE_TEAM_MEMBER_FORM_FIELD_ERROR,
        payload: field
    }
}

export function changeField (name, value) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_CARE_TEAM_MEMBER_FORM_FIELD,
                payload: { name, value }
            })
        })
    }
}

export function changeFields (changes) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_CARE_TEAM_MEMBER_FORM_FIELDS,
                payload: changes
            })
        })
    }
}

export function validate (data) {
    return dispatch => {
        return careTeamFormValidator.validate(data).then(success => {
            dispatch({ type: VALIDATE_CARE_TEAM_MEMBER_FORM, payload: { success } })
            return success
        }).catch(errors => {
            dispatch({ type: VALIDATE_CARE_TEAM_MEMBER_FORM, payload: { success: false, errors } })
        })
    }
}

export function submit (member) {
    return dispatch => {
        dispatch({ type: SAVE_CARE_TEAM_MEMBER_REQUEST })
        return service.save(member).then(response => {
            dispatch({ type: SAVE_CARE_TEAM_MEMBER_SUCCESS, payload: response })
            return response
        }).catch(e => {
            dispatch({ type: SAVE_CARE_TEAM_MEMBER_FAILURE, payload: e })
            throw e
        })
    }
}
