import InitialState from './MarketplaceInitialState'
import marketplaceCommunityReducer from './community/marketplaceCommunityReducer'

const initialState = new InitialState()

export default function marketplaceReducer(state = initialState, action) {
    let nextState = state

    const community = marketplaceCommunityReducer(state.community, action)
    if (community !== state.community) nextState = nextState.setIn(['community'], community)

    return nextState
}