import InitialState from './ClientStatusInitialState'

import listReducer from './list/clientStatusListReducer'

const initialState = new InitialState()

export default function clientStatusReducer (state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
