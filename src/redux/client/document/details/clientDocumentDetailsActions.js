import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ClientDocumentService'

const {
    CLEAR_CLIENT_DOCUMENT_DETAILS,
    CLEAR_CLIENT_DOCUMENT_DETAILS_ERROR,

    LOAD_CLIENT_DOCUMENT_DETAILS_REQUEST,
    LOAD_CLIENT_DOCUMENT_DETAILS_SUCCESS,
    LOAD_CLIENT_DOCUMENT_DETAILS_FAILURE
} = ACTION_TYPES

export function clear () {
    return {
        type: CLEAR_CLIENT_DOCUMENT_DETAILS
    }
}

export function clearError () {
    return {
        type: CLEAR_CLIENT_DOCUMENT_DETAILS_ERROR
    }
}

export function load (documentId, clientId, userId) {
    return dispatch => {
        dispatch({ type: LOAD_CLIENT_DOCUMENT_DETAILS_REQUEST })
        return service.findById(documentId, clientId, userId).then(response => {
            const { data } = response
            dispatch({ type: LOAD_CLIENT_DOCUMENT_DETAILS_SUCCESS, payload: data })
            return data
        }).catch((e) => {
            dispatch({ type: LOAD_CLIENT_DOCUMENT_DETAILS_FAILURE, payload: e })
        })
    }
}