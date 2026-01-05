import InitialState from './CareTeamMemberInitialState'

import careTeamMemberListReducer from './list/careTeamMemberListReducer'
import careTeamMemberFormReducer from './form/careTeamMemberFormReducer'
import careTeamMemberCountReducer from './count/careTeamMemberCountReducer'
import careTeamMemberDetailsReducer from './details/careTeamMemberDetailsReducer'
import careTeamMemberHistoryReducer from './history/careTeamMemberHistoryReducer'

const initialState = new InitialState()

export default function careTeamMemberReducer(state = initialState, action) {
    let nextState = state

    const list = careTeamMemberListReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const form = careTeamMemberFormReducer(state.form, action)
    if (form !== state.form) nextState = nextState.setIn(['form'], form)

    const count = careTeamMemberCountReducer(state.count, action)
    if (count !== state.count) nextState = nextState.setIn(['count'], count)

    const details = careTeamMemberDetailsReducer(state.details, action)
    if (details !== state.details) nextState = nextState.setIn(['details'], details)

    const history = careTeamMemberHistoryReducer(state.history, action)
    if (history !== state.history) nextState = nextState.setIn(['history'], history)

    return nextState
}