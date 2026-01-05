import List from './list/CommunityHandsetListInitialState'
import Form from './form/CommunityHandsetFormInitialState'
import Count from './count/CommunityHandsetCountInitialState'
import History from './history/CommunityHandsetHistoryInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new List(),
    form: new Form(),
    count: new Count(),
    history: new History(),
})

export default InitialState