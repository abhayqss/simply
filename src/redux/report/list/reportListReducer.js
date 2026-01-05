import Immutable from 'immutable'

import InitialState from './ReportListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_REPORT_LIST_ERROR,

    CLEAR_REPORT_LIST,
    CLEAR_REPORT_LIST_FILTER,
    CHANGE_REPORT_LIST_FILTER,
    CHANGE_REPORT_LIST_FILTER_FIELD
} = ACTION_TYPES

const initialState = new InitialState()

export default function noteListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_REPORT_LIST:
            return state.clear()

        case CLEAR_REPORT_LIST_ERROR:
            return state.removeIn(['error'])

        case CLEAR_REPORT_LIST_FILTER:
            return state.setIn(
                ['dataSource', 'filter'],
                state.getIn(['dataSource', 'filter']).clear()
            )

        case CHANGE_REPORT_LIST_FILTER:
            return state.mergeIn(
                ['dataSource', 'filter'],
                Immutable.fromJS(action.payload || {})
            )


        case CHANGE_REPORT_LIST_FILTER_FIELD: {
            const {
                name,
                value
            } = action.payload

            return state
                .setIn(['dataSource', 'filter', name], value)
        }
    }

    return state
}
