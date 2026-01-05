import InitialState from './ActiveAlertInitialState'

import activeAlertListReducer from './list/activeAlertListReducer'
import activeAlertCountReducer from './count/activeAlertCountReducer'
import activeAlertHistoryReducer from './history/activeAlertHistoryReducer'

const initialState = new InitialState()

export default function activeAlertReducer(state = initialState, action) {
    let nextState = state

    const list = activeAlertListReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const count = activeAlertCountReducer(state.count, action)
    if (count !== state.count) nextState = nextState.setIn(['count'], count)

    const history = activeAlertHistoryReducer(state.history, action)
    if (history !== state.history) nextState = nextState.setIn(['history'], history)

    return nextState
}