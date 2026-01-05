import InitialState from './MarketplaceCommunityAppointmentInitialState'

import marketplaceCommunityAppointmentFormReducer from './form/marketplaceCommunityAppointmentFormReducer'

const initialState = new InitialState()

export default function marketplaceCommunityAppointmentReducer(state = initialState, action) {
    let nextState = state

    const form = marketplaceCommunityAppointmentFormReducer(state.form, action)
    if (form !== state.form) nextState = nextState.setIn(['form'], form)

    return nextState
}