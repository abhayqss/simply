import List from './list/NoteListInitialState'
import Form from './form/NoteFormInitialState'
import Details from './details/NoteDetailsInitialState'
import History from './history/NoteHistoryInitialState'

const { Record } = require('immutable')

export default Record({
    list: new List(),
    form: new Form(),
    details: new Details(),
    history: new History()
})