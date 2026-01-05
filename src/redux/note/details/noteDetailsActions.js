import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/NoteService'

const {
    CLEAR_NOTE_DETAILS,
    CLEAR_NOTE_DETAILS_ERROR,

    LOAD_NOTE_DETAILS_REQUEST,
    LOAD_NOTE_DETAILS_SUCCESS,
    LOAD_NOTE_DETAILS_FAILURE
} = ACTION_TYPES

export function clear () {
    return {
        type: CLEAR_NOTE_DETAILS
    }
}

export function clearError () {
    return {
        type: CLEAR_NOTE_DETAILS_ERROR
    }
}

export function load (noteId, clientId) {
    return dispatch => {
        dispatch({ type: LOAD_NOTE_DETAILS_REQUEST })
        return service.findById(noteId, clientId).then(response => {
            const { data } = response
            dispatch({ type: LOAD_NOTE_DETAILS_SUCCESS, payload: data })
            return data
        }).catch((e) => {
            dispatch({ type: LOAD_NOTE_DETAILS_FAILURE, payload: e })
        })
    }
}
