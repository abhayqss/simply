import { ACTION_TYPES } from 'lib/Constants'
import LoginInitialState from './LogoutInitialState'

const {
    CLEAR_ALL_AUTH_DATA,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    CLEAR_LOGOUT_ERROR
} = ACTION_TYPES

const initialState = new LoginInitialState()

export default function logoutReducer (state = initialState, action) {
    if (!(state instanceof LoginInitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
            return state.clear()

        case CLEAR_LOGOUT_ERROR:
            return state
                .removeIn(['error'])

        case LOGOUT_REQUEST:
            return state
                .setIn(['isFetching'], true)

        case LOGOUT_FAILURE:
            return state
                .setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
    }

    return state
}
