import authService from 'services/AuthService'

export function validate(token) {
    return () => {
        return authService.validateResetPasswordRequestToken(token)
    }
}