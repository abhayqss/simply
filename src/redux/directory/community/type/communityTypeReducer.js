import InitialState from './CommunityTypeInitialState'

import communityTypeListReducer from './list/communityTypeListReducer'

const initialState = new InitialState()

export default function communityType(state = initialState, action) {
    let nextState = state

    const list = communityTypeListReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
