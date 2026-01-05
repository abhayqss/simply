import InitialState from './OrganizationTypeInitialState'

import organizationTypeListReducer from './list/organizationTypeListReducer'

const initialState = new InitialState()

export default function organizationType(state = initialState, action) {
    let nextState = state

    const list = organizationTypeListReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
