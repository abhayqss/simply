import InitialState from './ReportTypeInitialState'

import listReducer from './list/reportTypeListReducer'

const initialState = new InitialState()

export default function reportGroupReducer (state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
