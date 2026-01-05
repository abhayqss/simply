import InitialState from './InsurancePaymentInitialState'

import planReducer from './plan/insurancePaymentPlanReducer'

const initialState = new InitialState()

export default function insurancePaymentPlanReducer(state = initialState, action) {
    let nextState = state

    const plan = planReducer(state.plan, action)
    if (plan !== state.plan) nextState = nextState.setIn(['plan'], plan)

    return nextState
}


