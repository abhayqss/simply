import authService from 'services/AuthService'

import { ACTION_TYPES } from 'lib/Constants'

const {
    CLEAR_SESSION_ERROR
} = ACTION_TYPES

export function validate () {
    return () => {
        return authService.validateSession()
    }
}

export function clearError () {
    return { type: CLEAR_SESSION_ERROR }
}