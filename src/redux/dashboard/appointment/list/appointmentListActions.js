import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DashboardService'

const {
    CLEAR_DASHBOARD_APPOINTMENT_LIST_ERROR,

    CLEAR_DASHBOARD_APPOINTMENT_LIST,
    CLEAR_DASHBOARD_APPOINTMENT_LIST_FILTER,
    CHANGE_DASHBOARD_APPOINTMENT_LIST_FILTER,

    LOAD_DASHBOARD_APPOINTMENT_LIST_REQUEST,
    LOAD_DASHBOARD_APPOINTMENT_LIST_SUCCESS,
    LOAD_DASHBOARD_APPOINTMENT_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_DASHBOARD_APPOINTMENT_LIST }
}

export function clearError () {
    return { type: CLEAR_DASHBOARD_APPOINTMENT_LIST_ERROR }
}


export function clearFilter () {
    return { type: CLEAR_DASHBOARD_APPOINTMENT_LIST_FILTER }
}

export function changeFilter (changes, shouldReload) {
    return {
        type: CHANGE_DASHBOARD_APPOINTMENT_LIST_FILTER,
        payload: { changes, shouldReload }
    }
}

export function load (config) {
    return dispatch => {
        dispatch({ type: LOAD_DASHBOARD_APPOINTMENT_LIST_REQUEST, payload: config.page })
        return service.find(config).then(response => {
            const { page, size } = config
            const { data, totalCount } = response
            dispatch({
                type: LOAD_DASHBOARD_APPOINTMENT_LIST_SUCCESS,
                payload: { data, page, size, totalCount }
            })
        }).catch(e => {
            dispatch({ type: LOAD_DASHBOARD_APPOINTMENT_LIST_FAILURE, payload: e })
        })
    }
}

