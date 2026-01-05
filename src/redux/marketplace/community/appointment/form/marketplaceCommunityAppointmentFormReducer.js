import Immutable from 'immutable'

import { ACTION_TYPES } from 'lib/Constants'

import { updateFieldErrors } from '../../../../utils/Form'

import InitialState from './MarketplaceCommunityAppointmentFormInitialState'

const {
    CLEAR_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM,
    CLEAR_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM_ERROR,
    CLEAR_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM_FIELD_ERROR,

    CHANGE_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM_FIELD,
    CHANGE_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM_FIELDS,

    VALIDATE_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM,

    SAVE_MARKETPLACE_COMMUNITY_APPOINTMENT_REQUEST,
    SAVE_MARKETPLACE_COMMUNITY_APPOINTMENT_SUCCESS,
    SAVE_MARKETPLACE_COMMUNITY_APPOINTMENT_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function marketplaceCommunityAppointmentFormReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case CLEAR_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM:
            return state.clear()

        case CLEAR_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM_ERROR:
            return state.removeIn(['error'])

        case CLEAR_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM_FIELD_ERROR: {
            const field = action.payload
            return state.setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorMsg'], '')
        }

        case CHANGE_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM_FIELD: {
            const { field, value } = action.payload
            return state.setIn(['fields', field], value)
        }

        case CHANGE_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM_FIELDS: {
            let changes = action.payload

            return state.mergeDeep(Immutable.fromJS({
                fields: changes
            }))
        }

        case VALIDATE_MARKETPLACE_COMMUNITY_APPOINTMENT_FORM: {
            const path = ['fields']
            const { success, errors } = action.payload

            return state
                .setIn(['isValid'], success)
                .setIn(path, updateFieldErrors(state.getIn(path), errors))
        }

        case SAVE_MARKETPLACE_COMMUNITY_APPOINTMENT_REQUEST: {
            return state.setIn(['isFetching'], true)
        }

        case SAVE_MARKETPLACE_COMMUNITY_APPOINTMENT_SUCCESS: {
            return state.setIn(['isFetching'], false)
        }

        case SAVE_MARKETPLACE_COMMUNITY_APPOINTMENT_FAILURE: {
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
        }
    }

    return state
}
