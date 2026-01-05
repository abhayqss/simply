import InitialState from './ClientBillingDetailsInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CLIENT_BILLING_DETAILS,
    CLEAR_CLIENT_BILLING_DETAILS_ERROR,

    LOAD_CLIENT_BILLING_DETAILS_REQUEST,
    LOAD_CLIENT_BILLING_DETAILS_SUCCESS,
    LOAD_CLIENT_BILLING_DETAILS_FAILURE
} = ACTION_TYPES


const initialState = new InitialState()

export default function clientBillingDetailsReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CLIENT_BILLING_DETAILS:
            return state.clear()

        case CLEAR_CLIENT_BILLING_DETAILS_ERROR:
            return state.removeIn(['error'])

        case LOAD_CLIENT_BILLING_DETAILS_REQUEST:
            return state.setIn(['isFetching'], true)
                        .setIn(['shouldReload'], false)
                        .setIn(['error'], null)

        case LOAD_CLIENT_BILLING_DETAILS_SUCCESS:
            return state.setIn(['isFetching'], false)
                        .setIn(['data'], action.payload)

        case LOAD_CLIENT_BILLING_DETAILS_FAILURE:
            return state.setIn(['isFetching'], false)
                        .setIn(['error'], action.payload)
    }
    return state
}
