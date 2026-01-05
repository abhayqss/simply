import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ClientDocumentService'

const {
    CLEAR_CLIENT_DOCUMENT_LIST_ERROR,

    CLEAR_CLIENT_DOCUMENT_LIST,
    CLEAR_CLIENT_DOCUMENT_LIST_FILTER,
    CHANGE_CLIENT_DOCUMENT_LIST_FILTER,

    LOAD_CLIENT_DOCUMENT_LIST_REQUEST,
    LOAD_CLIENT_DOCUMENT_LIST_SUCCESS,
    LOAD_CLIENT_DOCUMENT_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CLIENT_DOCUMENT_LIST }
}

export function clearError () {
    return { type: CLEAR_CLIENT_DOCUMENT_LIST_ERROR }
}


export function clearFilter () {
    return { type: CLEAR_CLIENT_DOCUMENT_LIST_FILTER }
}

export function changeFilter (changes, shouldReload) {
    return {
        type: CHANGE_CLIENT_DOCUMENT_LIST_FILTER,
        payload: { changes, shouldReload }
    }
}

export function load (config) {

    return dispatch => {
        dispatch({ type: LOAD_CLIENT_DOCUMENT_LIST_REQUEST, payload: config.page })
        return service.find(config).then(response => {
            const { page, size } = config
            const { data, totalCount } = response
            dispatch({
                type: LOAD_CLIENT_DOCUMENT_LIST_SUCCESS,
                payload: { data, page, size, totalCount }
            })
        }).catch(e => {
            dispatch({ type: LOAD_CLIENT_DOCUMENT_LIST_FAILURE, payload: e })
        })
    }
}