import InitialState from './ResetPasswordFormInitialState'

import { updateFieldErrors } from '../../../../utils/Form'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_RESET_PASSWORD_FORM,
    CLEAR_RESET_PASSWORD_FORM_ERROR,
    CLEAR_RESET_PASSWORD_FORM_FIELD_ERROR,
    CHANGE_RESET_PASSWORD_FORM_FIELD,
    CHANGE_RESET_PASSWORD_FORM_FIELDS,
    VALIDATE_RESET_PASSWORD_FORM,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
} = ACTION_TYPES

const initialState = new InitialState()

export default function loginFormReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case CLEAR_RESET_PASSWORD_FORM:
            return state.clear()

        case CLEAR_RESET_PASSWORD_FORM_ERROR:
            return state.removeIn(['error'])

        case CLEAR_RESET_PASSWORD_FORM_FIELD_ERROR: {
            const field = action.payload
            return state.setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorText'], '')
        }

        case CHANGE_RESET_PASSWORD_FORM_FIELD: {
            const {field, value} = action.payload

            return state
                .setIn(['fields', field], value)
                .setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorText'], '')
        }

        case CHANGE_RESET_PASSWORD_FORM_FIELDS:
            return state.mergeDeep({ fields: action.payload })

        case VALIDATE_RESET_PASSWORD_FORM: {
            const path = ['fields']
            const { success, errors } = action.payload

            return state
                .setIn(['isValid'], success)
                .setIn(path, updateFieldErrors(state.getIn(path), errors))
        }

        case RESET_PASSWORD_REQUEST: {
            return state.setIn(['isFetching'], true)
        }

        case RESET_PASSWORD_SUCCESS: {
            return state.setIn(['isFetching'], false)
        }

        case RESET_PASSWORD_FAILURE: {
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
        }
    }

    return state
}
