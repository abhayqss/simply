import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/NoteService'

const {
    CLEAR_EVENT_NOTE_COMPOSED_COUNT,
    CLEAR_EVENT_NOTE_COMPOSED_COUNT_ERROR,
    LOAD_EVENT_NOTE_COMPOSED_COUNT_REQUEST,
    LOAD_EVENT_NOTE_COMPOSED_COUNT_SUCCESS,
    LOAD_EVENT_NOTE_COMPOSED_COUNT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_EVENT_NOTE_COMPOSED_COUNT }
}

export function clearError () {
    return { type: CLEAR_EVENT_NOTE_COMPOSED_COUNT_ERROR }
}

export function load (clientId) {
    return dispatch => {
        dispatch({ type: LOAD_EVENT_NOTE_COMPOSED_COUNT_REQUEST })
        return service.findComposedCount(clientId).then(response => {
            dispatch({ type: LOAD_EVENT_NOTE_COMPOSED_COUNT_SUCCESS, payload: response.data })
        }).catch(e => {
            dispatch({ type: LOAD_EVENT_NOTE_COMPOSED_COUNT_FAILURE, payload: e })
        })
    }
}
