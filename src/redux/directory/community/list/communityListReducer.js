import InitialState from './CommunityListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_DIRECTORY_COMMUNITY_LIST,
    LOAD_DIRECTORY_COMMUNITY_LIST_SUCCESS,
    LOAD_DIRECTORY_COMMUNITY_LIST_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function communityListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_DIRECTORY_COMMUNITY_LIST:
            return state.clear()

        case LOAD_DIRECTORY_COMMUNITY_LIST_SUCCESS: {
            const { data } = action.payload

            const existingData = state.getIn(['dataSource', 'data'])

            return state
                .setIn(['shouldReload'], !existingData)
                .setIn(['dataSource', 'data'], data)
        }

        case LOAD_DIRECTORY_COMMUNITY_LIST_FAILURE:
            return state.setIn(['error'], action.payload)
    }

    return state
}
