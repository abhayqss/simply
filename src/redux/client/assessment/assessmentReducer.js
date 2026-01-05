import InitialState from './AssessmentInitialState'

import typeReducer from './type/assessmentTypeReducer'
import listReducer from './list/assessmentListReducer'
import formReducer from './form/assessmentFormReducer'
import countReducer from './count/assessmentCountReducer'
import detailsReducer from './details/assessmentDetailsReducer'
import historyReducer from './history/assessmentHistoryReducer'

const initialState = InitialState()

export default function assessmentReducer(state = initialState, action) {
    let nextState = state

    const type = typeReducer(state.type, action)
    if (type !== state.type) nextState = nextState.setIn(['type'], type)

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const count = countReducer(state.count, action)
    if (count !== state.count) nextState = nextState.setIn(['count'], count)

    const form = formReducer(state.form, action)
    if (form !== state.form) nextState = nextState.setIn(['form'], form)

    const details = detailsReducer(state.details, action)
    if (details !== state.details) nextState = nextState.setIn(['details'], details)

    const history = historyReducer(state.history, action)
    if (history !== state.history) nextState = nextState.setIn(['history'], history)

    return nextState
}