import {ACTION_TYPES} from 'lib/Constants'

import service from 'services/DashboardService'

const {
    CLEAR_DASHBOARD_SERVICE_PLAN_COUNT,
    CLEAR_DASHBOARD_SERVICE_PLAN_COUNT_ERROR,
    LOAD_DASHBOARD_SERVICE_PLAN_COUNT_REQUEST,
    LOAD_DASHBOARD_SERVICE_PLAN_COUNT_SUCCESS,
    LOAD_DASHBOARD_SERVICE_PLAN_COUNT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_DASHBOARD_SERVICE_PLAN_COUNT }
}

export function clearError () {
    return { type: CLEAR_DASHBOARD_SERVICE_PLAN_COUNT_ERROR }
}

export function load () {
    return dispatch => {
        dispatch({ type: LOAD_DASHBOARD_SERVICE_PLAN_COUNT_REQUEST })
        return service.findServicePlanCount().then(response => {
            dispatch({ type: LOAD_DASHBOARD_SERVICE_PLAN_COUNT_SUCCESS, payload: response.data })
        }).catch(e => {
            dispatch({ type: LOAD_DASHBOARD_SERVICE_PLAN_COUNT_FAILURE, payload: e })
        })
    }
}