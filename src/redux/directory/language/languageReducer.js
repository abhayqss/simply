import InitialState from './LanguageInitialState'

import serviceReducer from './service/languageServiceReducer'

const initialState = new InitialState()

export default function ancillaryReducer(state = initialState, action) {
    let nextState = state

    const service = serviceReducer(state.service, action)
    if (service !== state.service) nextState = nextState.setIn(['service'], service)

    return nextState
}


