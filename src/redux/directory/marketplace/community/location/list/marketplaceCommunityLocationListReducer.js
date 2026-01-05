import InitialState from './MarketplaceCommunityLocationListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    CLEAR_MARKETPLACE_COMMUNITY_LOCATION_LIST_ERROR,

    CLEAR_MARKETPLACE_COMMUNITY_LOCATION_LIST,
    LOAD_MARKETPLACE_COMMUNITY_LOCATION_LIST_SUCCESS,
    LOAD_MARKETPLACE_COMMUNITY_LOCATION_LIST_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function marketplaceCommunityLocationListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case CLEAR_MARKETPLACE_COMMUNITY_LOCATION_LIST:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .setIn(['dataSource', 'data'], [])

        case CLEAR_MARKETPLACE_COMMUNITY_LOCATION_LIST_ERROR:
            return state.removeIn(['error'])

        case LOAD_MARKETPLACE_COMMUNITY_LOCATION_LIST_SUCCESS:
            return state.setIn(['dataSource', 'data'], action.payload.data)

        case LOAD_MARKETPLACE_COMMUNITY_LOCATION_LIST_FAILURE:
            return state.setIn(['error'], action.payload)
    }

    return state
}
