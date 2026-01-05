import List from './list/CommunityLocationListInitialState'
import Form from './form/CommunityLocationFormInitialState'
import Count from './count/CommunityLocationCountInitialState'
import History from './history/CommunityLocationHistoryInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new List(),
    form: new Form(),
    count: new Count(),
    history: new History(),
})

export default InitialState