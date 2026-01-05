import InitialState from './CommunityZoneInitialState'

import listReducer from './list/communityZoneListReducer'
import formReducer from './form/communityZoneFormReducer'
import countReducer from './count/communityZoneCountReducer'
import historyReducer from './history/communityZoneHistoryReducer'

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
