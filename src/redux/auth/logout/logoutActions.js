import { ACTION_TYPES } from 'lib/Constants'
import authService from 'services/AuthService'
import authUserStore from 'lib/stores/AuthUserStore'

const {
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    CLEAR_LOGOUT_ERROR
} = ACTION_TYPES

export function clearError() {
    return { type: CLEAR_LOGOUT_ERROR }
}

export function logout () {
    return dispatch => {
        dispatch({ type: LOGOUT_REQUEST })
        return authService.logout()
            .then(response => {
                dispatch({ type: LOGOUT_SUCCESS })
                authUserStore.clear()
                return response
            })
            .catch(e => {
                dispatch({ type: LOGOUT_FAILURE, payload: e })
            })
    }
}