import InitialState from './CommunityHandsetInitialState'

import listReducer from './list/communityHandsetListReducer'
import formReducer from './form/communityHandsetFormReducer'
import countReducer from './count/communityHandsetCountReducer'
import historyReducer from './history/communityHandsetHistoryReducer'

const initialState = new InitialState()

export default function communityHandsetReducer(state = initialState, action) {
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
