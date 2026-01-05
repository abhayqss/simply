import InitialState from './MaritalInitialState'

import statusReducer from './status/maritalStatusReducer'

const initialState = new InitialState()

export default function maritalReducer(state = initialState, action) {
    let nextState = state

    const status = statusReducer(state.status, action)
    if (status !== state.status) nextState = nextState.setIn(['status'], status)

    return nextState
}