import InitialState from './LanguageServiceInitialState'

import listReducer from './list/languageServiceListReducer'

const initialState = new InitialState()

export default function ancillaryServiceReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}


