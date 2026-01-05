import Immutable from 'immutable'

import InitialState from './InsuranceNetworkListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_INSURANCE_NETWORK_LIST,
    CLEAR_INSURANCE_NETWORK_LIST_FILTER,
    CHANGE_INSURANCE_NETWORK_LIST_FILTER,
    CHANGE_INSURANCE_NETWORK_LIST_FILTER_FIELD,

    LOAD_INSURANCE_NETWORK_LIST_REQUEST,
    LOAD_INSURANCE_NETWORK_LIST_SUCCESS,
    LOAD_INSURANCE_NETWORK_LIST_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function insuranceNetworkListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_INSURANCE_NETWORK_LIST:
            return state
                .setIn(['isFetching'], false)
                .setIn(['dataSource', 'data'], [])
                .setIn(['dataSource', 'totalList'], [])
                .removeIn(['error'])

        case CLEAR_INSURANCE_NETWORK_LIST_FILTER:
            return state.setIn(
                ['dataSource', 'filter'],
                state.getIn(['dataSource', 'filter']).clear()
            )

        case CHANGE_INSURANCE_NETWORK_LIST_FILTER: {
            const { changes, shouldReload = true } = action.payload

            return state
                .mergeIn(['dataSource', 'filter'], Immutable.fromJS(changes))
                .setIn(['shouldReload'], shouldReload)
        }

        case CHANGE_INSURANCE_NETWORK_LIST_FILTER_FIELD: {
            const { name, value, shouldReload = true } = action.payload

            return state
                .setIn(['dataSource', 'filter', name], value)
                .setIn(['shouldReload'], shouldReload)
        }

        case LOAD_INSURANCE_NETWORK_LIST_REQUEST:
            return state
                .setIn(['error'], null)
                .setIn(['shouldReload'], false)
                .setIn(['isFetching'], true)

        case LOAD_INSURANCE_NETWORK_LIST_SUCCESS: {
            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['dataSource', 'data'], action.payload.data)
        }

        case LOAD_INSURANCE_NETWORK_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
