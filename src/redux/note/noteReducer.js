import InitialState from './NoteInitialState'

import listReducer from './list/noteListReducer'
import formReducer from './form/noteFormReducer'
import detailsReducer from './details/noteDetailsReducer'
import historyReducer from './history/noteHistoryReducer'

const initialState = new InitialState()

export default function noteReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const form = formReducer(state.form, action)
    if (form !== state.form) nextState = nextState.setIn(['form'], form)

    const details = detailsReducer(state.details, action)
    if (details !== state.details) nextState = nextState.setIn(['details'], details)

    const history = historyReducer(state.history, action)
    if (history !== state.history) nextState = nextState.setIn(['history'], history)

    return nextState
}