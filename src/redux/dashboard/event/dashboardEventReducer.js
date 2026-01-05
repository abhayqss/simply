import InitialState from './DashboardEventInitialState'

import listReducer from './list/dashboardEventListReducer'

const initialState = new InitialState()

export default function dashboardEventReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
