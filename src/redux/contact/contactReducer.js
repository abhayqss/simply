import ContactInitialState from './ContactInitialState'

import canReducer from './can/canContactReducer'
import listReducer from './list/contactListReducer'
import formReducer from './form/contactFormReducer'
import communityReducer from './community/communityReducer'
import countReducer from './count/contactCountReducer'
import detailsReducer from './details/contactDetailsReducer'
import historyReducer from './history/contactHistoryReducer'

const initialState = new ContactInitialState()

export default function contactReducer(state = initialState, action) {
    let nextState = state

    const can = canReducer(state.can, action)
    if (can !== state.can) nextState = nextState.setIn(['can'], can)

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

    const community = communityReducer(state.community, action)
    if (community !== state.community) nextState = nextState.setIn(['community'], community)

    return nextState
}