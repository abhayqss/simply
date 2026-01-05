import InitialState from './AgeGroupInitialState'

import listReducer from './list/ageGroupListReducer'

const initialState = new InitialState()

export default function ageGroupReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
