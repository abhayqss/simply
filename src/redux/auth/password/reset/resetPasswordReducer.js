import InitialState from './ResetPasswordInitialState'

import formReducer from './form/resetPasswordFormReducer'

const initialState = new InitialState()

export default function loginReducer(state = initialState, action) {
    let nextState = state

    const form = formReducer(state.form, action)
    if (form !== state.form) nextState = nextState.setIn(['form'], form)

    return nextState
}