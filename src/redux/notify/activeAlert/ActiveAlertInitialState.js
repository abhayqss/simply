import ActiveAlertList from './list/ActiveAlertListInitialState'
import ActiveAlertCount from './count/ActiveAlertCountInitialState'
import History from './history/ActiveAlertHistoryInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new ActiveAlertList(),
    count: new ActiveAlertCount(),
    history: new History(),
})

export default InitialState