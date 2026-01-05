import InitialState from './EventNotificationInitialState'

import listReducer from './list/eventNotificationListReducer'

const initialState = new InitialState()

export default function eventNotificationReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}