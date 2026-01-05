import InitialState from './PasswordInitialState'

import oldReducer from './old/oldPasswordReducer'
import newReducer from './new/newPasswordReducer'
import createReducer from './create/createReducer'
import resetReducer from './reset/resetPasswordReducer'
import complexityReducer from './complexity/complexityReducer'

const initialState = new InitialState()

export default function passwordReducer(state = initialState, action) {
    let nextState = state

    const _new = newReducer(state.new, action)
    if (_new !== state.new) nextState = nextState.setIn(['new'], _new)

    const old = oldReducer(state.old, action)
    if (old !== state.old) nextState = nextState.setIn(['old'], old)

    const reset = resetReducer(state.reset, action)
    if (reset !== state.reset) nextState = nextState.setIn(['reset'], reset)

    const create = createReducer(state.create, action)
    if (create !== state.create) nextState = nextState.setIn(['create'], create)

    const complexity = complexityReducer(state.complexity, action)
    if (complexity !== state.complexity) nextState = nextState.setIn(['complexity'], complexity)

    return nextState
}