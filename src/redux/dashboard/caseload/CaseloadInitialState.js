import List from './list/CaseloadListInitialState'
import History from './history/CaseloadHistoryInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new List(),
    history: new History(),
})

export default InitialState