import List from './list/CareTeamMemberListInitialState'
import Form from './form/CareTeamMemberFormInitialState'
import Count from './count/CareTeamMemberCountInitialState'
import Details from './details/CareTeamMemberDetailsInitialState'
import History from './history/CareTeamMemberHistoryInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new List(),
    form: new Form(),
    count: new Count(),
    details: new Details(),
    history: new History(),
})

export default InitialState