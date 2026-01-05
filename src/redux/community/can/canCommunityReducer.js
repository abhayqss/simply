import OrganizationInitialState from './CanCommunityInitialState'

import addReducer from './add/canAddCommunityReducer'

const initialState = new OrganizationInitialState()

export default function loginReducer(state = initialState, action) {
    let nextState = state

    const add = addReducer(state.add, action)
    if (add !== state.add) nextState = nextState.setIn(['add'], add)

    return nextState
}