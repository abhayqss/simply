import OrganizationInitialState from './OrganizationInitialState'

import canReducer from './can/canOrganizationReducer'
import listReducer from './list/organizationListReducer'
import formReducer from './form/organizationFormReducer'
import countReducer from './count/organizationCountReducer'
import detailsReducer from './details/organizationDetailsReducer'
import historyReducer from './history/organizationHistoryReducer'

const initialState = new OrganizationInitialState()

export default function loginReducer(state = initialState, action) {
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

    return nextState
}