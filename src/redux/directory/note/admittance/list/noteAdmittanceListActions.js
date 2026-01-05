import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_NOTE_ADMITTANCE_LIST,
    LOAD_NOTE_ADMITTANCE_LIST_SUCCESS,
    LOAD_NOTE_ADMITTANCE_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_NOTE_ADMITTANCE_LIST }
}

export function load (ids) {
    return dispatch => {
        return service.findNoteAdmittanceDates(ids).then(response => {
            const { data } = response

            dispatch({
                type: LOAD_NOTE_ADMITTANCE_LIST_SUCCESS,
                payload: { data }
            })
        }).catch(e => {
            dispatch({ type: LOAD_NOTE_ADMITTANCE_LIST_FAILURE, payload: e })
        })
    }
}