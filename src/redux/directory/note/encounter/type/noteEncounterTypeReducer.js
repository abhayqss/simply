import InitialState from './NoteEncounterTypeInitialState'

import noteEncounterTypeListReducer from './list/noteEncounterTypeListReducer'

const initialState = new InitialState()

export default function noteEncounterTypeReducer(state = initialState, action) {
    let nextState = state

    const list = noteEncounterTypeListReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}