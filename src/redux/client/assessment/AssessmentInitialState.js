import Type from './type/AssessmentTypeInitialState'
import List from './list/AssessmentListInitialState'
import Form from './form/AssessmentFormInitialState'
import Count from './count/AssessmentCountInitialState'
import Details from './details/AssessmentDetailsInitialState'
import History from './history/AssessmentHistoryInitialState'

const { Record } = require('immutable')

export default Record({
    type: Type(),
    list: List(),
    form: Form(),
    count: Count(),
    details: Details(),
    history: History()
})