import InitialState from './CareClientInitialState'

import careClientListReducer from './list/careClientListReducer'
import careClientFormReducer from './form/careClientFormReducer'
import careClientCountReducer from './count/careClientCountReducer'
import careClientDetailsReducer from './details/careClientDetailsReducer'
import careClientHistoryReducer from './history/careClientHistoryReducer'

const initialState = new InitialState()

export default function clientReducer(state = initialState, action) {
    let nextState = state

    const list = careClientListReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const form = careClientFormReducer(state.form, action)
    if (form !== state.form) nextState = nextState.setIn(['form'], form)

    const count = careClientCountReducer(state.count, action)
    if (count !== state.count) nextState = nextState.setIn(['count'], count)

    const details = careClientDetailsReducer(state.details, action)
    if (details !== state.details) nextState = nextState.setIn(['details'], details)

    const history = careClientHistoryReducer(state.history, action)
    if (history !== state.history) nextState = nextState.setIn(['history'], history)

    return nextState
}