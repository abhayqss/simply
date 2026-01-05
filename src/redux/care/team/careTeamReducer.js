import InitialState from './CareTeamInitialState'

import memberReducer from './member/careTeamMemberReducer'

const initialState = new InitialState()

export default function careTeamReducer(state = initialState, action) {
    let nextState = state

    const member = memberReducer(state.member, action)
    if (member !== state.member) nextState = nextState.setIn(['member'], member)

    return nextState
}