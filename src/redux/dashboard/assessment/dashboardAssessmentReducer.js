import InitialState from './DashboardAssessmentInitialState'

import countReducer from './count/dashboardAssessmentCountReducer'

const initialState = new InitialState()

export default function dashboardAssessmentReducer(state = initialState, action) {
    let nextState = state

    const count = countReducer(state.count, action)
    if (count !== state.count) nextState = nextState.setIn(['count'], count)

    return nextState
}