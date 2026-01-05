import List from './list/CareClientListInitialState'
import Form from './form/CareClientFormInitialState'
import Count from './count/CareClientCountInitialState'
import Details from './details/CareClientDetailsInitialState'
import History from './history/CareClientHistoryInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new List(),
    form: new Form(),
    count: new Count(),
    details: new Details(),
    history: new History(),
})

export default InitialState