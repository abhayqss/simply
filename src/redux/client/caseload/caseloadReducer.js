import InitialState from './CaseloadInitialState'

import caseloadFormReducer from './form/caseloadFormReducer'
import caseloadHistoryReducer from './history/caseloadHistoryReducer'

const initialState = InitialState

export default function caseloadReducer(state = initialState, action) {
    let nextState = state

    const form = caseloadFormReducer(state.form, action)
    if (form !== state.form) nextState = nextState.setIn(['form'], form)

    const history = caseloadHistoryReducer(state.history, action)
    if (history !== state.history) nextState = nextState.setIn(['history'], history)

    return nextState
}
