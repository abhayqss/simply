import Immutable from 'immutable'

import InitialState from './NewPasswordFormInitialState'

import { updateFieldErrors } from '../../../../utils/Form'

import { ACTION_TYPES } from 'lib/Constants'

const {
    CLEAR_NEW_PASSWORD_FORM,
    CLEAR_NEW_PASSWORD_FORM_ERROR,
    CLEAR_NEW_PASSWORD_FORM_FIELD_ERROR,
    CHANGE_NEW_PASSWORD_FORM_FIELD,
    CHANGE_NEW_PASSWORD_FORM_FIELDS,
    VALIDATE_NEW_PASSWORD_FORM,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAILURE,
} = ACTION_TYPES

const initialState = new InitialState()

export default function newPasswordFormReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case CLEAR_NEW_PASSWORD_FORM:
            return state.clear()

        case CLEAR_NEW_PASSWORD_FORM_ERROR:
            return state.removeIn(['error'])

        case CLEAR_NEW_PASSWORD_FORM_FIELD_ERROR: {
            const field = action.payload
            return state.setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorText'], '')
        }

        case CHANGE_NEW_PASSWORD_FORM_FIELD: {
            const {field, value} = action.payload

            return state
                .setIn(['fields', field], value)
                .setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorText'], '')
        }

        case CHANGE_NEW_PASSWORD_FORM_FIELDS: {
            const fields = action.payload
            let changes = Immutable.fromJS({ fields })
            return state.mergeDeep(changes)
        }

        case VALIDATE_NEW_PASSWORD_FORM: {
            const path = ['fields']
            const { success, errors } = action.payload

            return state
                .setIn(['isValid'], success)
                .setIn(path, updateFieldErrors(state.getIn(path), errors))
        }

        case NEW_PASSWORD_REQUEST: {
            return state.setIn(['isFetching'], true)
        }

        case NEW_PASSWORD_SUCCESS: {
            return state.setIn(['isFetching'], false)
        }

        case NEW_PASSWORD_FAILURE: {
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
        }
    }

    return state
}