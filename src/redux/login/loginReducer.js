import LoginInitialState from './LoginInitialState'

import loginFormReducer from './form/loginFormReducer'

const initialState = new LoginInitialState()

export default function loginReducer(state = initialState, action) {
    let nextState = state

    const form = loginFormReducer(state.form, action)
    if (form !== state.form) nextState = nextState.setIn(['form'], form)

    return nextState
}