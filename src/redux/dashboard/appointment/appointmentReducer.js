import InitialState from './AppointmentInitialState'

import listReducer from './list/appointmentListReducer'
import historyReducer from './history/appointmentHistoryReducer'

const initialState = new InitialState()

export default function appointmentReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const history = historyReducer(state.history, action)
    if (history !== state.history) nextState = nextState.setIn(['history'], history)

    return nextState
}
