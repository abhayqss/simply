import React, { Component } from 'react'

import cn from 'classnames'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'

import { Button } from 'reactstrap'

import DocumentTitle from 'react-document-title'

import ErrorViewer from 'components/ErrorViewer/ErrorViewer'

import './ResetPassword.scss'

import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm'

import * as resetPasswordFormActions from 'redux/auth/password/reset/form/resetPasswordFormActions'

import { path } from 'lib/utils/ContextUtils'

import logoImg from 'images/logo-big.png'

function mapStateToProps (state) {
    return { form: state.auth.password.reset.form }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            form: bindActionCreators(resetPasswordFormActions, dispatch)
        }
    }
}

class ResetPassword extends Component {

    state = {
        isEmailSent: false,
        shouldRedirectToLogin: false
    }

    onResetPasswordSuccess = () => {
        this.setState({ isEmailSent: true })
    }

    onBackToLoginPage = () => {
        this.navigateToLogin()
    }

    onResetError = () => {
        this.resetError()
    }

    getError () {
        return this.props.form.error
    }

    resetError () {
        this.props.actions.form.clearError()
    }

    navigateToLogin () {
        this.setState({
            shouldRedirectToLogin: true
        })
    }

    render () {
        const {
            isEmailSent,
            shouldRedirectToLogin
        } = this.state

        if (shouldRedirectToLogin) {
            return (
                <Redirect
                    to={{
                        state: { isLoginPopupOpen: true },
                        pathname: path('/marketplace')
                    }}
                />
            )
        }

        const {
            form,
            className
        } = this.props

        const error = this.getError()

        return (
            <DocumentTitle
                title="Simply Connect | Reset Password">
                <div className={cn('ResetPassword', className)}>
                    <div className="ResetPassword-Body">
                        <img
                            alt="logo"
                            className="ResetPassword-LogoImage"
                            src={logoImg}
                        />
                        <div className="d-flex flex-column">
                            <span className="ResetPassword-Title">
                                Reset Your Password
                            </span>
                            <span className="ResetPassword-InfoText">
                                {isEmailSent ? (
                                    <span>
                                        An email with further instructions on resetting your
                                        password has been sent to <b>{form.fields.email}</b>
                                    </span>
                                ) : (
                                    `You can reset your password by providing your company ID and email address.
                                     A link will then be sent to the email provided directing you to reset your password.`
                                )}
                            </span>
                            {isEmailSent ? (
                                <Button
                                    outline
                                    color='success'
                                    className="ResetPasswordForm-Btn"
                                    onClick={this.onBackToLoginPage}>
                                    Back to login
                                </Button>
                            ) : (
                                <ResetPasswordForm
                                    onCancel={this.onBackToLoginPage}
                                    onSubmitSuccess={this.onResetPasswordSuccess}
                                />
                            )}
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)