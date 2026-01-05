import Immutable from 'immutable'
import { isArray } from 'underscore'

import { ACTION_TYPES } from 'lib/Constants'

import { updateFieldErrors } from '../../utils/Form'

import InitialState from './EventFormInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_EVENT_FORM,
    CLEAR_EVENT_FORM_ERROR,
    CLEAR_EVENT_FORM_FIELD_ERROR,

    CHANGE_EVENT_FORM_FIELD,
    CHANGE_EVENT_FORM_FIELDS,

    VALIDATE_EVENT_FORM,

    SAVE_EVENT_REQUEST,
    SAVE_EVENT_SUCCESS,
    SAVE_EVENT_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function eventFormReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_EVENT_FORM:
            return state.clear()

        case CLEAR_EVENT_FORM_ERROR:
            return state.removeIn(['error'])

        case CLEAR_EVENT_FORM_FIELD_ERROR: {
            const field = action.payload
            return state.setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorMsg'], '')
        }

        case CHANGE_EVENT_FORM_FIELD: {
            const { field, value } = action.payload

            return isArray(field)
                ? state.setIn(['fields', ...field], value)
                : state.setIn(['fields', field], value)
        }

        case CHANGE_EVENT_FORM_FIELDS: {
            let changes = action.payload

            return state.mergeDeep(Immutable.fromJS({
                fields: changes
            }))
        }

        case VALIDATE_EVENT_FORM: {
            const path = ['fields']
            const { success, errors } = action.payload

            return state
                .setIn(['isValid'], success)
                .setIn(path, updateFieldErrors(state.getIn(path), errors))
        }

        case SAVE_EVENT_REQUEST: {
            return state.setIn(['isFetching'], true)
        }

        case SAVE_EVENT_SUCCESS: {
            return state.setIn(['isFetching'], false)
        }

        case SAVE_EVENT_FAILURE: {
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
        }
    }

    return state
}
