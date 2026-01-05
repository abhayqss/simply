import InitialState from './AssessmentTypeInitialState'

import listReducer from './list/assessmentTypeListReducer'

const initialState = InitialState()

export default function assessmentReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}