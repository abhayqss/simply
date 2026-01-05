import { ACTION_TYPES } from 'lib/Constants'

import { defer } from 'lib/utils/Utils'

import service from 'services/ServicePlanService'
import validator from 'validators/ServicePlanFormValidator'

const {
    CLEAR_SERVICE_PLAN_FORM,
    CLEAR_SERVICE_PLAN_FORM_ERROR,
    CLEAR_SERVICE_PLAN_FORM_FIELD_ERROR,

    CHANGE_SERVICE_PLAN_FORM_TAB,

    CHANGE_SERVICE_PLAN_FORM_FIELD,
    CHANGE_SERVICE_PLAN_FORM_FIELDS,

    VALIDATE_SERVICE_PLAN_FORM,

    SAVE_SERVICE_PLAN_REQUEST,
    SAVE_SERVICE_PLAN_SUCCESS,
    SAVE_SERVICE_PLAN_FAILURE,

    ADD_SERVICE_PLAN_FORM_NEED,
    REMOVE_SERVICE_PLAN_FORM_NEED,
    CHANGE_SERVICE_PLAN_FORM_NEED_FIELD,
    CHANGE_SERVICE_PLAN_FORM_NEED_FIELDS,
    CLEAR_SERVICE_PLAN_FORM_NEED_FIELDS,

    ADD_SERVICE_PLAN_FORM_GOAL,
    REMOVE_SERVICE_PLAN_FORM_GOAL,
    CHANGE_SERVICE_PLAN_FORM_GOAL_FIELD,
    CHANGE_SERVICE_PLAN_FORM_GOAL_FIELDS,
    CHANGE_SERVICE_PLAN_FORM_NEED_SCORE_FIELD
} = ACTION_TYPES

export function clear () {
    return dispatch => {
        return defer().then(() => {
            dispatch({ type: CLEAR_SERVICE_PLAN_FORM })
        })
    }
}

export function clearError () {
    return { type: CLEAR_SERVICE_PLAN_FORM_ERROR }
}

export function clearFieldError (field) {
    return {
        type: CLEAR_SERVICE_PLAN_FORM_FIELD_ERROR,
        payload: field
    }
}

export function changeTab (tab) {
    return {
        type: CHANGE_SERVICE_PLAN_FORM_TAB,
        payload: tab
    }
}

export function changeField (field, value) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_SERVICE_PLAN_FORM_FIELD,
                payload: { field, value }
            })
        })
    }
}

export function changeFields (changes) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_SERVICE_PLAN_FORM_FIELDS,
                payload: changes
            })
        })
    }
}

export function addNeed (index) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: ADD_SERVICE_PLAN_FORM_NEED,
                payload: index
            })
        })
    }
}

export function removeNeed (index) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: REMOVE_SERVICE_PLAN_FORM_NEED,
                payload: index
            })
        })
    }
}

export function changeNeedField (index, field, value, isNeedScoreField) {
    return dispatch => {
        return defer().then(() => {
            if (isNeedScoreField) {
                dispatch({
                    type: CHANGE_SERVICE_PLAN_FORM_NEED_SCORE_FIELD,
                    payload: { index, field, value }
                })
            }

            else {
                dispatch({
                    type: CHANGE_SERVICE_PLAN_FORM_NEED_FIELD,
                    payload: { index, field, value }
                })
            }
        })
    }
}

export function changeNeedFields (changes) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_SERVICE_PLAN_FORM_NEED_FIELDS,
                payload: changes
            })
        })
    }
}

export function clearNeedFields (needIndex) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CLEAR_SERVICE_PLAN_FORM_NEED_FIELDS,
                payload: needIndex
            })
        })
    }
}

//we'll pass needIndex in all methods: add, remove, changeGoalField ....
export function addGoal (needIndex, index) {
    return {
        type: ADD_SERVICE_PLAN_FORM_GOAL,
        payload: { needIndex, index }
    }
}

export function removeGoal (needIndex, index) {
    return {
        type: REMOVE_SERVICE_PLAN_FORM_GOAL,
        payload: { needIndex, index }
    }
}

export function changeGoalField (index, needIndex, field, value) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_SERVICE_PLAN_FORM_GOAL_FIELD,
                payload: { index, needIndex, field, value }
            })
        })
    }
}

export function changeGoalFields (changes) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_SERVICE_PLAN_FORM_GOAL_FIELDS,
                payload: changes
            })
        })
    }
}

export function validate (data, options) {
    return dispatch => {
        return validator.validate(data, options).then(success => {
            dispatch({ type: VALIDATE_SERVICE_PLAN_FORM, payload: { success } })
            return success
        }).catch(errors => {
            dispatch({ type: VALIDATE_SERVICE_PLAN_FORM, payload: { success: false, errors } })
        })
    }
}

export function submit (servicePlan, clientId) {
    return dispatch => {
        dispatch({ type: SAVE_SERVICE_PLAN_REQUEST })
        return service.save(servicePlan, clientId).then(response => {
            dispatch({ type: SAVE_SERVICE_PLAN_SUCCESS, payload: response })
            return response
        }).catch(e => {
            dispatch({ type: SAVE_SERVICE_PLAN_FAILURE, payload: e })
        })
    }
}
