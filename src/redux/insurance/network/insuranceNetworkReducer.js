import InitialState from './InsuranceNetworkInitialState'

import listReducer from './list/insuranceNetworkListReducer'

const initialState = new InitialState()

export default function insuranceNetworkReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}


