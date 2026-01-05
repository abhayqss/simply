import InitialState from './NeedInitialState'

import domainReducer from './domain/domainReducer'
import priorityReducer from './priority/priorityReducer'

const initialState = new InitialState()

export default function needReducer(state = initialState, action) {
    let nextState = state

    const domain = domainReducer(state.domain, action)
    if (domain !== state.domain) nextState = nextState.setIn(['domain'], domain)

    const priority = priorityReducer(state.priority, action)
    if (priority !== state.priority) nextState = nextState.setIn(['priority'], priority)

    return nextState
}
