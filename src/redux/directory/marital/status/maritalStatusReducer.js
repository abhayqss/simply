import InitialState from './MaritalStatusInitialState'

import listReducer from './list/maritalStatusListReducer'

const initialState = new InitialState()

export default function maritalStatusReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}