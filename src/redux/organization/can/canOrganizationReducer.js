import OrganizationInitialState from './CanOrganizationInitialState'

import addReducer from './add/canAddOrganizationReducer'

const initialState = new OrganizationInitialState()

export default function loginReducer(state = initialState, action) {
    let nextState = state

    const add = addReducer(state.add, action)
    if (add !== state.add) nextState = nextState.setIn(['add'], add)

    return nextState
}