import InitialState from './ClientStatusListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CLIENT_STATUS_LIST,
    LOAD_CLIENT_STATUS_LIST_REQUEST,
    LOAD_CLIENT_STATUS_LIST_SUCCESS,
    LOAD_CLIENT_STATUS_LIST_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function communityListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CLIENT_STATUS_LIST:
            return state.clear()

        case LOAD_CLIENT_STATUS_LIST_REQUEST:
            return state.setIn(['isFetching'], true)

        case LOAD_CLIENT_STATUS_LIST_SUCCESS: {
            const { data } = action.payload

            return state
                .setIn(['isFetching'], false)
                .setIn(['dataSource','data'], data)
        }

        case LOAD_CLIENT_STATUS_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
