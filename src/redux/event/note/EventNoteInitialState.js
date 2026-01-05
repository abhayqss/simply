import List from './list/EventNoteListInitialState'
import Composed from './composed/EventNoteComposedInitialState'

const { Record } = require('immutable')

export default Record({
    list: new List(),
    composed: new Composed(),
})