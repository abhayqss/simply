import InitialState from './PriorityListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_PRIORITY_LIST,
    LOAD_PRIORITY_LIST_SUCCESS,
    LOAD_PRIORITY_LIST_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function domainListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_PRIORITY_LIST:
            return state
                .setIn(['dataSource', 'data'], [])
                .removeIn(['error'])

        case LOAD_PRIORITY_LIST_SUCCESS: {
            const { data } = action.payload

            const existingData = state.getIn(['dataSource', 'data'])

            return state
                .setIn(['shouldReload'], !existingData)
                .setIn(['dataSource', 'data'], data)
        }

        case LOAD_PRIORITY_LIST_FAILURE:
            return state
                .setIn(['error'], action.payload)
    }

    return state
}
