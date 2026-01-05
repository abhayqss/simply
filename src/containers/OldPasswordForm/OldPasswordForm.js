import React, {Component} from 'react'

import PropTypes from 'prop-types'
import { isNumber, pick } from 'underscore'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {Form, Button} from 'reactstrap'

import TextField from 'components/Form/TextField/TextField'

import './OldPasswordForm.scss'

import * as oldPasswordFormActions from 'redux/auth/password/old/form/oldPasswordFormActions'
import * as complexityRulesActions from 'redux/auth/password/complexity/rules/complexityRulesActions'

import { Response } from 'lib/utils/AjaxUtils'

import { ReactComponent as Oval } from 'images/oval.svg'

function Detail ({ children }) {
    return (
        <div className="OldPassword-Detail">
            <Oval className="OldPassword-DetailIcon"/>
            <span className="OldPassword-DetailText">
                {children}
            </span>
        </div>
    )
}

function mapStateToProps (state) {
    const { password } = state.auth

    return {
        error: password.old.form.error,
        fields: password.old.form.fields,
        isValid: password.old.form.isValid,
        isFetching: password.old.form.isFetching,

        auth: state.auth,
        login: state.login
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            ...bindActionCreators(oldPasswordFormActions, dispatch),

            auth: {
                password: {
                    complexity: {
                        rules: bindActionCreators(complexityRulesActions, dispatch)
                    }
                }
            }
        }
    }
}

class OldPasswordForm extends Component {

    static propTypes = {
        companyId: PropTypes.number,
        
        onCancel: PropTypes.func,
        onSubmitSuccess: PropTypes.func
    }

    static defaultProps = {
        onCancel: () => {},
        onSubmitSuccess: () => {}
    }

    componentDidMount () {
        this.loadComplexityRules()

        const {
            username,
            companyId
        } = this.props.login.form.fields

        this.changeFields({
            username, companyId
        })
    }

    onChangeField = (name, value) => {
        this.changeField(name, value)
    }

    onChangeFields = (changes) => {
        this.changeFields(changes)
    }

    onSubmit = (e) => {
        e.preventDefault()

        this.validate()
            .then(success => {
                if (success) {
                    this.submit()
                        .then(Response(this.props.onSubmitSuccess))
                }
            })
    }

    onCancel = (e) => {
        e.preventDefault()
        this.props.onCancel(e)
    }

    loadComplexityRules () {
        const {
            actions,
            companyId
        } = this.props

        actions
            .auth
            .password
            .complexity
            .rules
            .load({ companyId })
    }

    changeField (name, value) {
        this
            .props
            .actions
            .changeField(name, value)
    }

    changeFields (changes) {
        this
            .props
            .actions
            .changeFields(changes)
    }

    submit () {
        const {
            fields,
            actions
        } = this.props

        return actions
            .submit(
                pick(fields.toJS(), (v, k) => !(
                    k.includes('HasError')
                    || k.includes('ErrorText')
                    || k === 'confirmNewPassword'
                ))
            )
    }

    validate () {
        const {
            auth,
            fields,
            actions
        } = this.props

        return actions.validate(
            fields.toJS(),
            auth.password
                .complexity
                .rules
                .data || {}
        )
    }

    render () {
        const {
            auth,
            fields
        } = this.props

        const {
            password,
            passwordHasError,
            passwordErrorText,

            newPassword,
            newPasswordHasError,
            newPasswordErrorText,

            confirmNewPassword,
            confirmNewPasswordHasError,
            confirmNewPasswordErrorText
        } = fields

        const {
            length,
            upperCaseCount,
            lowerCaseCount,
            alphabeticCount,
            arabicNumeralCount,
            nonAlphaNumeralCount
        } = auth.password.complexity.rules.data || {}

        return (
            <Form className="OldPasswordForm">
                <TextField
                    type="password"
                    name="password"
                    value={password}
                    hasError={passwordHasError}
                    errorText={passwordErrorText}
                    className="OldPasswordForm-TextField"
                    placeholder="Old password"
                    onChange={this.onChangeField}
                />
                <TextField
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    hasError={newPasswordHasError}
                    errorText={newPasswordErrorText}
                    className="OldPasswordForm-TextField"
                    placeholder="New password"
                    onChange={this.onChangeField}
                />
                <TextField
                    type="password"
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    hasError={confirmNewPasswordHasError}
                    errorText={confirmNewPasswordErrorText}
                    className="OldPasswordForm-TextField"
                    placeholder="Confirm password"
                    onChange={this.onChangeField}
                />
                {isNumber(length) && (
                    <div className='OldPassword-PasswordComplexityRules'>
                        <div className="OldPassword-Text">
                            Password requirements:
                        </div>
                        <Detail>{length} characters minimum</Detail>
                        {arabicNumeralCount > 0 && (
                            <Detail>{arabicNumeralCount} number(s)</Detail>
                        )}
                        {nonAlphaNumeralCount > 0 && (
                            <Detail>{nonAlphaNumeralCount} special symbol(s) (e.g. @#$%!)</Detail>
                        )}
                        {alphabeticCount > 0 && (
                            <Detail>{alphabeticCount} alphabetic character(s) minimum</Detail>
                        )}
                        {(lowerCaseCount > 0) && (
                            <Detail>{lowerCaseCount} lowercase character(s)</Detail>
                        )}
                        {(upperCaseCount > 0) && (
                            <Detail>{upperCaseCount} uppercase character(s)</Detail>
                        )}
                        <Detail>No spaces</Detail>
                    </div>
                )}
                <div className="margin-top-20 margin-bottom-30">
                    <Button
                        outline
                        color='success'
                        className="OldPasswordForm-Btn"
                        onClick={this.onCancel}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color='success'
                        className="OldPasswordForm-Btn"
                        onClick={this.onSubmit}>
                        Change
                    </Button>
                </div>
            </Form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OldPasswordForm)