import List from './list/CommunityZoneListInitialState'
import Form from './form/CommunityZoneFormInitialState'
import Count from './count/CommunityZoneCountInitialState'
import History from './history/CommunityZoneHistoryInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new List(),
    form: new Form(),
    count: new Count(),
    history: new History(),
})

export default InitialState