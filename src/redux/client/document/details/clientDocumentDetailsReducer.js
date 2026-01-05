import { ACTION_TYPES } from 'lib/Constants'

import InitialState from './ClientDocumentDetailsInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CLIENT_DOCUMENT_DETAILS,
    CLEAR_CLIENT_DOCUMENT_DETAILS_ERROR,

    LOAD_CLIENT_DOCUMENT_DETAILS_REQUEST,
    LOAD_CLIENT_DOCUMENT_DETAILS_SUCCESS,
    LOAD_CLIENT_DOCUMENT_DETAILS_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function clientDocumentDetailsReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CLIENT_DOCUMENT_DETAILS:
            return state.removeIn(['data'])
                .removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)

        case CLEAR_CLIENT_DOCUMENT_DETAILS_ERROR:
            return state.removeIn(['error'])

        case LOAD_CLIENT_DOCUMENT_DETAILS_REQUEST:
            return state.setIn(['isFetching'], true)
                .setIn(['shouldReload'], false)
                .setIn(['error'], null)

        case LOAD_CLIENT_DOCUMENT_DETAILS_SUCCESS:
            return state.setIn(['isFetching'], false)
                .setIn(['data'], action.payload)

        case LOAD_CLIENT_DOCUMENT_DETAILS_FAILURE:
            return state.setIn(['isFetching'], false)
                .setIn(['error'], action.payload)
    }
    return state
}