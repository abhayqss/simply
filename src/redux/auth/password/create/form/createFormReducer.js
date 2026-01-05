import Immutable from 'immutable'

import InitialState from './CreateFormInitialState'

import { updateFieldErrors } from '../../../../utils/Form'

import { ACTION_TYPES } from 'lib/Constants'

const {
    CLEAR_CREATE_PASSWORD_FORM,
    CLEAR_CREATE_PASSWORD_FORM_ERROR,
    CLEAR_CREATE_PASSWORD_FORM_FIELD_ERROR,

    CHANGE_CREATE_PASSWORD_FORM_FIELD,
    CHANGE_CREATE_PASSWORD_FORM_FIELDS,
    VALIDATE_CREATE_PASSWORD_FORM,

    CREATE_PASSWORD_REQUEST,
    CREATE_PASSWORD_SUCCESS,
    CREATE_PASSWORD_FAILURE,

    DECLINE_INVITATION_REQUEST,
    DECLINE_INVITATION_SUCCESS,
    DECLINE_INVITATION_FAILURE,
} = ACTION_TYPES

const initialState = new InitialState()

export default function createFormReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case CLEAR_CREATE_PASSWORD_FORM:
            return state.clear()

        case CLEAR_CREATE_PASSWORD_FORM_ERROR:
            return state.removeIn(['error'])

        case CLEAR_CREATE_PASSWORD_FORM_FIELD_ERROR: {
            const field = action.payload
            return state.setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorText'], '')
        }

        case CHANGE_CREATE_PASSWORD_FORM_FIELD: {
            const {field, value} = action.payload

            return state
                .setIn(['fields', field], value)
                .setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorText'], '')
        }

        case CHANGE_CREATE_PASSWORD_FORM_FIELDS: {
            const fields = action.payload
            let changes = Immutable.fromJS({ fields })
            return state.mergeDeep(changes)
        }

        case VALIDATE_CREATE_PASSWORD_FORM: {
            const path = ['fields']
            const { success, errors } = action.payload

            return state
                .setIn(['isValid'], success)
                .setIn(path, updateFieldErrors(state.getIn(path), errors))
        }

        case CREATE_PASSWORD_REQUEST: {
            return state.setIn(['isFetching'], true)
        }

        case CREATE_PASSWORD_SUCCESS: {
            return state.setIn(['isFetching'], false)
        }

        case CREATE_PASSWORD_FAILURE: {
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
        }

        case DECLINE_INVITATION_REQUEST: {
            return state.setIn(['isFetching'], true)
        }

        case DECLINE_INVITATION_SUCCESS: {
            return state.setIn(['isFetching'], false)
        }

        case DECLINE_INVITATION_FAILURE: {
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
        }
    }

    return state
}
