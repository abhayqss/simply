import Count from './count/DashboardServicePlanCountInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    count: new Count(),
})

export default InitialState