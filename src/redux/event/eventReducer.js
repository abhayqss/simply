import InitialState from './EventInitialState'

import listReducer from './list/eventListReducer'
import formReducer from './form/eventFormReducer'
import noteReducer from './note/eventNoteReducer'
import detailsReducer from './details/eventDetailsReducer'
import notificationReducer from './notification/eventNotificationReducer'

const initialState = new InitialState()

export default function eventReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const form = formReducer(state.form, action)
    if (form !== state.form) nextState = nextState.setIn(['form'], form)

    const note = noteReducer(state.note, action)
    if (note !== state.note) nextState = nextState.setIn(['note'], note)

    const details = detailsReducer(state.details, action)
    if (details !== state.details) nextState = nextState.setIn(['details'], details)

    const notification = notificationReducer(state.notification, action)
    if (notification !== state.notification) nextState = nextState.setIn(['notification'], notification)

    return nextState
}