import InitialState from './ContactInitialState'

import statusReducer from './status/ContactStatusReducer'

const initialState = new InitialState()

export default function contactReducer(state = initialState, action) {
    let nextState = state

    const status = statusReducer(state.status, action)
    if (status !== state.status) nextState = nextState.setIn(['status'], status)

    return nextState
}
