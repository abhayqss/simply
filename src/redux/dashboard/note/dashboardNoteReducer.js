import InitialState from './DashboardNoteInitialState'

import listReducer from './list/dashboardNoteListReducer'

const initialState = new InitialState()

export default function dashboardNoteReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
