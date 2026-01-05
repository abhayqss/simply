import InitialState from './languageServiceListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_LANGUAGE_SERVICE_LIST,
    LOAD_LANGUAGE_SERVICE_LIST_SUCCESS,
    LOAD_LANGUAGE_SERVICE_LIST_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function languageServiceListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_LANGUAGE_SERVICE_LIST:
            return state
                .setIn(['dataSource', 'data'], [])
                .removeIn(['error'])

        case LOAD_LANGUAGE_SERVICE_LIST_SUCCESS: {
            const { data } = action.payload

            const existingData = state.getIn(['dataSource', 'data'])

            return state
                .setIn(['shouldReload'], !existingData)
                .setIn(['dataSource', 'data'], data)
        }

        case LOAD_LANGUAGE_SERVICE_LIST_FAILURE:
            return state
                .setIn(['error'], action.payload)
    }

    return state
}
