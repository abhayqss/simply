import InitialState from './LanguageInitialState'

import languageListReducer from './list/languageListReducer'

const initialState = new InitialState()

export default function languageReducer(state = initialState, action) {
    let nextState = state

    const list = languageListReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    return nextState
}
