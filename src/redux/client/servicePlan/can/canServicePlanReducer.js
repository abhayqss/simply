import ServicePlanInitialState from './canServicePlanInitialState'
import addReducer from './add/canAddServicePlanReducer'

const initialState = new ServicePlanInitialState()

export default function canServicePlanReducer(state = initialState, action) {
    let nextState = state

    const add = addReducer(state.add, action)
    if (add !== state.add) nextState = nextState.setIn(['add'], add)

    return nextState
}
