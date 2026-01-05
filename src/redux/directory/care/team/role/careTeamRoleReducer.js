import InitialState from './CareTeamRoleInitialState'

import listReducer from './list/careTeamRoleListReducer'

const initialState = new InitialState()

export default function careTeamRoleReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
