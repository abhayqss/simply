import InitialState from './InsuranceInitialState'

import networkReducer from './network/insuranceNetworkReducer'

const initialState = new InitialState()

export default function insuranceReducer(state = initialState, action) {
    let nextState = state

    const network = networkReducer(state.network, action)
    if (network !== state.network) nextState = nextState.setIn(['network'], network)

    return nextState
}


