import InitialState from './ComplexityInitialState'

import complexityRulesReducer from './rules/complexityRulesReducer'

const initialState = new InitialState()

export default function complexityReducer(state = initialState, action) {
    let nextState = state

    const rules = complexityRulesReducer(state.rules, action)
    if (rules !== state.rules) nextState = nextState.setIn(['rules'], rules)

    return nextState
}