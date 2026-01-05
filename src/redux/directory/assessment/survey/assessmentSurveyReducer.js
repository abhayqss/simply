import { ACTION_TYPES} from 'lib/Constants'

import InitialState from './AssessmentSurveyInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_ASSESSMENT_SURVEY,
    CLEAR_ASSESSMENT_SURVEY_ERROR,
    LOAD_ASSESSMENT_SURVEY_REQUEST,
    LOAD_ASSESSMENT_SURVEY_SUCCESS,
    LOAD_ASSESSMENT_SURVEY_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function assessmentCountReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_ASSESSMENT_SURVEY:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .removeIn(['value'])

        case CLEAR_ASSESSMENT_SURVEY_ERROR:
            return state.removeIn(['error'])

        case LOAD_ASSESSMENT_SURVEY_REQUEST: {
            return state.setIn(['error'], null)
                .setIn(['isFetching'], true)
                .setIn(['shouldReload'], false)
        }

        case LOAD_ASSESSMENT_SURVEY_SUCCESS:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['value'], action.payload)

        case LOAD_ASSESSMENT_SURVEY_FAILURE:
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
    }

    return state
}