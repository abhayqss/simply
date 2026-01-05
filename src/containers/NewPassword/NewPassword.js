import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import queryString from 'querystring'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'

import cn from 'classnames'
import { Button } from 'reactstrap'
import DocumentTitle from 'react-document-title'

import ErrorViewer from 'components/ErrorViewer/ErrorViewer'

import './NewPassword.scss'

import NewPasswordForm from './NewPasswordForm/NewPasswordForm'

import * as loginFormActions from 'redux/login/form/loginFormActions'
import * as newPasswordFormActions from 'redux/auth/password/new/form/newPasswordFormActions'
import * as resetPasswordRequestTokenActions from 'redux/auth/password/reset/request/token/resetPasswordRequestTokenActions'

import { path } from 'lib/utils/ContextUtils'

import logoImg from 'images/logo-big.png'

function getParams (url) {
    return queryString.parse(url.split('?')[1])
}

function mapStateToProps (state) {
    const { auth } = state

    const {
        form
    } = auth.password.new

    return { form, auth }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            form: bindActionCreators(newPasswordFormActions, dispatch),

            request: {
                token: bindActionCreators(resetPasswordRequestTokenActions, dispatch)
            },

            login: {
                form: bindActionCreators(loginFormActions, dispatch)
            }
        }
    }
}

class NewPassword extends Component {

    state = {
        isLinkExpired: false,
        isPasswordChanged: false,
        shouldRedirectToLogin: false
    }

    componentDidMount () {
        const { search } = this.props.location

        if (search) {
            const { token } = getParams(search)

            this.changeFormField('token', token)

            this.validateRequestToken(token)
                .catch(this.onCancel)
        }

        else this.cancel()
    }

    onResetError = () => {
        this.resetError()
    }

    onCreatePasswordSuccess = () => {
        this.clearLoginFormFields()

        this.setState({
            isPasswordChanged: true,
            shouldRedirectToLogin: true
        })
    }

    onCancel = () => {
        this.cancel()
    }

    getError () {
        return this.props.form.error
    }

    resetError () {
        this.props.actions.form.clearError()
    }

    changeFormField (name, value) {
        this.props
            .actions
            .form
            .changeField(name, value)
    }

    clearLoginFormFields () {
        this.props
            .actions
            .login
            .form
            .clear()
    }

    validateRequestToken (token) {
        return this.props
                   .actions
                   .request
                   .token
                   .validate(token)
    }

    cancel () {
        this.setState({
            shouldRedirectToLogin: true
        })
    }

    render () {
        const {
            className,
            location: { search }
        } = this.props

        const {
            isLinkExpired,
            isPasswordChanged,
            shouldRedirectToLogin
        } = this.state

        if (shouldRedirectToLogin) {
            return (
                <Redirect
                    to={{
                        pathname: path('/marketplace'),
                        state: { isLoginPopupOpen: true, isPasswordChanged }
                    }}
                />
            )
        }

        const {
            email,
            organizationId
        } = getParams(search) || {}

        const error = this.getError()

        return (
            <DocumentTitle
                title="Simply Connect | Create New Password">
                <div className={cn('NewPassword', className)}>
                    {isLinkExpired ? (
                        <div className="NewPassword-Body">
                            <img
                                alt="logo"
                                className="NewPassword-LogoImage"
                                src={logoImg}
                            />
                            <div className="d-flex flex-column">
                                <span style={{ marginTop: 25 }} className="NewPassword-Title">
                                    Link has been expired
                                </span>
                                <span className="NewPassword-InfoText">
                                    The invitation link has been expired. Please
                                    contact your Administrator for more details.
                                </span>
                                <Button
                                    outline
                                    color='success'
                                    className="NewPassword-Btn"
                                    onClick={this.onCancel}>
                                    Back to login
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="NewPassword-Body">
                            <img
                                alt="logo"
                                className="NewPassword-LogoImage"
                                src={logoImg}
                            />
                            <div className="d-flex flex-column">
                                <span className="NewPassword-Title">
                                    Create New Password
                                </span>
                                <span className="NewPassword-InfoText">
                                    You are creating a new password for the Simply Connect Platform
                                </span>
                                <NewPasswordForm
                                    email={email}
                                    organizationId={organizationId}
                                    onCancel={this.onCancel}
                                    onSubmitSuccess={this.onCreatePasswordSuccess}
                                />
                            </div>
                        </div>
                    )}
                    {error && (
                        <ErrorViewer
                            isOpen
                            error={error}
                            onClose={this.onResetError}
                        />
                    )}
                </div>
            </DocumentTitle>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPassword))