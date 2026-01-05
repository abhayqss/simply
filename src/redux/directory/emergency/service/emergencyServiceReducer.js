import InitialState from './EmergencyServiceInitialState'

import listReducer from './list/emergencyServiceListReducer'

const initialState = new InitialState()

export default function ancillaryServiceReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}


