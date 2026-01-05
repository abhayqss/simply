import InitialState from './CommunityInitialState'

import canReducer from './can/canCommunityReducer'
import listReducer from './list/communityListReducer'
import formReducer from './form/communityFormReducer'
import countReducer from './count/communityCountReducer'
import detailsReducer from './details/communityDetailsReducer'
import historyReducer from './history/communityHistoryReducer'

import zoneReducer from './zone/communityZoneReducer'
import handsetReducer from './handset/communityHandsetReducer'
import locationReducer from './location/communityLocationReducer'
import deviceTypeReducer from './deviceType/communityDeviceTypeReducer'

const initialState = new InitialState()

export default function loginReducer(state = initialState, action) {
    let nextState = state

    const can = canReducer(state.can, action)
    if (can !== state.can) nextState = nextState.setIn(['can'], can)

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const form = formReducer(state.form, action)
    if (form !== state.form) nextState = nextState.setIn(['form'], form)

    const count = countReducer(state.count, action)
    if (count !== state.count) nextState = nextState.setIn(['count'], count)

    const details = detailsReducer(state.details, action)
    if (details !== state.details) nextState = nextState.setIn(['details'], details)

    const history = historyReducer(state.history, action)
    if (history !== state.history) nextState = nextState.setIn(['history'], history)

    /* Community Zones, Locations, DeviceTypes and Handsets Reducers */
    const zone = zoneReducer(state.zone, action)
    if (zone !== state.zone) nextState = nextState.setIn(['zone'], zone)

    const handset = handsetReducer(state.handset, action)
    if (handset !== state.handset) nextState = nextState.setIn(['handset'], handset)

    const location = locationReducer(state.location, action)
    if (location !== state.location) nextState = nextState.setIn(['location'], location)

    const deviceType = deviceTypeReducer(state.deviceType, action)
    if (deviceType !== state.deviceType) nextState = nextState.setIn(['deviceType'], deviceType)


    return nextState
}
