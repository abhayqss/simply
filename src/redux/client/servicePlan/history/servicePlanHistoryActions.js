import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ServicePlanService'

const {
    CLEAR_SERVICE_PLAN_HISTORY_ERROR,

    CLEAR_SERVICE_PLAN_HISTORY,

    LOAD_SERVICE_PLAN_HISTORY_REQUEST,
    LOAD_SERVICE_PLAN_HISTORY_SUCCESS,
    LOAD_SERVICE_PLAN_HISTORY_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_SERVICE_PLAN_HISTORY }
}

export function clearError () {
    return { type: CLEAR_SERVICE_PLAN_HISTORY_ERROR }
}

export function load (config) {
    return dispatch => {
        dispatch({ type: LOAD_SERVICE_PLAN_HISTORY_REQUEST, payload: config.page })
        return service.findHistory(config).then(response => {
            const { page, size } = config
            const { data, totalCount } = response
            dispatch({
                type: LOAD_SERVICE_PLAN_HISTORY_SUCCESS,
                payload: { data, page, size, totalCount }
            })
        }).catch(e => {
            dispatch({ type: LOAD_SERVICE_PLAN_HISTORY_FAILURE, payload: e })
        })
    }
}

