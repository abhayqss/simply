import ServicePlanListInitialState from './list/ServicePlanListInitialState'
import ServicePlanFormInitialState from './form/ServicePlanFormInitialState'
import ServicePlanCountInitialState from './count/ServicePlanCountInitialState'
import ServicePlanDetailsInitialState from './details/ServicePlanDetailsInitialState'
import History from './history/ServicePlanHistoryInitialState'
import CanServicePlanInitialState from './can/canServicePlanInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    form: new ServicePlanFormInitialState(),
    list: new ServicePlanListInitialState(),
    count: new ServicePlanCountInitialState(),
    details: new ServicePlanDetailsInitialState(),
    history:  new History(),
    can: new CanServicePlanInitialState()
})

export default InitialState