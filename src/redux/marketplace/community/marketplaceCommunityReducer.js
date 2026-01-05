import InitialState from './MarketplaceCommunityInitialState'

import listReducer from './list/marketplaceCommunityListReducer'
import filterReducer from './filter/marketplaceCommunityFilterReducer'
import detailsReducer from './details/marketplaceCommunityDetailsReducer'
import appointmentReducer from './appointment/marketplaceCommunityAppointmentReducer'

const initialState = new InitialState()

export default function marketplaceCommunityReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const filter = filterReducer(state.filter, action)
    if (filter !== state.filter) nextState = nextState.setIn(['filter'], filter)

    const details = detailsReducer(state.details, action)
    if (details !== state.details) nextState = nextState.setIn(['details'], details)

    const appointment = appointmentReducer(state.appointment, action)
    if (appointment !== state.appointment) nextState = nextState.setIn(['appointment'], appointment)

    return nextState
}