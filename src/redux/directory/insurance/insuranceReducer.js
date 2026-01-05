import InitialState from './InsuranceInitialState'

import networkReducer from './network/insuranceNetworkReducer'
import paymentReducer from './payment/insurancePaymentReducer'

const initialState = new InitialState()

export default function insuranceReducer(state = initialState, action) {
    let nextState = state

    const network = networkReducer(state.network, action)
    if (network !== state.network) nextState = nextState.setIn(['network'], network)

    const payment = paymentReducer(state.payment, action)
    if (payment !== state.payment) nextState = nextState.setIn(['payment'], payment)

    return nextState
}


