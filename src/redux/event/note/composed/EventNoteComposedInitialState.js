import List from './list/EventNoteComposedListInitialState'
import Count from './count/EventNoteComposedCountInitialState'

const { Record } = require('immutable')

export default Record({
    count: new Count(),
    list: new List(),
})