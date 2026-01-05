import BaseService from './BaseService'

export class AuthService extends BaseService {
    validateSession () {
        return super.request({
            method: 'GET',
            url: '/auth/session/validate'
        })
    }

    validateInvitationRequestToken (token) {
        return super.request({
            method: 'POST',
            url: '/auth/invitation-request/validate-token',
            type: 'application/x-www-form-urlencoded',
            body: { token }
        })
    }

    validateResetPasswordRequestToken (token) {
        return super.request({
            method: 'POST',
            url: '/auth/reset-password-request/validate-token',
            type: 'application/x-www-form-urlencoded',
            body: { token }
        })
    }

    login (data) {
        return super.request({
            method: 'POST',
            url: '/auth/login',
            body: data,
            type: 'json'
        })
    }

    logout () {
        return super.request({
            method: 'POST',
            url: '/auth/logout'
        })
    }

    declineInvitation (token) {
        return super.request({
            method: 'POST',
            url: '/auth/invitation-request/decline',
            type: 'application/x-www-form-urlencoded',
            body: { token }
        })
    }

    createPassword (data) {
        return super.request({
            method: 'POST',
            url: '/auth/password/create',
            body: data
        })
    }

    resetPassword (data) {
        return super.request({
            method: 'POST',
            url: '/auth/password/reset',
            body: data
        })
    }

    changePassword (data) {
        return super.request({
            method: 'POST',
            url: '/auth/password/change',
            body: data
        })
    }

    requestPasswordReset (data) {
        return super.request({
            method: 'POST',
            url: '/auth/password/reset-request',
            body: data
        })
    }

    findPasswordComplexityRules (params) {
        return super.request({
            method: 'GET',
            params: params,
            url: '/auth/password/complexity-rules',
        })
    }
}

const service = new AuthService()
export default service