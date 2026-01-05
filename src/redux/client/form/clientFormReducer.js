import InitialState from './ClientFormInitialState'

import {
    clearFieldErrors,
    updateFieldErrors
} from '../../utils/Form'

import { all, allAreFalse, anyIsFalse, allAreTrue, interpolate } from 'lib/utils/Utils'

import { ACTION_TYPES, ERROR_CODES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CLIENT_FORM,
    CLEAR_CLIENT_FORM_ERROR,
    CLEAR_CLIENT_FORM_FIELD_ERROR,

    CHANGE_CLIENT_FORM_FIELD,
    CHANGE_CLIENT_FORM_ADDRESS_FIELD,

    CHANGE_CLIENT_FORM_FIELDS,

    VALIDATE_CLIENT_FORM,

    VALIDATE_CLIENT_DATA_UNIQ_IN_COMMUNITY_SUCCESS,
    VALIDATE_CLIENT_DATA_UNIQ_IN_ORGANIZATION_SUCCESS,

    SAVE_CLIENT_REQUEST,
    SAVE_CLIENT_SUCCESS,
    SAVE_CLIENT_FAILURE
} = ACTION_TYPES

const { INVALID_SSN, INVALID_EMAIL } = ERROR_CODES

const NON_UNIQ = '$0 must be unique within the community.'
const NON_UNIQ_SSN = 'The client with the SSN entered already exists in the community.'
const NON_UNIQ_EMAIL = 'The email must be unique within the organization.'

const initialState = new InitialState()

export default function clientFormReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CLIENT_FORM:
            return state.clear()

        case CLEAR_CLIENT_FORM_ERROR:
            return state.removeIn(['error'])

        case CLEAR_CLIENT_FORM_FIELD_ERROR: {
            const field = action.payload
            return state.setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorMsg'], '')
        }

        case CHANGE_CLIENT_FORM_FIELD: {
            const { name, value } = action.payload
            return state.setIn(['fields', name], value)
        }

        case CHANGE_CLIENT_FORM_ADDRESS_FIELD: {
            const { name, value } = action.payload
            return state.setIn(['fields', 'address', name], value)
        }

        case CHANGE_CLIENT_FORM_FIELDS:
            return state.mergeDeep({ fields: action.payload })

        case VALIDATE_CLIENT_FORM: {
            const { success, errors = {} } = action.payload

            let nextState = state
                .setIn(['isValid'], success)
                .setIn(['isValidated'], true)
                .setIn(['fields'], updateFieldErrors(state.fields, errors))
                .removeIn(['fields', 'ssnErrorCode'])
                .removeIn(['fields', 'emailErrorCode'])

            if (errors.ssn) nextState = (
                nextState.setIn(['fields', 'ssnErrorCode'], INVALID_SSN)
            )

            if (errors.email) nextState = (
                nextState.setIn(['fields', 'emailErrorCode'], INVALID_EMAIL)
            )

            return nextState
        }

        case VALIDATE_CLIENT_DATA_UNIQ_IN_ORGANIZATION_SUCCESS: {
            const {
                email
            } = action.payload

            const {
                ssnHasError,
                memberNumberHasError,
                medicareNumberHasError,
                medicaidNumberHasError
            } = state.fields

            const isValid = email && allAreFalse(
                ssnHasError,
                memberNumberHasError,
                medicareNumberHasError,
                medicaidNumberHasError
            ) && (
                state.isValidated ? state.isValid : true
            )

            return state
                .setIn(['isValid'], isValid)
                .mergeIn(['fields'], {
                        emailHasError: !email,
                        emailErrorText: !email ? NON_UNIQ_EMAIL : null
                    }
                )
        }

        case VALIDATE_CLIENT_DATA_UNIQ_IN_COMMUNITY_SUCCESS: {
            const {
                ssn,
                memberNumber,
                medicareNumber,
                medicaidNumber
            } = action.payload

            const {
                emailHasError
            } = state.fields

            const isValid = !emailHasError && all(
                ssn,
                memberNumber,
                medicareNumber,
                medicaidNumber
            ).in(true, null) && (
                state.isValidated ? state.isValid : true
            )

            const errorText = (s, v) => interpolate(s, v)

            return state
                .setIn(['isValid'], isValid)
                .mergeIn(['fields'], {
                        ...{
                            ssnHasError: ssn === false,
                            ssnErrorText: ssn === false ? NON_UNIQ_SSN : null
                        },
                        ...{
                            memberNumberHasError: memberNumber === false,
                            memberNumberErrorText: memberNumber === false ? errorText(
                                NON_UNIQ, 'Member Number'
                            ) : null
                        },
                        ...{
                            medicareNumberHasError: medicareNumber === false,
                            medicareNumberErrorText: medicareNumber === false ? errorText(
                                NON_UNIQ, 'Medicare Number'
                            ) : null
                        },
                        ...{
                            medicaidNumberHasError: medicaidNumber === false,
                            medicaidNumberErrorText: medicaidNumber === false ? errorText(
                                NON_UNIQ, 'Medicaid Number'
                            ) : null
                        }
                    }
                )
        }

        case SAVE_CLIENT_REQUEST: {
            return state.setIn(['isFetching'], true)
        }

        case SAVE_CLIENT_SUCCESS: {
            return state.setIn(['isFetching'], false)
        }

        case SAVE_CLIENT_FAILURE: {
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
        }
    }

    return state
}
