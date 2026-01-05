import InitialState from './ReportGroupInitialState'

import listReducer from './list/reportGroupListReducer'

const initialState = new InitialState()

export default function reportGroupReducer (state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
