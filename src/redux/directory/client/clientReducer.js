import InitialState from './ClientInitialState'

import statusReducer from './status/clientStatusReducer'

const initialState = new InitialState()

export default function clientStatusReducer (state = initialState, action) {
    let nextState = state

    const status = statusReducer (state.status, action)
    if (status !== state.status) nextState = nextState.setIn(['status'], status)

    return nextState
}
