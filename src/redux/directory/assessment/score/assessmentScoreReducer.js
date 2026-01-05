import { ACTION_TYPES } from 'lib/Constants'

import InitialState from './AssessmentScoreInitialState'

const {
    SIGNOUT_SUCCESS,
    CLEAR_ASSESSMENT_SCORE,
    CLEAR_ASSESSMENT_SCORE_ERROR,

    LOAD_ASSESSMENT_SCORE_REQUEST,
    LOAD_ASSESSMENT_SCORE_SUCCESS,
    LOAD_ASSESSMENT_SCORE_FAILURE
} = ACTION_TYPES


const initialState = new InitialState()

export default function assessmentScoringReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case SIGNOUT_SUCCESS:
        case CLEAR_ASSESSMENT_SCORE:
            return state.removeIn(['value'])
                .removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)

        case CLEAR_ASSESSMENT_SCORE_ERROR:
            return state.removeIn(['error'])

        case LOAD_ASSESSMENT_SCORE_REQUEST:
            return state.setIn(['isFetching'], true)
                .setIn(['shouldReload'], false)
                .setIn(['error'], null)

        case LOAD_ASSESSMENT_SCORE_SUCCESS:
            return state.setIn(['isFetching'], false)
                .setIn(['value'], action.payload)

        case LOAD_ASSESSMENT_SCORE_FAILURE:
            return state.setIn(['isFetching'], false)
                .setIn(['error'], action.payload)
    }
    return state
}
