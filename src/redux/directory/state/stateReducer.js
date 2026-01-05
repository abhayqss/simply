import InitialState from './StateInitialState'

import stateListReducer from './list/stateListReducer'

const initialState = new InitialState()

export default function stateReducer(state = initialState, action) {
    let nextState = state

    const list = stateListReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
