import InitialState from './NoteAdmittanceInitialState'

import noteAdmittanceListReducer from './list/noteAdmittanceListReducer'

const initialState = new InitialState()

export default function noteAdmittanceReducer(state = initialState, action) {
    let nextState = state

    const list = noteAdmittanceListReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}