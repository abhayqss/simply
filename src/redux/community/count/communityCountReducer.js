import { ACTION_TYPES} from 'lib/Constants'

import InitialState from './CommunityCountInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_COMMUNITY_COUNT,
    CLEAR_COMMUNITY_COUNT_ERROR,
    LOAD_COMMUNITY_COUNT_REQUEST,
    LOAD_COMMUNITY_COUNT_SUCCESS,
    LOAD_COMMUNITY_COUNT_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function communityCountReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_COMMUNITY_COUNT:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .removeIn(['value'])

        case CLEAR_COMMUNITY_COUNT_ERROR:
            return state.removeIn(['error'])

        case LOAD_COMMUNITY_COUNT_REQUEST: {
            return state.setIn(['error'], null)
                .setIn(['shouldReload'], false)
        }

        case LOAD_COMMUNITY_COUNT_SUCCESS:
            return state.removeIn(['error'])
                .setIn(['value'], action.payload)

        case LOAD_COMMUNITY_COUNT_FAILURE:
            return state.setIn(['error'], action.payload)
                .setIn(['shouldReload'], false)
    }

    return state
}