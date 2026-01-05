import Immutable from 'immutable'

import { ACTION_TYPES } from 'lib/Constants'

import { updateFieldErrors } from '../../../utils/Form'

import Form from './FormInitialState'
import InitialState from './CaseloadFormInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CASELOAD_FORM,
    CLEAR_CASELOAD_FORM_ERROR,
    CLEAR_CASELOAD_FORM_FIELD_ERROR,

    ADD_CASELOAD_FORM,
    REMOVE_CASELOAD_FORM,
    CHANGE_CASELOAD_FORM_FIELD,
    CHANGE_CASELOAD_FORM_FIELDS,
    UPDATE_CASELOAD_FORM_CLIENT_LIST,

    CLEAR_CASELOAD_FORM_FILTER,
    CHANGE_CASELOAD_FORM_FILTER,

    VALIDATE_CASELOAD_FORM,

    SAVE_CASELOAD_REQUEST,
    SAVE_CASELOAD_SUCCESS,
    SAVE_CASELOAD_FAILURE
} = ACTION_TYPES

const initialState = InitialState()

export default function caseloadFormReducer (state = initialState, action) {
    if (!(typeof state === typeof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CASELOAD_FORM:
            return state.clear()

        case CLEAR_CASELOAD_FORM_ERROR:
            return state.removeIn(['error'])

        case CLEAR_CASELOAD_FORM_FIELD_ERROR: {
            const field = action.payload
            return state.setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorMsg'], '')
        }

        case ADD_CASELOAD_FORM: {
            const form = new Form({
                index: state.size
            })

            return state.push(form)
        }

        case REMOVE_CASELOAD_FORM: {
            const index = action.payload
            return state.removeIn([index])
        }

        case CHANGE_CASELOAD_FORM_FIELD: {
            const { index, field, value } = action.payload
            return state.setIn([index, 'fields', field], value)
        }

        case CHANGE_CASELOAD_FORM_FIELDS: {
            let changes = action.payload

            return state.mergeDeep(Immutable.fromJS({
                fields: changes
            }))
        }

        case UPDATE_CASELOAD_FORM_CLIENT_LIST: {
            let { index, data } = action.payload

            return state
                .setIn([index, 'list', 'dataSource', 'data'], data)
        }

        case CLEAR_CASELOAD_FORM_FILTER:
            const { index } = action.payload

            return state.removeIn([index, 'list', 'dataSource', 'filter', 'name'])

        case CHANGE_CASELOAD_FORM_FILTER: {
            const {index, changes, shouldReload = true } = action.payload

            if (changes) {
                return state
                    .mergeIn([index, 'list', 'dataSource', 'filter'], Immutable.fromJS(changes))
                    .setIn([index, 'list', 'shouldReload'], shouldReload)
            }

            break
        }

        case VALIDATE_CASELOAD_FORM: {
            const { index, success, errors } = action.payload

            const path = [index, 'fields']

            return state
                .setIn([index, 'isValid'], success)
                .setIn(path, updateFieldErrors(state.getIn(path), errors))
        }

        case SAVE_CASELOAD_REQUEST: {
            return state.setIn(['isFetching'], true)
        }

        case SAVE_CASELOAD_SUCCESS: {
            return state.setIn(['isFetching'], false)
        }

        case SAVE_CASELOAD_FAILURE: {
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
        }
    }

    return state
}
