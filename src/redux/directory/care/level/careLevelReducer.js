import InitialState from './CareLevelInitialState'

import listReducer from './list/careLevelListReducer'

const initialState = new InitialState()

export default function careLevelReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
