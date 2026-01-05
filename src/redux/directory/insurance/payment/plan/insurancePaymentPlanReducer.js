import InitialState from './InsurancePaymentPlanInitialState'

import listReducer from './list/insurancePaymentPlanListReducer'

const initialState = new InitialState()

export default function insuranceNetworkReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}


