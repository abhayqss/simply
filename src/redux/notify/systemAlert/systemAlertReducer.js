import InitialState from './SystemAlertInitialState'

import systemAlertListReducer from './list/systemAlertListReducer'
import systemAlertCountReducer from './count/systemAlertCountReducer'
import systemAlertHistoryReducer from './history/systemAlertHistoryReducer'

const initialState = new InitialState()

export default function systemAlertReducer(state = initialState, action) {
    let nextState = state

    const list = systemAlertListReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const count = systemAlertCountReducer(state.count, action)
    if (count !== state.count) nextState = nextState.setIn(['count'], count)

    const history = systemAlertHistoryReducer(state.history, action)
    if (history !== state.history) nextState = nextState.setIn(['history'], history)

    return nextState
}