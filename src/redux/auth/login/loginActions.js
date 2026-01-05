import { ACTION_TYPES } from 'lib/Constants'
import authService from 'services/AuthService'
import authUserStore from 'lib/stores/AuthUserStore'

const {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    CLEAR_LOGIN_ERROR,
    CLEAR_ALL_AUTH_DATA,
    RESTORE_LOGGED_IN_USER,
} = ACTION_TYPES

export function clearError () {
    return { type: CLEAR_LOGIN_ERROR }
}

export function login (params) {
    return dispatch => {
        dispatch({ type: LOGIN_REQUEST })
        return authService
            .login(params)
            .then(response => {
                dispatch({ type: LOGIN_SUCCESS, payload: response.data })
                authUserStore.save(response.data)
                return response
            })
            .catch(e => {
                dispatch({ type: LOGIN_FAILURE, payload: e })
            })
    }
}

export function restore () {
    return { type: RESTORE_LOGGED_IN_USER, payload: authUserStore.get() }
}

export function remove () {
    authUserStore.clear()
    return { type: CLEAR_ALL_AUTH_DATA }
}