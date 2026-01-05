import InitialState from './EmergencyInitialState'

import emergencyListReducer from './list/emergencyListReducer'

const initialState = new InitialState()

export default function emergencyReducer(state = initialState, action) {
    let nextState = state

    const list = emergencyListReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
