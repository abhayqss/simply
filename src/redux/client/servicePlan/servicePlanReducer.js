import ServicePlanInitialState from './ServicePlanInitialState'

import canServicePlanReducer from './can/canServicePlanReducer'
import servicePlanFormReducer from './form/servicePlanFormReducer'
import servicePlanListReducer from './list/servicePlanListReducer'
import servicePlanCountReducer from './count/servicePlanCountReducer'
import servicePlanDetailsReducer from './details/servicePlanDetailsReducer'
import servicePlanHistoryReducer from './history/servicePlanHistoryReducer'


const initialState = new ServicePlanInitialState()

export default function servicePlanReducer(state = initialState, action) {
    let nextState = state

    const form = servicePlanFormReducer(state.form, action)
    if (form !== state.form) nextState = nextState.setIn(['form'], form)

    const list = servicePlanListReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const count = servicePlanCountReducer(state.count, action)
    if (count !== state.count) nextState = nextState.setIn(['count'], count)

    const details = servicePlanDetailsReducer(state.details, action)
    if (details !== state.details) nextState = nextState.setIn(['details'], details)

    const history = servicePlanHistoryReducer(state.history, action)
    if (history !== state.history) nextState = nextState.setIn(['history'], history)

    const can = canServicePlanReducer(state.can, action)
    if (can !== state.can) nextState = nextState.setIn(['can'], can)

    return nextState
}