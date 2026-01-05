import SystemAlertList from './list/SystemAlertListInitialState'
import SystemAlertCount from './count/SystemAlertCountInitialState'
import History from './history/SystemAlertHistoryInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new SystemAlertList(),
    count: new SystemAlertCount(),
    history: new History(),
})

export default InitialState