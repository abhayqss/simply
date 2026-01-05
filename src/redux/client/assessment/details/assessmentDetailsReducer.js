import { ACTION_TYPES } from 'lib/Constants'

import InitialState from './AssessmentDetailsInitialState'

const {
    SIGNOUT_SUCCESS,
    CLEAR_ASSESSMENT_DETAILS,
    CLEAR_ASSESSMENT_DETAILS_ERROR,

    LOAD_ASSESSMENT_DETAILS_REQUEST,
    LOAD_ASSESSMENT_DETAILS_SUCCESS,
    LOAD_ASSESSMENT_DETAILS_FAILURE
} = ACTION_TYPES


const initialState = new InitialState()

export default function assessmentDetailsReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case SIGNOUT_SUCCESS:
        case CLEAR_ASSESSMENT_DETAILS:
            return state.clear().setIn(
                ['shouldReload'], action.payload || false
            )

        case CLEAR_ASSESSMENT_DETAILS_ERROR:
            return state.removeIn(['error'])

        case LOAD_ASSESSMENT_DETAILS_REQUEST:
            return state.setIn(['isFetching'], true)
                .setIn(['shouldReload'], false)
                .setIn(['data'], { id: action.payload })
                .setIn(['error'], null)

        case LOAD_ASSESSMENT_DETAILS_SUCCESS:
            return state.setIn(['isFetching'], false)
                .setIn(['data'], action.payload)

        case LOAD_ASSESSMENT_DETAILS_FAILURE:
            return state.setIn(['isFetching'], false)
                .setIn(['error'], action.payload)
    }
    return state
}
