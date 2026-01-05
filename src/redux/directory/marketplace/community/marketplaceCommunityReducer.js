import InitialState from './MarketplaceCommunityInitialState'

import locationReducer from './location/marketplaceCommunityLocationReducer'

const initialState = new InitialState()

export default function marketplaceCommunityReducer(state = initialState, action) {
    let nextState = state

    const location = locationReducer(state.location, action)
    if (location !== state.location) nextState = nextState.setIn(['location'], location)

    return nextState
}