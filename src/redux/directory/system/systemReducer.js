import InitialState from './SystemInitialState'

import systemRoleReducer from './role/systemRoleReducer'

const initialState = new InitialState()

export default function systemReducer(state = initialState, action) {
    let nextState = state

    const role = systemRoleReducer(state.role, action)
    if (role !== state.role) nextState = nextState.setIn(['role'], role)

    return nextState
}