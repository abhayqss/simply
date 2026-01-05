import List from './list/insurancePaymentPlanListInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: List()
})

export default InitialState