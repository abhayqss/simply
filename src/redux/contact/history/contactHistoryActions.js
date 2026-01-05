import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ContactService'

const {
    CLEAR_CONTACT_HISTORY_ERROR,

    CLEAR_CONTACT_HISTORY,

    LOAD_CONTACT_HISTORY_REQUEST,
    LOAD_CONTACT_HISTORY_SUCCESS,
    LOAD_CONTACT_HISTORY_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CONTACT_HISTORY }
}

export function clearError () {
    return { type: CLEAR_CONTACT_HISTORY_ERROR }
}

export function load (config) {
    return dispatch => {
        dispatch({ type: LOAD_CONTACT_HISTORY_REQUEST, payload: config.page })
        return service.find(config).then(response => {
            const { page, size } = config
            const { data, totalCount } = response
            dispatch({
                type: LOAD_CONTACT_HISTORY_SUCCESS,
                payload: { data, page, size, totalCount }
            })
        }).catch(e => {
            dispatch({ type: LOAD_CONTACT_HISTORY_FAILURE, payload: e })
        })
    }
}

