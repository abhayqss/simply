import InitialState from './CareTeamResponsibilityInitialState'

import listReducer from './list/careTeamResponsibilityListReducer'

const initialState = new InitialState()

export default function careTeamResponsibilityReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
