import InitialState from './ContactStatusInitialState'

import listReducer from './list/contactStatusListReducer'

const initialState = new InitialState()

export default function contactStatusReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
