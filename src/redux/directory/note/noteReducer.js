import InitialState from './NoteInitialState'

import noteTypeReducer from './type/noteTypeReducer'
import noteEncounterReducer from './encounter/noteEncounterReducer'
import noteAdmittanceReducer from './admittance/noteAdmittanceReducer'

const initialState = new InitialState()

export default function noteReducer(state = initialState, action) {
    let nextState = state

    const type = noteTypeReducer(state.type, action)
    if (type !== state.type) nextState = nextState.setIn(['type'], type)

    const encounter = noteEncounterReducer(state.encounter, action)
    if (encounter !== state.encounter) nextState = nextState.setIn(['encounter'], encounter)

    const admittance = noteAdmittanceReducer(state.admittance, action)
    if (admittance !== state.admittance) nextState = nextState.setIn(['admittance'], admittance)

    return nextState
}