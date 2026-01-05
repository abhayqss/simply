import InitialState from './OldPasswordInitialState'

import createFormReducer from './form/oldPasswordFormReducer'

const initialState = new InitialState()

export default function createReducer(state = initialState, action) {
    let nextState = state

    const form = createFormReducer(state.form, action)
    if (form !== state.form) nextState = nextState.setIn(['form'], form)

    return nextState
}