import React, { Component } from 'react'

import {
    map,
    reject
} from 'underscore'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Collapse } from 'reactstrap'

import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import { Row, Col, Button } from 'reactstrap'

import Logo from 'components/Logo/Logo'
import User from 'components/User/User'
import Notifier from 'components/Notifier/Notifier'

import './NavigationBar.scss'

import LoginForm from '../LoginForm/LoginForm'
import OldPasswordForm from '../OldPasswordForm/OldPasswordForm'

import * as loginActions from 'redux/auth/login/loginActions'
import * as logoutActions from 'redux/auth/logout/logoutActions'
import * as loginFormActions from 'redux/login/form/loginFormActions'
import * as canViewReportActions from 'redux/report/can/view/canViewReportActions'
import * as oldPasswordFormActions from 'redux/auth/password/old/form/oldPasswordFormActions'

import {
    SERVER_ERROR_CODES,
    PROFESSIONAL_SYSTEM_ROLES
} from 'lib/Constants'

import { path } from 'lib/utils/ContextUtils'

import userImg from 'images/user.png'
import { ReactComponent as Close } from 'images/delete.svg'

const { EXPIRED_CREDENTIALS } = SERVER_ERROR_CODES

const NAV_ITEMS = [
    { name: 'DASHBOARD', title: 'Dashboard', href: '/dashboard' },
    { name: 'CLIENTS', title: 'Clients', href: '/clients' },
    { name: 'ALERTS', title: 'Alerts', href: '/alerts' },
    { name: 'EVENTS', title: 'Events', href: '/events' },
    { name: 'SCHEDULING', title: 'Scheduling', href: '/scheduling' },
    { name: 'REPORTS', title: 'Reports', href: '/reports' },
    { name: 'ADMIN', title: 'Admin', href: '/admin' }
]

function mapStateToProps (state) {
    const { auth, login, report } = state
    return { auth, login, report }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            login: {
                ...bindActionCreators(loginActions, dispatch),
                form: bindActionCreators(loginFormActions, dispatch)
            },
            logout: bindActionCreators(logoutActions, dispatch),
            old: {
                password: {
                    form: bindActionCreators(oldPasswordFormActions, dispatch)
                }
            },
            report: {
                can: {
                    view: bindActionCreators(canViewReportActions, dispatch)
                }
            }
        }
    }
}

class NavigationBar extends Component {
    state = {
        isLoginPopupOpen: false,
        isSessionExpired: false,
        isPasswordChanged: false,
        isPasswordExpired: false
    }

    componentDidMount () {
        if (this.authUser) {
            this.canViewReports()
        }

        const {
            state
        } = this.props.location

        if (state) {
            this.setState({
                isLoginPopupOpen: state.isLoginPopupOpen,
                isSessionExpired: state.isSessionExpired,
                isPasswordChanged: state.isPasswordChanged,
                isPasswordExpired: state.isPasswordExpired
            })
        }
    }

    componentDidUpdate (prevProps) {
        if (this.authUser && !prevProps.auth.login.user.data) {
            this.canViewReports()
        }

        const { location, auth: { login } } = this.props

        const state = location.state || {}
        const prevState = prevProps.location.state || {}

        if (state.isLoginPopupOpen && !prevState.isLoginPopupOpen) {
            this.setState({ isLoginPopupOpen: true })
        }

        if (state.isSessionExpired && !prevState.isSessionExpired) {
            this.setState({ isSessionExpired: true })
        }

        if (state.isPasswordChanged && !prevState.isPasswordChanged) {
            this.setState({ isPasswordChanged: true })
        }

        if (state.isPasswordExpired && !prevState.isPasswordExpired) {
            this.setState({ isPasswordExpired: true })
        }

        if (login.error && !prevProps.auth.login.error) {
            if (login.error.code === EXPIRED_CREDENTIALS) {
                this.clearLoginError()
                this.setState({ isPasswordExpired: true })
            }

            else this.setState({
                isSessionExpired: false,
                isPasswordExpired: false,
                isPasswordChanged: false
            })
        }
    }

    onOpenLoginPopup = () => {
        this.setState({
            isLoginPopupOpen: true
        })
    }

    onCloseLoginPopup = () => {
        this.setState({
            isLoginPopupOpen: false,
            isSessionExpired: false,
            isPasswordChanged: false,
            isPasswordExpired: false
        })

        this.clearLoginError()

        this.clearLoginForm()
        this.clearOldPasswordForm()
    }

    onLoginSuccess = () => {
        this.setState({
            isLoginPopupOpen: false
        })

        this.props
            .history
            .push(path('/dashboard'))
    }

    onLogout = () => {
        this.logout().then(() => {
            this.props
                .history
                .push(path('/marketplace'))
        })
    }

    onChangePasswordSuccess = () => {
        this.setState({
            isPasswordExpired: false
        })

        this.clearLoginError()
    }

    get actions () {
        return this.props.actions
    }

    get error () {
        const {
            login, password
        } = this.props.auth

        return login.error || password.old.form.error
    }

    get authUser () {
        return this.props.auth.login.user.data
    }

    clearErrors () {
        this.clearLoginError()
        this.clearOldPasswordFormError()
    }

    canViewReports () {
        this.actions.report.can.view
            .load()
    }

    logout () {
        return this.actions.logout
                   .logout()
    }

    clearLoginError () {
        return this.actions.login
                   .clearError()
    }

    clearLoginForm () {
        this.actions.login.form
            .clear()
    }

    clearOldPasswordForm () {
        this.actions.old.password.form
            .clear()
    }

    clearOldPasswordFormError () {
        this.actions.old.password.form
            .clearError()
    }

    render () {
        const {
            report,
            location
        } = this.props

        const {
            isLoginPopupOpen,
            isSessionExpired,
            isPasswordChanged,
            isPasswordExpired
        } = this.state

        const user = this.authUser

        const hasNotifications = true

        let content = null

        if (user) {
            content = (
                <div className='d-flex align-items-center'>
                    <Logo
                        iconSize={55}
                        className='NavigationBar-Logo'
                    />
                    <ul className='Navigation'>
                        {map(
                            reject(NAV_ITEMS, ({ name }) => (
                                (name === 'ADMIN' && !PROFESSIONAL_SYSTEM_ROLES.includes(user.roleName)) ||
                                (name === 'REPORTS' && !report.can.view.value)
                            )),
                            o => (
                                <li key={o.href} className='Navigation-Item'>
                                    <Link
                                        to={path(o.href)}
                                        style={location.pathname.includes(path(o.href)) ? { color: '#F36C32' } : {}}>
                                        {o.title}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                    <Notifier
                        isActive={hasNotifications}
                        iconSize={33}
                        className='NavigationBar-Notifier'
                    />
                    <User
                        name={`${user.firstName} ${user.lastName}`}
                        role={user.roleTitle}
                        avatarSrc={userImg}
                        onSignOut={this.onLogout}
                    />
                </div>
            )
        }

        else {
            const {
                username,
                companyId
            } = this.props.login.form.fields

            content = (
                <div className='d-flex align-items-center'>
                    <div className="NavigationBarLoginPopup">
                        <Collapse isOpen={isLoginPopupOpen}>
                            <div className='NavigationBarLoginPopup-Body'>
                                <Row>
                                    <Col md={4}>
                                        <Logo
                                            iconSize={55}
                                            className='NavigationBar-Logo'
                                        />
                                    </Col>
                                    <Col md={4}>
                                        {isPasswordExpired ? (
                                            <>
                                                <span className="NavigationBar-OldPasswordTitle">
                                                    Create New Password
                                                </span>
                                                <div className="d-flex flex-column">
                                                <span className="NavigationBar-OldPasswordInfoText">
                                                    Your password for {companyId}, {username} has expired and must be changed
                                                </span>
                                                    <OldPasswordForm
                                                        companyId={companyId}
                                                        onCancel={this.onCloseLoginPopup}
                                                        onSubmitSuccess={this.onChangePasswordSuccess}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <LoginForm
                                                onLoginSuccess={this.onLoginSuccess}
                                            />
                                        )}
                                        {this.error && this.error.code !== EXPIRED_CREDENTIALS && (
                                            <div className='NavigationBar-Alert'>
                                                {this.error.message}
                                            </div>
                                        )}
                                        {isPasswordChanged && (
                                            <div className="NavigationBar-Alert">
                                                The password has been changed. Please log in with the new credentials
                                            </div>
                                        )}
                                        {isSessionExpired && (
                                            <div className="NavigationBar-Alert">
                                                You have been logged out due to inactivity. Please login again
                                            </div>
                                        )}
                                    </Col>
                                    <Col md={4}>
                                        <Close
                                            onClick={this.onCloseLoginPopup}
                                            className="NavigationBar-CloseLoginPopupBtn"
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Collapse>
                    </div>
                    <Logo
                        iconSize={55}
                        className='NavigationBar-Logo'
                    />
                    <Button
                        color='success'
                        className="NavigationBar-LoginBtn"
                        onClick={this.onOpenLoginPopup}>
                        Sign in
                    </Button>
                </div>
            )
        }

        return (
            <div className='NavigationBar'>
                {content}
            </div>
        )
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
)