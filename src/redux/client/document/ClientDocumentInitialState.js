import List from './list/ClientDocumentListInitialState'
import Form from './form/ClientDocumentFormInitialState'
import Count from './count/ClientDocumentCountInitialState'
import Delete from './delete/DeleteClientDocumentInitialState'
import Details from './details/ClientDocumentDetailsInitialState'
import History from './history/ClientDocumentHistoryInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    form: new Form(),
    list: new List(),
    count: new Count(),
    _delete: new Delete(),
    details: new Details(),
    history:  new History()
})

export default InitialState