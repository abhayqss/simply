import {
    ERROR_CODES,
    ACTION_TYPES,
    VALIDATION_ERROR_TEXTS
} from 'lib/Constants'

import InitialState from './ContactFormInitialState'

import { interpolate } from 'lib/utils/Utils'
import { updateFieldErrors, clearFieldErrorsX } from '../../utils/Form'

const { INVALID_LOGIN } = ERROR_CODES

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CONTACT_FORM,
    CLEAR_CONTACT_FORM_ERROR,
    CLEAR_CONTACT_FORM_FIELD_ERROR,

    CHANGE_CONTACT_FORM_TAB,

    CHANGE_CONTACT_FORM_FIELD,
    CHANGE_CONTACT_FORM_FIELDS,

    VALIDATE_CONTACT_FORM,
    VALIDATE_CONTACT_DATA_UNIQ_SUCCESS,

    SAVE_CONTACT_REQUEST,
    SAVE_CONTACT_SUCCESS,
    SAVE_CONTACT_FAILURE,

    INVITE_CONTACT_REQUEST,
    INVITE_CONTACT_SUCCESS,
    INVITE_CONTACT_FAILURE
} = ACTION_TYPES

const {
    NON_UNIQ
} = VALIDATION_ERROR_TEXTS

const initialState = new InitialState()

export default function contactFormReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CONTACT_FORM:
            return state.clear()

        case CLEAR_CONTACT_FORM_ERROR:
            return state.removeIn(['error'])

        case CLEAR_CONTACT_FORM_FIELD_ERROR: {
            const field = action.payload
            return state.setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorMsg'], '')
        }

        case CHANGE_CONTACT_FORM_TAB:
            return state.setIn(['tab'], action.payload)

        case CHANGE_CONTACT_FORM_FIELD: {
            const { name, value } = action.payload
            return state.setIn(['fields', name], value)
        }

        case CHANGE_CONTACT_FORM_FIELDS:
            return state.mergeDeep({ fields: action.payload })

        case VALIDATE_CONTACT_FORM: {
            const { success, errors = {} } = action.payload

            let nextState = state
                .setIn(['isValid'], success)
                .setIn(['fields'], updateFieldErrors(state.fields, errors))
                .removeIn(['fields', 'loginErrorCode'])

            if (errors.login) nextState = (
                nextState.setIn(['fields', 'loginErrorCode'], INVALID_LOGIN)
            )

            return nextState
        }

        case VALIDATE_CONTACT_DATA_UNIQ_SUCCESS: {
            if (!action.payload) {
                return state
                    .setIn(['isValid'], false)
                    .mergeIn(['fields'], {
                        loginHasError: true,
                        loginErrorText: interpolate(NON_UNIQ, 'contact', 'login')
                    })
            }

            break
        }

        case SAVE_CONTACT_REQUEST: {
            return state.setIn(['isFetching'], true)
        }

        case SAVE_CONTACT_SUCCESS: {
            return state.setIn(['isFetching'], false)
        }

        case SAVE_CONTACT_FAILURE: {
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
        }

        case INVITE_CONTACT_REQUEST: {
            return state.setIn(['isFetching'], true)
        }

        case INVITE_CONTACT_SUCCESS: {
            return state.setIn(['isFetching'], false)
        }

        case INVITE_CONTACT_FAILURE: {
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
        }
    }

    return state
}
