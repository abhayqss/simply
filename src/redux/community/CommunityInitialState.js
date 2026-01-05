import Can from './can/CanCommunityInitialState'
import List from './list/CommunityListInitialState'
import Form from './form/CommunityFormInitialState'
import Count from './count/CommunityCountInitialState'
import Details from './details/CommunityDetailsInitialState'
import History from './history/CommunityHistoryInitialState'

import Zone from './zone/CommunityZoneInitialState'
import Handset from './handset/CommunityHandsetInitialState'
import Location from './location/CommunityLocationInitialState'
import DeviceType from './deviceType/CommunityDeviceTypeInitialState'



const { Record } = require('immutable')

const InitialState = Record({
    can: Can(),
    list: List(),
    form: Form(),
    count: Count(),
    details: Details(),
    history: History(),

    /*Community Zones,Locations,DeviceTypes and Handsets Initial State*/
    zone: Zone(),
    handset: Handset(),
    location: Location(),
    deviceType: DeviceType()
})

export default InitialState