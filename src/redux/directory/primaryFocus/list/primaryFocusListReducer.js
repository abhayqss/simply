import InitialState from './PrimaryFocusListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_PRIMARY_FOCUS_LIST,
    LOAD_PRIMARY_FOCUS_LIST_REQUEST,
    LOAD_PRIMARY_FOCUS_LIST_SUCCESS,
    LOAD_PRIMARY_FOCUS_LIST_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function primaryFocusListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_PRIMARY_FOCUS_LIST:
            return state
                .removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['dataSource', 'data'], [])

        case LOAD_PRIMARY_FOCUS_LIST_REQUEST:
            return state.setIn(['isFetching'], true)

        case LOAD_PRIMARY_FOCUS_LIST_SUCCESS: {
            const { data } = action.payload

            const existingData = state.getIn(['dataSource', 'data'])

            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], !existingData)
                .setIn(['dataSource', 'data'], data)
        }

        case LOAD_PRIMARY_FOCUS_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
