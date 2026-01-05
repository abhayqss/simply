import List from './list/EventListInitialState'
import Form from './form/EventFormInitialState'
import Note from './note/EventNoteInitialState'
import Details from './details/EventDetailsInitialState'
import Notification from './notification/EventNotificationInitialState'

const { Record } = require('immutable')

export default Record({
    list: new List(),
    form: new Form(),
    note: new Note(),
    details: new Details(),
    notification: new Notification(),
})