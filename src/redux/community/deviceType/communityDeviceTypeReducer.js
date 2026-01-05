import InitialState from './CommunityDeviceTypeInitialState'

import listReducer from './list/communityDeviceTypeListReducer'
import formReducer from './form/communityDeviceTypeFormReducer'
import countReducer from './count/communityDeviceTypeCountReducer'
import detailsReducer from './details/communityDeviceTypeDetailsReducer'
import historyReducer from './history/communityDeviceTypeHistoryReducer'

const initialState = new InitialState()

export default function communityDeviceTypeReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const form = formReducer(state.form, action)
    if (form !== state.form) nextState = nextState.setIn(['form'], form)

    const count = countReducer(state.count, action)
    if (count !== state.count) nextState = nextState.setIn(['count'], count)

    const details = detailsReducer(state.details, action)
    if (details !== state.details) nextState = nextState.setIn(['details'], details)

    const history = historyReducer(state.history, action)
    if (history !== state.history) nextState = nextState.setIn(['history'], history)

    return nextState
}
