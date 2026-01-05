import InitialState from './CareInitialState'

import teamReducer from './team/careTeamReducer'
import clientReducer from './client/careClientReducer'

const initialState = new InitialState()

export default function carReducer(state = initialState, action) {
    let nextState = state

    const team = teamReducer(state.team, action)
    if (team !== state.team) nextState = nextState.setIn(['team'], team)

    const client = clientReducer(state.client, action)
    if (client !== state.client) nextState = nextState.setIn(['client'], client)

    return nextState
}