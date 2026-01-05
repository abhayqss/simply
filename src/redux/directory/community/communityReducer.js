import InitialState from './CommunityInitialState'

import listReducer from './list/communityListReducer'
import typeReducer from './type/communityTypeReducer'

const initialState = new InitialState()

export default function communityReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const type = typeReducer(state.type, action)
    if (type !== state.type) nextState = nextState.setIn(['type'], type)

    return nextState
}
