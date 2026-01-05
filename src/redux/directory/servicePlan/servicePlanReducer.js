import InitialState from './need/NeedInitialState'

import needReducer from './need/needReducer'

const initialState = new InitialState()

export default function servicePlanReducer(state = initialState, action) {
    let nextState = state

    const need = needReducer(state.need, action)
    if (need !== state.need) nextState = nextState.setIn(['need'], need)

    return nextState
}
