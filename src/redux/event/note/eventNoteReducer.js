import InitialState from './EventNoteInitialState'

import listReducer from './list/eventNoteListReducer'
import composedReducer from './composed/eventNoteComposedReducer'

const initialState = new InitialState()

export default function eventNoteReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const composed = composedReducer(state.composed, action)
    if (composed !== state.composed) nextState = nextState.setIn(['composed'], composed)

    return nextState
}