import InitialState from './InsuranceNetworkListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_DIRECTORY_INSURANCE_NETWORK_LIST,

    LOAD_DIRECTORY_INSURANCE_NETWORK_LIST_REQUEST,
    LOAD_DIRECTORY_INSURANCE_NETWORK_LIST_SUCCESS,
    LOAD_DIRECTORY_INSURANCE_NETWORK_LIST_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function insuranceNetworkListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_DIRECTORY_INSURANCE_NETWORK_LIST:
            return state
                .setIn(['isFetching'], false)
                .setIn(['dataSource', 'data'], [])
                .setIn(['dataSource', 'totalList'], [])
                .removeIn(['error'])

        case LOAD_DIRECTORY_INSURANCE_NETWORK_LIST_REQUEST:
            return state
                .setIn(['error'], null)
                .setIn(['shouldReload'], false)
                .setIn(['isFetching'], true)

        case LOAD_DIRECTORY_INSURANCE_NETWORK_LIST_SUCCESS: {
            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['dataSource', 'data'], action.payload.data)
        }

        case LOAD_DIRECTORY_INSURANCE_NETWORK_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
