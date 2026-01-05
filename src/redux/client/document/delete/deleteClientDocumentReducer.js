import { ACTION_TYPES } from 'lib/Constants'

import InitialState from './DeleteClientDocumentInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_DELETE_CLIENT_DOCUMENT,
    CLEAR_DELETE_CLIENT_DOCUMENT_ERROR,

    LOAD_DELETE_CLIENT_DOCUMENT_REQUEST,
    LOAD_DELETE_CLIENT_DOCUMENT_SUCCESS,
    LOAD_DELETE_CLIENT_DOCUMENT_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function clientDeleteDocumentReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_DELETE_CLIENT_DOCUMENT:
            return state.removeIn(['data'])
                .removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)

        case CLEAR_DELETE_CLIENT_DOCUMENT_ERROR:
            return state.removeIn(['error'])

        case LOAD_DELETE_CLIENT_DOCUMENT_REQUEST:
            return state.setIn(['isFetching'], true)
                .setIn(['shouldReload'], false)
                .setIn(['error'], null)

        case LOAD_DELETE_CLIENT_DOCUMENT_SUCCESS:
            return state.setIn(['isFetching'], false)
                .setIn(['data'], action.payload)

        case LOAD_DELETE_CLIENT_DOCUMENT_FAILURE:
            return state.setIn(['isFetching'], false)
                .setIn(['error'], action.payload)
    }
    return state
}