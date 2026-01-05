import Form from './form/CaseloadFormInitialState'
import History from './history/CaseloadHistoryInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    form: Form(),
    history: History(),
})

export default InitialState