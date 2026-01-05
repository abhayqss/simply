import InitialState from './ReportDocumentInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_REPORT_DOCUMENT,
    CLEAR_REPORT_DOCUMENT_ERROR,
    DOWNLOAD_REPORT_DOCUMENT_REQUEST,
    DOWNLOAD_REPORT_DOCUMENT_SUCCESS,
    DOWNLOAD_REPORT_DOCUMENT_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function noteListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_REPORT_DOCUMENT:
            return state.clear()

        case CLEAR_REPORT_DOCUMENT_ERROR:
            return state.removeIn(['error'])

        case DOWNLOAD_REPORT_DOCUMENT_REQUEST:
            return state
                .setIn(['error'], null)
                .setIn(['shouldReload'], false)
                .setIn(['isFetching'], true)

        case DOWNLOAD_REPORT_DOCUMENT_SUCCESS:
            return state
                .setIn(['isFetching'], false)

        case DOWNLOAD_REPORT_DOCUMENT_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
