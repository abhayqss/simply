import InitialState from './CreateInitialState'

import createFormReducer from './form/createFormReducer'

const initialState = new InitialState()

export default function createReducer(state = initialState, action) {
    let nextState = state

    const form = createFormReducer(state.form, action)
    if (form !== state.form) nextState = nextState.setIn(['form'], form)

    return nextState
}