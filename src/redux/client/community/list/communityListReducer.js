import InitialState from './CommunityListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CLIENT_COMMUNITY_LIST,
    LOAD_CLIENT_COMMUNITY_LIST_SUCCESS,
    LOAD_CLIENT_COMMUNITY_LIST_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function communityListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CLIENT_COMMUNITY_LIST:
            return state
                .setIn(['dataSource', 'data'], [])
                .removeIn(['error'])

        case LOAD_CLIENT_COMMUNITY_LIST_SUCCESS:
            return state
                .setIn(['isFetching'], false)
                .setIn(['dataSource', 'data'], action.payload)


        case LOAD_CLIENT_COMMUNITY_LIST_FAILURE:
            return state
                .setIn(['error'], action.payload)
    }

    return state
}