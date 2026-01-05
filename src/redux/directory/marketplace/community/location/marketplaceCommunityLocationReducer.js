import InitialState from './MarketplaceCommunityLocationInitialState'

import listReducer from './list/marketplaceCommunityLocationListReducer'

const initialState = new InitialState()

export default function marketplaceCommunityLocationReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}