import List from './list/MarketplaceCommunityListInitialState'
import Filter from './filter/MarketplaceCommunityFilterInitialState'
import Details from './details/MarketplaceCommunityDetailsInitialState'
import Appointment from './appointment/MarketplaceCommunityAppointmentInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new List(),
    filter: new Filter(),
    details: new Details(),
    appointment: new Appointment(),
})

export default InitialState