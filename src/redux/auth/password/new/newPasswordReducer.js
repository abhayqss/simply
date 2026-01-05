import InitialState from './NewPasswordInitialState'

import createFormReducer from './form/newPasswordFormReducer'

const initialState = new InitialState()

export default function createReducer(state = initialState, action) {
    let nextState = state

    const form = createFormReducer(state.form, action)
    if (form !== state.form) nextState = nextState.setIn(['form'], form)

    return nextState
}