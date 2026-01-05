import { ACTION_TYPES } from 'lib/Constants'

import InitialState from './ComplexityRulesInitialState'

const {
    CLEAR_COMPLEXITY_RULES,
    CLEAR_COMPLEXITY_RULES_ERROR,

    LOAD_COMPLEXITY_RULES_REQUEST,
    LOAD_COMPLEXITY_RULES_SUCCESS,
    LOAD_COMPLEXITY_RULES_FAILURE
} = ACTION_TYPES


const initialState = new InitialState()

export default function complexityRulesReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case CLEAR_COMPLEXITY_RULES:
            return state.removeIn(['data'])
                .removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)

        case CLEAR_COMPLEXITY_RULES_ERROR:
            return state.removeIn(['error'])

        case LOAD_COMPLEXITY_RULES_REQUEST:
            return state.setIn(['isFetching'], true)
                .setIn(['shouldReload'], false)
                .setIn(['error'], null)

        case LOAD_COMPLEXITY_RULES_SUCCESS:
            return state.setIn(['isFetching'], false)
                .setIn(['data'], action.payload)

        case LOAD_COMPLEXITY_RULES_FAILURE:
            return state.setIn(['isFetching'], false)
                .setIn(['error'], action.payload)
    }
    return state
}