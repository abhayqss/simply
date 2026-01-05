import InitialState from './MarketplaceCommunityFilterInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    CLEAR_MARKETPLACE_COMMUNITY_FILTER,
    CHANGE_MARKETPLACE_COMMUNITY_FILTER_FIELD,
} = ACTION_TYPES

const initialState = new InitialState()

export default function marketplaceFilterReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case CLEAR_MARKETPLACE_COMMUNITY_FILTER:
            return state.removeIn(['fields', 'primaryFocusIds'])
                .removeIn(['fields', 'communityTypeIds'])
                .removeIn(['fields', 'serviceIds'])
                .removeIn(['fields', 'insuranceIds'])

        case CHANGE_MARKETPLACE_COMMUNITY_FILTER_FIELD: {
            const { field, value } = action.payload

            return state.setIn(['fields', field], value)
        }
    }
    return state
}
