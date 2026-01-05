import ClientInitialState from './ClientBillingInitialState'

import detailsReducer from './details/clientBillingDetailsReducer'

const initialState = new ClientInitialState()

export default function clientBillingReducer (state = initialState, action) {
    let nextState = state

    const details = detailsReducer(state.details, action)
    if (details !== state.details) nextState = nextState.setIn(['details'], details)

    return nextState
}