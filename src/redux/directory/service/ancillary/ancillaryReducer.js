import InitialState from './AncillaryInitialState'

import ancillaryListReducer from './list/ancillaryListReducer'

const initialState = new InitialState()

export default function ancillaryReducer(state = initialState, action) {
    let nextState = state

    const list = ancillaryListReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}


