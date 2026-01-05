import { ACTION_TYPES } from 'lib/Constants'
import LoginInitialState from './LoginInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    CLEAR_LOGIN_ERROR,
    RESTORE_LOGGED_IN_USER
} = ACTION_TYPES

const initialState = new LoginInitialState()

export default function loginReducer (state = initialState, action) {
    if (!(state instanceof LoginInitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
            return state.clear()

        case CLEAR_LOGIN_ERROR:
            return state
                .removeIn(['error'])

        case LOGIN_REQUEST:
            return state
                .setIn(['isFetching'], true)

        case LOGIN_SUCCESS:
        case RESTORE_LOGGED_IN_USER:
            return state
                .setIn(['isFetching'], false)
                .setIn(['user', 'data'], action.payload)

        case LOGIN_FAILURE:
            return state
                .setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
    }

    return state
}
