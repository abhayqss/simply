import { saveAs } from 'file-saver'

import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ServicePlanService'

const {
    CLEAR_SERVICE_PLAN_DETAILS,
    CLEAR_SERVICE_PLAN_DETAILS_ERROR,

    LOAD_SERVICE_PLAN_DETAILS_REQUEST,
    LOAD_SERVICE_PLAN_DETAILS_SUCCESS,
    LOAD_SERVICE_PLAN_DETAILS_FAILURE,

    DOWNLOAD_SERVICE_PLAN_DETAILS_REQUEST,
    DOWNLOAD_SERVICE_PLAN_DETAILS_SUCCESS,
    DOWNLOAD_SERVICE_PLAN_DETAILS_FAILURE
} = ACTION_TYPES

export function clear () {
    return {
        type: CLEAR_SERVICE_PLAN_DETAILS
    }
}

export function clearError () {
    return {
        type: CLEAR_SERVICE_PLAN_DETAILS_ERROR
    }
}

export function load (clientId, planId) {
    return dispatch => {
        dispatch({ type: LOAD_SERVICE_PLAN_DETAILS_REQUEST })
        return service.findById(clientId, planId).then(response => {
            dispatch({ type: LOAD_SERVICE_PLAN_DETAILS_SUCCESS, payload: response.data })
            return response
        }).catch((e) => {
            dispatch({ type: LOAD_SERVICE_PLAN_DETAILS_FAILURE, payload: e })
        })
    }
}

export function download (clientId, planId) {
    return () => (
        service
            .download(clientId, planId)
            .then(({ name, data }) => {
                saveAs(data, name)
                return { success: true, name }
            })
    )
}
