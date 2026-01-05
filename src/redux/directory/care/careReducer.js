import InitialState from './level/CareLevelInitialState'

import teamReducer from './team/careTeamReducer'
import levelReducer from './level/careLevelReducer'
const initialState = new InitialState()

export default function careReducer(state = initialState, action) {
    let nextState = state

    const team = teamReducer(state.team, action)
    if (team !== state.team) nextState = nextState.setIn(['team'], team)

    const level = levelReducer(state.level, action)
    if (level !== state.level) nextState = nextState.setIn(['level'], level)

    return nextState
}
