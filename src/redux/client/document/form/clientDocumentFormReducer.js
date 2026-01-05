import { ACTION_TYPES } from 'lib/Constants'

import { updateFieldErrors } from '../../../utils/Form'

import InitialState from './ClientDocumentFormInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CLIENT_DOCUMENT_FORM,
    CLEAR_CLIENT_DOCUMENT_FORM_ERROR,
    CLEAR_CLIENT_DOCUMENT_FORM_FIELD_ERROR,

    CHANGE_CLIENT_DOCUMENT_FORM_FIELD,

    VALIDATE_CLIENT_DOCUMENT_FORM,

    SAVE_CLIENT_DOCUMENT_REQUEST,
    SAVE_CLIENT_DOCUMENT_SUCCESS,
    SAVE_CLIENT_DOCUMENT_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function clientDocumentFormReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CLIENT_DOCUMENT_FORM:
            return state.clear()

        case CLEAR_CLIENT_DOCUMENT_FORM_ERROR:
            return state.removeIn(['error'])

        case CLEAR_CLIENT_DOCUMENT_FORM_FIELD_ERROR: {
            const field = action.payload
            return state.setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorMsg'], '')
        }

        case CHANGE_CLIENT_DOCUMENT_FORM_FIELD: {
            const { field, value } = action.payload
            return state.setIn(['fields', field], value)
        }

        case VALIDATE_CLIENT_DOCUMENT_FORM: {
            const path = ['fields']
            const { success, errors } = action.payload

            return state
                .setIn(['isValid'], success)
                .setIn(path, updateFieldErrors(state.getIn(path), errors))
        }

        case SAVE_CLIENT_DOCUMENT_REQUEST: {
            return state.setIn(['isFetching'], true)
        }

        case SAVE_CLIENT_DOCUMENT_SUCCESS: {
            return state.setIn(['isFetching'], false)
        }

        case SAVE_CLIENT_DOCUMENT_FAILURE: {
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
        }
    }

    return state
}
