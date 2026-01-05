import { ACTION_TYPES } from 'lib/Constants'

import InitialState from './MarketplaceCommunityDetailsInitialState'

const {
    CLEAR_MARKETPLACE_COMMUNITY_DETAILS,
    CLEAR_MARKETPLACE_COMMUNITY_DETAILS_ERROR,

    LOAD_MARKETPLACE_COMMUNITY_DETAILS_REQUEST,
    LOAD_MARKETPLACE_COMMUNITY_DETAILS_SUCCESS,
    LOAD_MARKETPLACE_COMMUNITY_DETAILS_FAILURE
} = ACTION_TYPES


const initialState = new InitialState()

export default function marketplaceCommunityDetailsReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case CLEAR_MARKETPLACE_COMMUNITY_DETAILS:
            return state.removeIn(['data'])
                .removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)

        case CLEAR_MARKETPLACE_COMMUNITY_DETAILS_ERROR:
            return state.removeIn(['error'])

        case LOAD_MARKETPLACE_COMMUNITY_DETAILS_REQUEST:
            return state.setIn(['isFetching'], true)
                .setIn(['shouldReload'], false)
                .setIn(['error'], null)

        case LOAD_MARKETPLACE_COMMUNITY_DETAILS_SUCCESS:
            return state.setIn(['isFetching'], false)
                .setIn(['data'], action.payload)

        case LOAD_MARKETPLACE_COMMUNITY_DETAILS_FAILURE:
            return state.setIn(['isFetching'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
