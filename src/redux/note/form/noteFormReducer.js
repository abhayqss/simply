import Immutable from 'immutable'

import { ACTION_TYPES } from 'lib/Constants'

import { updateFieldErrors } from '../../utils/Form'

import InitialState from './NoteFormInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_NOTE_FORM,
    CLEAR_NOTE_FORM_ERROR,
    CLEAR_NOTE_FORM_FIELD_ERROR,

    CHANGE_NOTE_FORM_FIELD,
    CHANGE_NOTE_FORM_FIELDS,

    VALIDATE_NOTE_FORM,

    SAVE_NOTE_REQUEST,
    SAVE_NOTE_SUCCESS,
    SAVE_NOTE_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function noteFormReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_NOTE_FORM:
            return state.clear()

        case CLEAR_NOTE_FORM_ERROR:
            return state.removeIn(['error'])

        case CLEAR_NOTE_FORM_FIELD_ERROR: {
            const field = action.payload
            return state.setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorMsg'], '')
        }

        case CHANGE_NOTE_FORM_FIELD: {
            const { field, value } = action.payload
            return state.setIn(['fields', field], value)
        }

        case CHANGE_NOTE_FORM_FIELDS: {
            let changes = action.payload

            return state.mergeDeep(Immutable.fromJS({
                fields: changes
            }))
        }

        case VALIDATE_NOTE_FORM: {
            const path = ['fields']
            const { success, errors } = action.payload

            return state
                .setIn(['isValid'], success)
                .setIn(path, updateFieldErrors(state.getIn(path), errors))
        }

        case SAVE_NOTE_REQUEST: {
            return state.setIn(['isFetching'], true)
        }

        case SAVE_NOTE_SUCCESS: {
            return state.setIn(['isFetching'], false)
        }

        case SAVE_NOTE_FAILURE: {
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
        }
    }

    return state
}
