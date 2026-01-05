import InitialState from './CareTeamNotificationInitialState'

import preferenceReducer from './preference/careTeamNotificationPreferenceReducer'

const initialState = new InitialState()

export default function careTeamNotificationReducer(state = initialState, action) {
    let nextState = state

    const preference = preferenceReducer(state.preference, action)
    if (preference !== state.preference) nextState = nextState.setIn(['preference'], preference)

    return nextState
}
