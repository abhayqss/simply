import { ACTION_TYPES} from 'lib/Constants'

import InitialState from './CanViewReportInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CAN_ADD_REPORT,
    CLEAR_CAN_ADD_REPORT_ERROR,
    LOAD_CAN_ADD_REPORT_REQUEST,
    LOAD_CAN_ADD_REPORT_SUCCESS,
    LOAD_CAN_ADD_REPORT_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function canViewReportReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CAN_ADD_REPORT:
            return state.clear()
                        .setIn(['shouldReload'], action.payload || false)

        case CLEAR_CAN_ADD_REPORT_ERROR:
            return state.removeIn(['error'])

        case LOAD_CAN_ADD_REPORT_REQUEST: {
            return state.setIn(['error'], null)
                .setIn(['shouldReload'], false)
        }

        case LOAD_CAN_ADD_REPORT_SUCCESS:
            return state.removeIn(['error'])
                .setIn(['value'], action.payload)

        case LOAD_CAN_ADD_REPORT_FAILURE:
            return state.setIn(['error'], action.payload)
                .setIn(['shouldReload'], false)
    }

    return state
}