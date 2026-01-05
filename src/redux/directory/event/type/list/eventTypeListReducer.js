import InitialState from './EventTypeListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_EVENT_TYPE_LIST,
    LOAD_EVENT_TYPE_LIST_SUCCESS,
    LOAD_EVENT_TYPE_LIST_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function eventTypeListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_EVENT_TYPE_LIST:
            return state
                .setIn(['dataSouce','data'], [])
                .removeIn(['error'])

        case LOAD_EVENT_TYPE_LIST_SUCCESS: {
            const { data } = action.payload

            return state
                .setIn(['dataSource','data'], data)
        }

        case LOAD_EVENT_TYPE_LIST_FAILURE:
            return state
                .setIn(['error'], action.payload)
    }

    return state
}
