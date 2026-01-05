import InitialState from './CareTeamNotificationPreferenceInitialState'

import listReducer from './list/careTeamNotificationPreferenceListReducer'

const initialState = new InitialState()

export default function careTeamNotificationPreferenceReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
