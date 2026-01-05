import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ClientDocumentService'

const {
    CLEAR_DELETE_CLIENT_DOCUMENT,
    CLEAR_DELETE_CLIENT_DOCUMENT_ERROR,

    LOAD_DELETE_CLIENT_DOCUMENT_REQUEST,
    LOAD_DELETE_CLIENT_DOCUMENT_SUCCESS,
    LOAD_DELETE_CLIENT_DOCUMENT_FAILURE
} = ACTION_TYPES

export function clear () {
    return {
        type: CLEAR_DELETE_CLIENT_DOCUMENT
    }
}

export function clearError () {
    return {
        type: CLEAR_DELETE_CLIENT_DOCUMENT_ERROR
    }
}

export function deleteDocument (documentId, clientId, userId) {
    return dispatch => {
        dispatch({ type: LOAD_DELETE_CLIENT_DOCUMENT_REQUEST })
        return service.deleteById(documentId, clientId, userId).then(response => {
            const { data } = response
            dispatch({ type: LOAD_DELETE_CLIENT_DOCUMENT_SUCCESS, payload: data })
            return data
        }).catch((e) => {
            dispatch({ type: LOAD_DELETE_CLIENT_DOCUMENT_FAILURE, payload: e })
        })
    }
}
