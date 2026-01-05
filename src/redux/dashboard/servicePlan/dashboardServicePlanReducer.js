import InitialState from './DashboardServicePlanInitialState'

import countReducer from './count/dashboardServicePlanCountReducer'

const initialState = new InitialState()

export default function dashboardServicePlanReducer(state = initialState, action) {
    let nextState = state

    const count = countReducer(state.count, action)
    if (count !== state.count) nextState = nextState.setIn(['count'], count)

    return nextState
}