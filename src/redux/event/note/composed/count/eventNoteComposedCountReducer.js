import { ACTION_TYPES} from 'lib/Constants'

import InitialState from './EventNoteComposedCountInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_EVENT_NOTE_COMPOSED_COUNT,
    CLEAR_EVENT_NOTE_COMPOSED_COUNT_ERROR,
    LOAD_EVENT_NOTE_COMPOSED_COUNT_REQUEST,
    LOAD_EVENT_NOTE_COMPOSED_COUNT_SUCCESS,
    LOAD_EVENT_NOTE_COMPOSED_COUNT_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function eventNoteComposedCountReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_EVENT_NOTE_COMPOSED_COUNT:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .removeIn(['value'])

        case CLEAR_EVENT_NOTE_COMPOSED_COUNT_ERROR:
            return state.removeIn(['error'])

        case LOAD_EVENT_NOTE_COMPOSED_COUNT_REQUEST: {
            return state.setIn(['error'], null)
                .setIn(['shouldReload'], false)
        }

        case LOAD_EVENT_NOTE_COMPOSED_COUNT_SUCCESS:
            return state.removeIn(['error'])
                .setIn(['value'], action.payload)

        case LOAD_EVENT_NOTE_COMPOSED_COUNT_FAILURE:
            return state.setIn(['error'], action.payload)
                .setIn(['shouldReload'], false)
    }

    return state
}