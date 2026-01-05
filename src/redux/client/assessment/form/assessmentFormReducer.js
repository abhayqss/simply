import Immutable from 'immutable'

import { ACTION_TYPES } from 'lib/Constants'

import { updateFieldErrors } from '../../../utils/Form'

import InitialState from './AssessmentFormInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_ASSESSMENT_FORM,
    CLEAR_ASSESSMENT_FORM_ERROR,
    CLEAR_ASSESSMENT_FORM_FIELD_ERROR,

    CHANGE_ASSESSMENT_FORM_TAB,

    CHANGE_ASSESSMENT_FORM_FIELD,
    CHANGE_ASSESSMENT_FORM_FIELDS,

    SAVE_ASSESSMENT_REQUEST,
    SAVE_ASSESSMENT_SUCCESS,
    SAVE_ASSESSMENT_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function organizationFormReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_ASSESSMENT_FORM:
            return state.clear()

        case CLEAR_ASSESSMENT_FORM_ERROR:
            return state.removeIn(['error'])

        case CLEAR_ASSESSMENT_FORM_FIELD_ERROR: {
            const field = action.payload
            return state.setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorMsg'], '')
        }

        case CHANGE_ASSESSMENT_FORM_TAB:
            return state.setIn(['tab'], action.payload)

        case CHANGE_ASSESSMENT_FORM_FIELD: {
            const { field, value } = action.payload
            return state.setIn(['fields', field], value)
        }

        case CHANGE_ASSESSMENT_FORM_FIELDS: {
            let changes = action.payload

            if (changes.marketplace) {
                return state.mergeDeep(Immutable.fromJS({
                    fields: {
                        marketplace: changes.marketplace
                    }
                }))
            }

            return state.mergeDeep(Immutable.fromJS({
                fields: changes
            }))
        }

        case SAVE_ASSESSMENT_REQUEST: {
            return state.setIn(['isFetching'], true)
        }

        case SAVE_ASSESSMENT_SUCCESS: {
            return state.setIn(['isFetching'], false)
        }

        case SAVE_ASSESSMENT_FAILURE: {
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
        }
    }

    return state
}
