import InitialState from './CommunityTypeListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_COMMUNITY_TYPE_LIST,
    LOAD_COMMUNITY_TYPE_LIST_REQUEST,
    LOAD_COMMUNITY_TYPE_LIST_SUCCESS,
    LOAD_COMMUNITY_TYPE_LIST_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function communityTypeListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_COMMUNITY_TYPE_LIST:
            return state
                .removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['dataSource','data'], [])

        case LOAD_COMMUNITY_TYPE_LIST_REQUEST:
            return state.setIn(['isFetching'], true)

        case LOAD_COMMUNITY_TYPE_LIST_SUCCESS: {
            const { data } = action.payload

            return state
                .setIn(['isFetching'], false)
                .setIn(['dataSource','data'], data)
        }

        case LOAD_COMMUNITY_TYPE_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
