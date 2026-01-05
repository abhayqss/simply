import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ServicePlanService'

const {
    CLEAR_CAN_ADD_SERVICE_PLAN,
    CLEAR_CAN_ADD_SERVICE_PLAN_ERROR,
    LOAD_CAN_ADD_SERVICE_PLAN_REQUEST,
    LOAD_CAN_ADD_SERVICE_PLAN_SUCCESS,
    LOAD_CAN_ADD_SERVICE_PLAN_FAILURE,
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CAN_ADD_SERVICE_PLAN }
}

export function clearError () {
    return { type: CLEAR_CAN_ADD_SERVICE_PLAN_ERROR }
}

export function load (clientId) {
    return dispatch => {
        dispatch({ type: LOAD_CAN_ADD_SERVICE_PLAN_REQUEST })
        return service.canAdd(clientId).then(response => {
            dispatch({ type: LOAD_CAN_ADD_SERVICE_PLAN_SUCCESS, payload: response.data })
            return response
        }).catch(e => {
            dispatch({ type: LOAD_CAN_ADD_SERVICE_PLAN_FAILURE, payload: e })
        })
    }
}
