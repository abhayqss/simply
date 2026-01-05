import AuthInitialState from './AuthInitialState'

import tokenReducer from './token/tokenReducer'
import loginReducer from './login/loginReducer'
import logoutReducer from './logout/logoutReducer'
import sessionReducer from './session/sessionReducer'
import passwordReducer from './password/passwordReducer'

const initialState = new AuthInitialState()

export default function authReducer(state = initialState, action) {
    let nextState = state

    const token = tokenReducer(state.token, action)
    if (token !== state.token) nextState = nextState.setIn(['token'], token)

    const login = loginReducer(state.login, action)
    if (login !== state.login) nextState = nextState.setIn(['login'], login)
    
    const logout = logoutReducer(state.logout, action)
    if (logout !== state.logout) nextState = nextState.setIn(['logout'], logout)
    
    const session = sessionReducer(state.session, action)
    if (session !== state.session) nextState = nextState.setIn(['session'], session)

    const password = passwordReducer(state.password, action)
    if (password !== state.password) nextState = nextState.setIn(['password'], password)

    return nextState
}