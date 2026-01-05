import InitialState from './EventInitialState'

import eventTypeReducer from './type/eventTypeReducer'

const initialState = new InitialState()

export default function eventReducer(state = initialState, action) {
    let nextState = state

    const type = eventTypeReducer(state.type, action)
    if (type !== state.type) nextState = nextState.setIn(['type'], type)

    return nextState
}