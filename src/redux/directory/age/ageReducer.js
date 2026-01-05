import InitialState from './AgeInitialState'

import groupReducer from './group/ageGroupReducer'

const initialState = new InitialState()

export default function ageGroupReducer(state = initialState, action) {
    let nextState = state

    const group = groupReducer(state.group, action)
    if (group !== state.group) nextState = nextState.setIn(['group'], group)

    return nextState
}
