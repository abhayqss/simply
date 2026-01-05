import ClientInitialState from './ClientEmergencyInitialState'

import contactReducer from './contact/clientEmergencyContactReducer'

const initialState = new ClientInitialState()

export default function clientEmergencyReducer (state = initialState, action) {
    let nextState = state

    const contact = contactReducer(state.contact, action)
    if (contact !== state.contact) nextState = nextState.setIn(['contact'], contact)

    return nextState
}