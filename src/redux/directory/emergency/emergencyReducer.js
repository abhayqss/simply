import InitialState from './EmergencyInitialState'

import serviceReducer from './service/emergencyServiceReducer'

const initialState = new InitialState()

export default function ancillaryReducer(state = initialState, action) {
    let nextState = state

    const service = serviceReducer(state.service, action)
    if (service !== state.service) nextState = nextState.setIn(['service'], service)

    return nextState
}


