import service from 'services/ClientService'

import { ACTION_TYPES } from 'lib/Constants'

const {
    CLEAR_CLIENT_EMERGENCY_CONTACT_LIST,
    CLEAR_CLIENT_EMERGENCY_CONTACT_LIST_ERROR,
    LOAD_CLIENT_EMERGENCY_CONTACT_LIST_REQUEST,
    LOAD_CLIENT_EMERGENCY_CONTACT_LIST_SUCCESS,
    LOAD_CLIENT_EMERGENCY_CONTACT_LIST_FAILURE,
} = ACTION_TYPES

export function clear (shouldReload) {
    return { type: CLEAR_CLIENT_EMERGENCY_CONTACT_LIST, payload: shouldReload }
}

export function clearError () {
    return { type: CLEAR_CLIENT_EMERGENCY_CONTACT_LIST_ERROR }
}

export function load ({ clientId, page, size }) {
    return dispatch => {
        dispatch({ type: LOAD_CLIENT_EMERGENCY_CONTACT_LIST_REQUEST })

        return service.findEmergencyContacts(clientId).then(response => {
            const { data, totalCount } = response

            dispatch({
                type: LOAD_CLIENT_EMERGENCY_CONTACT_LIST_SUCCESS,
                payload: { data, page, size, totalCount }
            })

            return response
        }).catch(e => {
            dispatch({ type: LOAD_CLIENT_EMERGENCY_CONTACT_LIST_FAILURE, payload: e })
        })
    }
}

