import Count from './count/DashboardAssessmentCountInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    count: new Count(),
})

export default InitialState