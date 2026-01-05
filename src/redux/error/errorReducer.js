import { ACTION_TYPES } from 'lib/Constants'

import InitialState from './errorInitialState'

const {
    CLEAR_ERROR,
    CHANGE_ERROR
} = ACTION_TYPES

const initialState = new InitialState()

export default function errorReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    let nextState = state

    switch (action.type) {
        case CHANGE_ERROR:
            return state.setIn(['error'], action.payload)

        case CLEAR_ERROR:
            return state.setIn(['error'], null)
    }

    return nextState
}