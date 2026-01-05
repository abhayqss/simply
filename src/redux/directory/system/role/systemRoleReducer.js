import InitialState from './SystemRoleInitialState'

import systemRoleListReducer from './list/systemRoleListReducer'

const initialState = new InitialState()

export default function systemRoleReducer(state = initialState, action) {
    let nextState = state

    const list = systemRoleListReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
