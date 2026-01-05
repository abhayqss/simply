import InitialState from './CareTeamChannelInitialState'

import listReducer from './list/careTeamChannelListReducer'

const initialState = new InitialState()

export default function careTeamChannelReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
