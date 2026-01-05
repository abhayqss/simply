import React, {Component} from 'react'

import PropTypes from 'prop-types'
import { omit } from 'underscore'

import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {bindActionCreators} from 'redux'

import {Form, Button} from 'reactstrap'

import TextField from 'components/Form/TextField/TextField'

import './LoginForm.scss'

import * as loginActions from 'redux/auth/login/loginActions'
import * as loginFormActions from 'redux/login/form/loginFormActions'

import { path } from 'lib/utils/ContextUtils'

function mapStateToProps (state) {
    const {
        auth,
        login: { form }
    } = state
    
    return {
        fields: form.fields,
        auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            ...bindActionCreators(loginFormActions, dispatch),
            auth: {
                login: bindActionCreators(loginActions, dispatch)
            }
        }
    }
}

class LoginForm extends Component {

    static propTypes = {
        onLoginSuccess: PropTypes.func
    }

    static defaultProps = {
        onLoginSuccess: () => {}
    }

    onChangeField = (name, value) => {
        this.changeField(name.split('-')[0], value)
    }

    onLogin = e => {
        e.preventDefault()

        this.validate().then(success => {
            if (success) {
                this.login().then(({ success } = {}) => {
                    if (success) {
                        this.props.onLoginSuccess()
                    }
                })
            }
        })
    }

    changeField (name, value) {
        this.props
            .actions
            .changeField(name, value)
    }

    validate () {
        const {
            actions,
            fields
        } = this.props

        return actions.validate(
            fields.toJS()
        )
    }

    login () {
        const {
            fields,
            actions
        } = this.props

        return actions
            .auth
            .login
            .login(omit(
                fields.toJS(),
                (v, k) => k.includes('Error')
            ))
    }

    render () {
        const {
            companyId,
            companyIdHasError,
            companyIdErrorText,
            
            username,
            usernameHasError,
            usernameErrorText,
            
            password,
            passwordHasError,
            passwordErrorText
        } = this.props.fields
        
        return (
            <Form autoComplete="OFF" className="LoginForm text-left">
                <TextField
                    type="text"
                    name="companyId"
                    value={companyId}
                    className="LoginForm-TextField"
                    label="Company ID"
                    hasError={companyIdHasError}
                    errorText={companyIdErrorText}
                    onChange={this.onChangeField}
                />
                <TextField
                    type="text"
                    name="username"
                    value={username}
                    hasError={usernameHasError}
                    errorText={usernameErrorText}
                    className="LoginForm-TextField"
                    label="Login"
                    onChange={this.onChangeField}
                />
                <TextField
                    readonly
                    type="password"
                    name="password"
                    value={password}
                    hasError={passwordHasError}
                    errorText={passwordErrorText}
                    className="LoginForm-TextField"
                    label="Password"
                    onChange={this.onChangeField}
                />
                <div className="d-flex justify-content-between align-items-center margin-bottom-20">
                    <Link className="LoginForm-ForgetPasswordLink"
                          to={path("/reset-password-request")}>
                        Forgot Password?
                    </Link>
                    <Button
                        type="submit"
                        color='success'
                        className="LoginForm-LoginBtn"
                        onClick={this.onLogin}>
                        Sign in
                    </Button>
                </div>
            </Form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)