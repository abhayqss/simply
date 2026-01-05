import List from './list/AppointmentListInitialState'
import History from './history/AppointmentHistoryInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new List(),
    history: new History(),
})

export default InitialState