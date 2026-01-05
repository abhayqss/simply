import InitialState from './EventNoteComposedInitialState'

import listReducer from './list/eventNoteComposedListReducer'
import countReducer from './count/eventNoteComposedCountReducer'

const initialState = new InitialState()

export default function eventNoteComposedReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const count = countReducer(state.count, action)
    if (count !== state.count) nextState = nextState.setIn(['count'], count)

    return nextState
}