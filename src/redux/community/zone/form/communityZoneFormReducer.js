import Immutable from 'immutable'

import { ACTION_TYPES } from 'lib/Constants'

import { updateFieldErrors } from '../../../utils/Form'

import InitialState from './CommunityZoneFormInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_COMMUNITY_ZONE_FORM,
    CLEAR_COMMUNITY_ZONE_FORM_ERROR,
    CLEAR_COMMUNITY_ZONE_FORM_FIELD_ERROR,

    CHANGE_COMMUNITY_ZONE_FORM_TAB,

    CHANGE_COMMUNITY_ZONE_FORM_FIELD,
    CHANGE_COMMUNITY_ZONE_FORM_FIELDS,

    VALIDATE_COMMUNITY_ZONE_FORM,
    SAVE_COMMUNITY_ZONE_REQUEST,
    SAVE_COMMUNITY_ZONE_SUCCESS,
    SAVE_COMMUNITY_ZONE_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function communityFormReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_COMMUNITY_ZONE_FORM:
            return state.removeIn(['error'])
                .setIn(['isValid'], true)
                .setIn(['fields', 'name'], '')
                .setIn(['fields', 'nameHasError'], '')
                .setIn(['fields', 'nameErrorText'], '')
                .setIn(['fields', 'sound'], '')
                .setIn(['fields', 'soundHasError'], '')
                .setIn(['fields', 'soundErrorText'], '')
                .setIn(['fields', 'soundCount'], '')
                .setIn(['fields', 'soundCountHasError'], '')
                .setIn(['fields', 'soundCountErrorText'], '')
                .setIn(['fields', 'soundInterval'], '')
                .setIn(['fields', 'soundIntervalHasError'], '')
                .setIn(['fields', 'soundIntervalErrorText'], '')

        case CLEAR_COMMUNITY_ZONE_FORM_ERROR:
            return state.removeIn(['error'])

        case CLEAR_COMMUNITY_ZONE_FORM_FIELD_ERROR: {
            const field = action.payload
            return state.setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorMsg'], '')
        }

        case CHANGE_COMMUNITY_ZONE_FORM_TAB:
            return state.setIn(['tab'], action.payload)

        case CHANGE_COMMUNITY_ZONE_FORM_FIELD: {
            const { field, value } = action.payload
            return state.setIn(['fields', field], value)
        }

        case CHANGE_COMMUNITY_ZONE_FORM_FIELDS: {
            const fields = action.payload
            let changes = Immutable.fromJS({ fields })
            return state.mergeDeep(changes)
        }

        case VALIDATE_COMMUNITY_ZONE_FORM: {
            return updateFieldErrors(state, action.payload.errors)
        }

        case SAVE_COMMUNITY_ZONE_REQUEST: {
            return state.setIn(['isFetching'], true)
        }

        case SAVE_COMMUNITY_ZONE_SUCCESS: {
            return state.setIn(['isFetching'], false)
        }

        case SAVE_COMMUNITY_ZONE_FAILURE: {
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
        }
    }

    return state
}
