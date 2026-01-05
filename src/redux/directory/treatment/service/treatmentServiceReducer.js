import InitialState from './TreatmentServiceInitialState'

import listReducer from './list/treatmentServiceListReducer'

const initialState = new InitialState()

export default function ancillaryServiceReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}


