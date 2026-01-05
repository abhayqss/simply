import Type from './type/AssessmentTypeInitialState'
import Score from './score/AssessmentScoreInitialState'
import Survey from './survey/AssessmentSurveyInitialState'
import Management from './management/AssessmentManagementInitialState'

const { Record } = require('immutable')

export default Record({
    type: Type(),
    score: Score(),
    survey: Survey(),
    management: Management()
})