import Immutable from 'immutable'

import {
    ACTION_TYPES,
    SERVER_ERROR_CODES
} from 'lib/Constants'

import LoginFormInitialState from './LoginFormInitialState'

import { updateFieldErrors } from '../../utils/Form'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_LOGIN_FORM,
    CLEAR_LOGIN_FORM_ERROR,
    CLEAR_LOGIN_FORM_FIELD_ERROR,
    CHANGE_LOGIN_FORM_FIELD,
    CHANGE_LOGIN_FORM_FIELDS,
    VALIDATE_LOGIN_FORM
} = ACTION_TYPES

const {
    INVALID_LOGIN,
    INVALID_PASSWORD,
    INVALID_COMPANY_ID,
} = SERVER_ERROR_CODES

const ERRORS_FIELDS = {
    [INVALID_LOGIN]: 'login',
    [INVALID_PASSWORD]: 'password',
    [INVALID_COMPANY_ID]: 'companyId'
}

const initialState = new LoginFormInitialState()

export default function loginFormReducer (state = initialState, action) {
    if (!(state instanceof LoginFormInitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_LOGIN_FORM:
            return state.clear()

        case CLEAR_LOGIN_FORM_ERROR:
            return state.removeIn(['error'])

        case CLEAR_LOGIN_FORM_FIELD_ERROR: {
            const field = action.payload
            return state.setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorText'], '')
        }

        case CHANGE_LOGIN_FORM_FIELD: {
            const {field, value} = action.payload

            return state
                .setIn(['fields', field], value)
                .setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorText'], '')
        }

        case CHANGE_LOGIN_FORM_FIELDS:
            return state.mergeDeep({ fields: action.payload })

        case VALIDATE_LOGIN_FORM: {
            const path = ['fields']
            const { success, errors } = action.payload

            return state
                .setIn(['isValid'], success)
                .setIn(path, updateFieldErrors(state.getIn(path), errors))
        }
    }

    return state
}
