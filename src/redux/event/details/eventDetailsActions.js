import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/EventService'

const {
    CLEAR_EVENT_DETAILS,
    CLEAR_EVENT_DETAILS_ERROR,

    LOAD_EVENT_DETAILS_REQUEST,
    LOAD_EVENT_DETAILS_SUCCESS,
    LOAD_EVENT_DETAILS_FAILURE
} = ACTION_TYPES

export function clear () {
    return {
        type: CLEAR_EVENT_DETAILS
    }
}

export function clearError () {
    return {
        type: CLEAR_EVENT_DETAILS_ERROR
    }
}

export function load (eventId, clientId) {
    return dispatch => {
        dispatch({ type: LOAD_EVENT_DETAILS_REQUEST })
        return service.findById(eventId, clientId).then(response => {
            const { data } = response
            dispatch({ type: LOAD_EVENT_DETAILS_SUCCESS, payload: data })
            return data
        }).catch((e) => {
            dispatch({ type: LOAD_EVENT_DETAILS_FAILURE, payload: e })
        })
    }
}
