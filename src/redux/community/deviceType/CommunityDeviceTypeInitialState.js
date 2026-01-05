import List from './list/CommunityDeviceTypeListInitialState'
import Form from './form/CommunityDeviceTypeFormInitialState'
import Count from './count/CommunityDeviceTypeCountInitialState'
import Details from './details/CommunityDeviceTypeDetailsInitialState'
import History from './history/CommunityDeviceTypeHistoryInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new List(),
    form: new Form(),
    count: new Count(),
    details: new Details(),
    history: new History(),
})

export default InitialState