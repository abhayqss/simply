import { ACTION_TYPES } from 'lib/Constants'

import InitialState from './AssessmentManagementInitialState'

const {
    SIGNOUT_SUCCESS,
    CLEAR_ASSESSMENT_MANAGEMENT,
    CLEAR_ASSESSMENT_MANAGEMENT_ERROR,

    LOAD_ASSESSMENT_MANAGEMENT_REQUEST,
    LOAD_ASSESSMENT_MANAGEMENT_SUCCESS,
    LOAD_ASSESSMENT_MANAGEMENT_FAILURE
} = ACTION_TYPES


const initialState = new InitialState()

export default function assessmentScoringReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case SIGNOUT_SUCCESS:
        case CLEAR_ASSESSMENT_MANAGEMENT:
            return state.removeIn(['data'])
                .removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)

        case CLEAR_ASSESSMENT_MANAGEMENT_ERROR:
            return state.removeIn(['error'])

        case LOAD_ASSESSMENT_MANAGEMENT_REQUEST:
            return state.setIn(['isFetching'], true)
                .setIn(['shouldReload'], false)
                .setIn(['error'], null)

        case LOAD_ASSESSMENT_MANAGEMENT_SUCCESS:
            return state.setIn(['isFetching'], false)
                .setIn(['data'], action.payload)

        case LOAD_ASSESSMENT_MANAGEMENT_FAILURE:
            return state.setIn(['isFetching'], false)
                .setIn(['error'], action.payload)
    }
    return state
}
