import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ServicePlanService'

const {
    CLEAR_SERVICE_PLAN_LIST_ERROR,

    CLEAR_SERVICE_PLAN_LIST,
    CLEAR_SERVICE_PLAN_LIST_FILTER,
    CHANGE_SERVICE_PLAN_LIST_FILTER,

    LOAD_SERVICE_PLAN_LIST_REQUEST,
    LOAD_SERVICE_PLAN_LIST_SUCCESS,
    LOAD_SERVICE_PLAN_LIST_FAILURE,
    CHANGE_SERVICE_PLAN_LIST_SORTING,
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_SERVICE_PLAN_LIST }
}

export function clearError () {
    return { type: CLEAR_SERVICE_PLAN_LIST_ERROR }
}

export function sort (field, order, shouldReload) {
    return {
        type:  CHANGE_SERVICE_PLAN_LIST_SORTING,
        payload: { field, order, shouldReload }
    }
}

export function clearFilter () {
    return { type: CLEAR_SERVICE_PLAN_LIST_FILTER }
}

export function changeFilter (changes, shouldReload) {
    return {
        type: CHANGE_SERVICE_PLAN_LIST_FILTER,
        payload: { changes, shouldReload }
    }
}

export function isAnyInDevelopment (clientId) {
    return () => service.isAnyInDevelopment(clientId)
}

export function load (config) {
    return dispatch => {
        dispatch({ type: LOAD_SERVICE_PLAN_LIST_REQUEST, payload: config.page })
        return service.find(config).then(response => {
            const { page, size } = config
            const { data, totalCount } = response
            dispatch({
                type: LOAD_SERVICE_PLAN_LIST_SUCCESS,
                payload: { data, page, size, totalCount }
            })
        }).catch(e => {
            dispatch({ type: LOAD_SERVICE_PLAN_LIST_FAILURE, payload: e })
        })
    }
}