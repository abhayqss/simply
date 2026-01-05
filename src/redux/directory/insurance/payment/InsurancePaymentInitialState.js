import Plan from './plan/InsurancePaymentPlanInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    plan: Plan()
})

export default InitialState