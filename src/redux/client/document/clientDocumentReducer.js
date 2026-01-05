import InitialState from './ClientDocumentInitialState'

import formReducer from './form/clientDocumentFormReducer'
import listReducer from './list/clientDocumentListReducer'
import countReducer from './count/clientDocumentCountReducer'
import deleteReducer from './delete/deleteClientDocumentReducer'
import detailsReducer from './details/clientDocumentDetailsReducer'

import historyReducer from './history/clientDocumentHistoryReducer'

const initialState = new InitialState()

export default function clientDocumentReducer(state = initialState, action) {
    let nextState = state

    const form = formReducer(state.form, action)
    if (form !== state.form) nextState = nextState.setIn(['form'], form)

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const count = countReducer(state.count, action)
    if (count !== state.count) nextState = nextState.setIn(['count'], count)

    /*Can't Use remove, remove is function of immutable js*/
    const _delete = deleteReducer(state._delete, action)
    if (_delete !== state._delete) nextState = nextState.setIn(['_delete'], _delete)

    const details = detailsReducer(state.details, action)
    if (details !== state.details) nextState = nextState.setIn(['details'], details)

    const history = historyReducer(state.history, action)
    if (history !== state.history) nextState = nextState.setIn(['history'], history)

    return nextState
}