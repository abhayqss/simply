import InitialState from './AgeGroupListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_AGE_GROUP_LIST,
    LOAD_AGE_GROUP_LIST_SUCCESS,
    LOAD_AGE_GROUP_LIST_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function ageGroupListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_AGE_GROUP_LIST:
            return state
                .setIn(['dataSource', 'data'], [])
                .removeIn(['error'])

        case LOAD_AGE_GROUP_LIST_SUCCESS: {
            const { data } = action.payload
            const existingData = state.getIn(['dataSource', 'data'])

            return state
                .setIn(['shouldReload'], !existingData)
                .setIn(['dataSource', 'data'], data)
        }

        case LOAD_AGE_GROUP_LIST_FAILURE:
            return state
                .setIn(['error'], action.payload)
    }

    return state
}
