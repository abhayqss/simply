import InitialState from './NoteTypeInitialState'

import noteTypeListReducer from './list/noteTypeListReducer'

const initialState = new InitialState()

export default function noteTypeReducer(state = initialState, action) {
    let nextState = state

    const list = noteTypeListReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}