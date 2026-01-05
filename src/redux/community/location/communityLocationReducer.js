import InitialState from './CommunityLocationInitialState'

import listReducer from './list/communityLocationListReducer'
import formReducer from './form/communityLocationFormReducer'
import countReducer from './count/communityLocationCountReducer'
import historyReducer from './history/communityLocationHistoryReducer'

const initialState = new InitialState()

export default function communityLocationReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const form = formReducer(state.form, action)
    if (form !== state.form) nextState = nextState.setIn(['form'], form)

    const count = countReducer(state.count, action)
    if (count !== state.count) nextState = nextState.setIn(['count'], count)

    const history = historyReducer(state.history, action)
    if (history !== state.history) nextState = nextState.setIn(['history'], history)

    return nextState
}
