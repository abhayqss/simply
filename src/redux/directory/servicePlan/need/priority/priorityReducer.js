import InitialState from './PriorityInitialState'

import priorityListReducer from './list/priorityListReducer'

const initialState = new InitialState()

export default function priorityReducer(state = initialState, action) {
    let nextState = state

    const list = priorityListReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
