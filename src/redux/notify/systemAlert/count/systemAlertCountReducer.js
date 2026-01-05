import { ACTION_TYPES} from 'lib/Constants'

import InitialState from './SystemAlertCountInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_SYSTEM_ALERT_COUNT,
    CLEAR_SYSTEM_ALERT_COUNT_ERROR,
    LOAD_SYSTEM_ALERT_COUNT_REQUEST,
    LOAD_SYSTEM_ALERT_COUNT_SUCCESS,
    LOAD_SYSTEM_ALERT_COUNT_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function systemAlertCountReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_SYSTEM_ALERT_COUNT:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .removeIn(['value'])

        case CLEAR_SYSTEM_ALERT_COUNT_ERROR:
            return state.removeIn(['error'])

        case LOAD_SYSTEM_ALERT_COUNT_REQUEST: {
            return state.setIn(['error'], null)
                .setIn(['shouldReload'], false)
        }

        case LOAD_SYSTEM_ALERT_COUNT_SUCCESS:
            return state.removeIn(['error'])
                .setIn(['value'], action.payload)

        case LOAD_SYSTEM_ALERT_COUNT_FAILURE:
            return state.setIn(['error'], action.payload)
                .setIn(['shouldReload'], false)
    }

    return state
}