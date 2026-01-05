import InitialState from './ServiceInitialState'

import listReducer from './list/serviceListReducer'

const initialState = new InitialState()

export default function serviceReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
