import InitialState from './OrganizationInitialState'

import listReducer from './list/organizationListReducer'
import typeReducer from './type/organizationTypeReducer'

const initialState = new InitialState()

export default function organizationReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const type = typeReducer(state.type, action)
    if (type !== state.type) nextState = nextState.setIn(['type'], type)

    return nextState
}
