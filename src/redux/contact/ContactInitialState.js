import Can from './can/CanContactInitialState'
import List from './list/ContactListInitialState'
import Form from './form/ContactFormInitialState'
import Count from './count/ContactCountInitialState'
import Community from './community/CommunityInitialState'
import Details from './details/ContactDetailsInitialState'
import History from './history/ContactHistoryInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    can: Can(),
    list: List(),
    form: Form(),
    count: Count(),
    details: Details(),
    history: History(),
    community: Community()
})

export default InitialState