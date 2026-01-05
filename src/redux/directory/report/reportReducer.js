import InitialState from './ReportInitialState'

import typeReducer from './type/reportTypeReducer'
import groupReducer from './group/reportGroupReducer'

const initialState = new InitialState()

export default function reportGroupReducer (state = initialState, action) {
    let nextState = state

    const type = typeReducer(state.type, action)
    if (type !== state.type) nextState = nextState.setIn(['type'], type)

    const group = groupReducer(state.group, action)
    if (group !== state.group) nextState = nextState.setIn(['group'], group)

    return nextState
}
