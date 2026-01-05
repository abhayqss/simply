import ClientInitialState from './ClientEmergencyContactInitialState'

import listReducer from './list/clientEmergencyContactListReducer'

const initialState = new ClientInitialState()

export default function clientEmergencyContactReducer (state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}