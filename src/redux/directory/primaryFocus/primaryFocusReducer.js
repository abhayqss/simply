import InitialState from './PrimaryFocusInitialState'

import primaryFocusListReducer from './list/primaryFocusListReducer'

const initialState = new InitialState()

export default function primaryFocusReducer(state = initialState, action) {
    let nextState = state

    const list = primaryFocusListReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
