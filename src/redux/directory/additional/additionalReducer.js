import InitialState from './AdditionalInitialState'

import serviceReducer from './service/additionalServiceReducer'

const initialState = new InitialState()

export default function additionalReducer(state = initialState, action) {
    let nextState = state

    const service = serviceReducer(state.service, action)
    if (service !== state.service) nextState = nextState.setIn(['service'], service)

    return nextState
}


