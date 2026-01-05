import InitialState from './AssessmentInitialState'

import typeReducer from './type/assessmentTypeReducer'
import scoreReducer from './score/assessmentScoreReducer'
import surveyReducer from './survey/assessmentSurveyReducer'
import managementReducer from './management/assessmentManagementReducer'

const initialState = InitialState()

export default function assessmentReducer(state = initialState, action) {
    let nextState = state

    const type = typeReducer(state.type, action)
    if (type !== state.type) nextState = nextState.setIn(['type'], type)

    const score = scoreReducer(state.score, action)
    if (score !== state.score) nextState = nextState.setIn(['score'], score)

    const survey = surveyReducer(state.survey, action)
    if (survey !== state.survey) nextState = nextState.setIn(['survey'], survey)

    const management = managementReducer(state.management, action)
    if (management !== state.management) nextState = nextState.setIn(['management'], management)

    return nextState
}