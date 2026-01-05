import InitialState from './GenderInitialState'

import listReducer from './list/genderListReducer'

const initialState = new InitialState()

export default function genderReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
