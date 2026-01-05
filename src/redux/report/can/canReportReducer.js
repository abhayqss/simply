import OrganizationInitialState from './CanReportInitialState'

import viewReducer from './view/canViewReportReducer'

const initialState = new OrganizationInitialState()

export default function canReportReducer(state = initialState, action) {
    let nextState = state

    const view = viewReducer(state.view, action)
    if (view !== state.view) nextState = nextState.setIn(['view'], view)

    return nextState
}