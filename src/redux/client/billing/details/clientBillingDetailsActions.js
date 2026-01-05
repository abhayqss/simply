import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ClientService'

const {
    CLEAR_CLIENT_BILLING_DETAILS,
    CLEAR_CLIENT_BILLING_DETAILS_ERROR,

    LOAD_CLIENT_BILLING_DETAILS_REQUEST,
    LOAD_CLIENT_BILLING_DETAILS_SUCCESS,
    LOAD_CLIENT_BILLING_DETAILS_FAILURE
} = ACTION_TYPES

export function clear () {
    return {
        type: CLEAR_CLIENT_BILLING_DETAILS
    }
}

export function clearError () {
    return {
        type: CLEAR_CLIENT_BILLING_DETAILS_ERROR
    }
}

export function load (clientId) {
    return dispatch => {
        dispatch({ type: LOAD_CLIENT_BILLING_DETAILS_REQUEST })
        return service.findBillingDetails(clientId).then(response => {
            dispatch({ type: LOAD_CLIENT_BILLING_DETAILS_SUCCESS, payload: response.data })
            return response
        }).catch((e) => {
            dispatch({ type: LOAD_CLIENT_BILLING_DETAILS_FAILURE, payload: e })
        })
    }
}
