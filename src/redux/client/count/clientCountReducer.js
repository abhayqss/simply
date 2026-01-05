import { ACTION_TYPES} from 'lib/Constants'

import InitialState from './ClientCountInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CLIENT_COUNT,
    CLEAR_CLIENT_COUNT_ERROR,
    LOAD_CLIENT_COUNT_REQUEST,
    LOAD_CLIENT_COUNT_SUCCESS,
    LOAD_CLIENT_COUNT_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function clientCountReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CLIENT_COUNT:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .removeIn(['value'])

        case CLEAR_CLIENT_COUNT_ERROR:
            return state.removeIn(['error'])

        case LOAD_CLIENT_COUNT_REQUEST: {
            return state.setIn(['error'], null)
                .setIn(['shouldReload'], false)
        }

        case LOAD_CLIENT_COUNT_SUCCESS:
            return state.removeIn(['error'])
                .setIn(['value'], action.payload)

        case LOAD_CLIENT_COUNT_FAILURE:
            return state.setIn(['error'], action.payload)
                .setIn(['shouldReload'], false)
    }

    return state
}