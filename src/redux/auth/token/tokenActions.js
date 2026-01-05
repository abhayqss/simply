import { ACTION_TYPES } from 'lib/Constants'
import authService from 'services/AuthService'

const {
    VALIDATE_TOKEN_REQUEST,
    VALIDATE_TOKEN_SUCCESS,
    VALIDATE_TOKEN_FAILURE,
} = ACTION_TYPES

export function validate() {
    return dispatch => {
        dispatch({type: VALIDATE_TOKEN_REQUEST})

        return authService.validateToken()
            .then(response => {
                dispatch({type: VALIDATE_TOKEN_SUCCESS})
                return response
            })
            .catch((e) => {
                dispatch({type: VALIDATE_TOKEN_FAILURE, payload: e })
                throw e
            })
    }
}