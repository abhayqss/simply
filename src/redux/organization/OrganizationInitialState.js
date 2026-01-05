import Can from './can/CanOrganizationInitialState'
import List from './list/OrganizationListInitialState'
import Form from './form/OrganizationFormInitialState'
import Count from './count/OrganizationCountInitialState'
import Details from './details/OrganizationDetailsInitialState'
import History from './history/OrganizationHistoryInitialState'

const { Record } = require('immutable');

export default Record({
    can: Can(),
    list: List(),
    form: Form(),
    count: Count(),
    details: Details(),
    history: History()
})