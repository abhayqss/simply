import InitialState from './NoteEncounterInitialState'

import noteEncounterTypeReducer from './type/noteEncounterTypeReducer'

const initialState = new InitialState()

export default function noteEncounterReducer(state = initialState, action) {
    let nextState = state

    const type = noteEncounterTypeReducer(state.type, action)
    if (type !== state.type) nextState = nextState.setIn(['type'], type)

    return nextState
}