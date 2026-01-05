import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ClientService'

const {
    CLEAR_CLIENT_HISTORY_ERROR,

    CLEAR_CLIENT_HISTORY,

    LOAD_CLIENT_HISTORY_REQUEST,
    LOAD_CLIENT_HISTORY_SUCCESS,
    LOAD_CLIENT_HISTORY_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CLIENT_HISTORY }
}

export function clearError () {
    return { type: CLEAR_CLIENT_HISTORY_ERROR }
}

export function load (config) {
    return dispatch => {
        dispatch({ type: LOAD_CLIENT_HISTORY_REQUEST, payload: config.page })
        return service.find(config).then(response => {
            const { page, size } = config
            const { data, totalCount } = response
            dispatch({
                type: LOAD_CLIENT_HISTORY_SUCCESS,
                payload: { data, page, size, totalCount }
            })
        }).catch(e => {
            dispatch({ type: LOAD_CLIENT_HISTORY_FAILURE, payload: e })
        })
    }
}

