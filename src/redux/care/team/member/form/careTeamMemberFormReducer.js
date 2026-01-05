import Immutable from 'immutable'

import { ACTION_TYPES } from 'lib/Constants'

import { updateFieldErrors } from '../../../../utils/Form'

import InitialState from './CareTeamMemberFormInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CARE_TEAM_MEMBER_FORM,
    CLEAR_CARE_TEAM_MEMBER_FORM_ERROR,
    CLEAR_CARE_TEAM_MEMBER_FORM_FIELD_ERROR,

    CHANGE_CARE_TEAM_MEMBER_FORM_FIELD,
    CHANGE_CARE_TEAM_MEMBER_FORM_FIELDS,

    VALIDATE_CARE_TEAM_MEMBER_FORM,

    SAVE_CARE_TEAM_MEMBER_REQUEST,
    SAVE_CARE_TEAM_MEMBER_SUCCESS,
    SAVE_CARE_TEAM_MEMBER_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function memberFormReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CARE_TEAM_MEMBER_FORM:
            return state.clear()

        case CLEAR_CARE_TEAM_MEMBER_FORM_ERROR:
            return state.removeIn(['error'])

        case CLEAR_CARE_TEAM_MEMBER_FORM_FIELD_ERROR: {
            const field = action.payload
            return state.setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorMsg'], '')
        }

        case CHANGE_CARE_TEAM_MEMBER_FORM_FIELD: {
            const { field, value } = action.payload
            return state.setIn(['fields', field], value)
        }

        case CHANGE_CARE_TEAM_MEMBER_FORM_FIELDS: {
            let changes = action.payload

            return state.mergeDeep(Immutable.fromJS({
                fields: changes
            }))
        }

        case VALIDATE_CARE_TEAM_MEMBER_FORM: {
            const path = ['fields']
            const { success, errors } = action.payload

            return state
                .setIn(['isValid'], success)
                .setIn(path, updateFieldErrors(state.getIn(path), errors))
        }

        case SAVE_CARE_TEAM_MEMBER_REQUEST: {
            return state.setIn(['isFetching'], true)
        }

        case SAVE_CARE_TEAM_MEMBER_SUCCESS: {
            return state.setIn(['isFetching'], false)
        }

        case SAVE_CARE_TEAM_MEMBER_FAILURE: {
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
        }
    }

    return state
}
