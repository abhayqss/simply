import LoginInitialState from './SessionInitialState'

import {
    ACTION_TYPES,
    SERVER_ERROR_CODES
} from 'lib/Constants'

const initialState = new LoginInitialState()

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,
    CLEAR_SESSION_ERROR
} = ACTION_TYPES

const {
    UNAUTHORIZED,
    ACCOUNT_INACTIVE
} = SERVER_ERROR_CODES

const SESSION_ERROR_CODES = [
    UNAUTHORIZED,
    ACCOUNT_INACTIVE
]

export default function sessionReducer (state = initialState, action) {
    if (!(state instanceof LoginInitialState)) {
        return initialState.mergeDeep(state)
    }

    if (action.type.includes('FAILURE')) {
        const error = action.payload || {}

        if (SESSION_ERROR_CODES.includes(error.code)) {
            return state.setIn(['error'], error)
        }
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
            return state.clear()

        case CLEAR_SESSION_ERROR:
            return state
                .removeIn(['error'])
    }

    return state
}
