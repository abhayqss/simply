import InitialState from './CommunityInitialState'

import listReducer from './list/communityListReducer'

const initialState = new InitialState()

export default function communityReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}