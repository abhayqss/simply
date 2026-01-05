import InitialState from './ReportGroupListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_REPORT_GROUP_LIST,
    LOAD_REPORT_GROUP_LIST_REQUEST,
    LOAD_REPORT_GROUP_LIST_SUCCESS,
    LOAD_REPORT_GROUP_LIST_FAILURE,
} = ACTION_TYPES

const initialState = new InitialState()

export default function reportGroupListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_REPORT_GROUP_LIST:
            return state.clear()

        case LOAD_REPORT_GROUP_LIST_REQUEST:
            return state.removeIn(['error'])
                        .setIn(['isFetching'], true)

        case LOAD_REPORT_GROUP_LIST_SUCCESS:
            return state.setIn(['isFetching'], false)
                 .setIn(['dataSource', 'data'], action.payload)

        case LOAD_REPORT_GROUP_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
