import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ServicePlanService'

const {
    CLEAR_SERVICE_PLAN_COUNT,
    CLEAR_SERVICE_PLAN_COUNT_ERROR,
    LOAD_SERVICE_PLAN_COUNT_REQUEST,
    LOAD_SERVICE_PLAN_COUNT_SUCCESS,
    LOAD_SERVICE_PLAN_COUNT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_SERVICE_PLAN_COUNT }
}

export function clearError () {
    return { type: CLEAR_SERVICE_PLAN_COUNT_ERROR }
}

export function load (clientId) {
    return dispatch => {
        dispatch({ type: LOAD_SERVICE_PLAN_COUNT_REQUEST })
        return service.count(clientId).then(response => {
            dispatch({ type: LOAD_SERVICE_PLAN_COUNT_SUCCESS, payload: response.data })

            return response
        }).catch(e => {
            dispatch({ type: LOAD_SERVICE_PLAN_COUNT_FAILURE, payload: e })
        })
    }
}
