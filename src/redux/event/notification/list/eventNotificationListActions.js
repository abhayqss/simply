import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/EventService'

const {
    CLEAR_EVENT_NOTIFICATION_LIST_ERROR,

    CLEAR_EVENT_NOTIFICATION_LIST,
    CLEAR_EVENT_NOTIFICATION_LIST_FILTER,
    CHANGE_EVENT_NOTIFICATION_LIST_FILTER,

    LOAD_EVENT_NOTIFICATION_LIST_REQUEST,
    LOAD_EVENT_NOTIFICATION_LIST_SUCCESS,
    LOAD_EVENT_NOTIFICATION_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_EVENT_NOTIFICATION_LIST }
}

export function clearError () {
    return { type: CLEAR_EVENT_NOTIFICATION_LIST_ERROR }
}


export function clearFilter () {
    return { type: CLEAR_EVENT_NOTIFICATION_LIST_FILTER }
}

export function changeFilter (changes, shouldReload) {
    return {
        type: CHANGE_EVENT_NOTIFICATION_LIST_FILTER,
        payload: { changes, shouldReload }
    }
}

export function load (config) {

    return dispatch => {
        dispatch({ type: LOAD_EVENT_NOTIFICATION_LIST_REQUEST, payload: config.page })
        return service.findSentNotifications(config).then(response => {
            const { page, size } = config
            const { data, totalCount } = response
            dispatch({
                type: LOAD_EVENT_NOTIFICATION_LIST_SUCCESS,
                payload: { data, page, size, totalCount }
            })
        }).catch(e => {
            dispatch({ type: LOAD_EVENT_NOTIFICATION_LIST_FAILURE, payload: e })
        })
    }
}

