import InitialState from './CaseloadInitialState'

import listReducer from './list/caseloadListReducer'
import historyReducer from './history/caseloadHistoryReducer'

const initialState = new InitialState()

export default function caseloadReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const history = historyReducer(state.history, action)
    if (history !== state.history) nextState = nextState.setIn(['history'], history)

    return nextState
}
