import InitialState from './NotifyInitialState'

import activeAlertReducer from './activeAlert/activeAlertReducer'
import systemAlertReducer from './systemAlert/systemAlertReducer'

const initialState = new InitialState()

export default function notifyReducer(state = initialState, action) {
    let nextState = state

    const activeAlert = activeAlertReducer(state.activeAlert, action)
    if (activeAlert !== state.activeAlert) nextState = nextState.setIn(['activeAlert'], activeAlert)

    const systemAlert = systemAlertReducer(state.systemAlert, action)
    if (systemAlert !== state.systemAlert) nextState = nextState.setIn(['systemAlert'], systemAlert)

    return nextState
}