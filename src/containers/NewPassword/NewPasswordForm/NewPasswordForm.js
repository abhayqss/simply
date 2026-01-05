import React, {Component} from 'react'

import PropTypes from 'prop-types'
import { isNumber, pick } from 'underscore'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {Form, Button} from 'reactstrap'

import TextField from 'components/Form/TextField/TextField'

import './NewPasswordForm.scss'

import * as newPasswordFormActions from 'redux/auth/password/new/form/newPasswordFormActions'
import * as complexityRulesActions from 'redux/auth/password/complexity/rules/complexityRulesActions'

import { Response } from 'lib/utils/AjaxUtils'

import { ReactComponent as Oval } from 'images/oval.svg'

function Detail ({ children }) {
    return (
        <div className="NewPassword-Detail">
            <Oval className="NewPassword-DetailIcon" />
            <span className="NewPassword-DetailText">
                {children}
            </span>
        </div>
    )
}

function mapStateToProps (state) {
    const { auth } = state

    const {
        form
    } = auth.password.new

    return {
        error: form.error,
        fields: form.fields,
        auth,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            ...bindActionCreators(newPasswordFormActions, dispatch),
            complexity: {
                rules: bindActionCreators(complexityRulesActions, dispatch)
            }
        }
    }
}

class NewPasswordForm extends Component {

    static propTypes = {
        email: PropTypes.string,
        organizationId: PropTypes.number,

        onCancel: PropTypes.func,
        onSubmitSuccess: PropTypes.func
    }

    static defaultProps = {
        onCancel: () => {},
        onSubmitSuccess: () => {}
    }

    componentDidMount () {
        this.loadComplexityRules()

        this.changeField('email', this.props.email)
    }

    componentWillUnmount () {
        this.clear()
    }

    onChangeField = (name, value) => {
        this.changeField(name, value)
    }

    onSubmit = (e) => {
        e.preventDefault()

        this.validate().then(success => {
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
            organizationId
        } = this.props

        actions.complexity
               .rules
               .load({ organizationId })
    }

    changeField (name, value) {
        this
            .props
            .actions
            .changeField(name, value)
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
                    || k === 'confirmPassword'
                ))
            )
    }

    clear () {
        this.props.actions.clear()
    }

    render () {
        const {
            auth,
            email,
            fields,
        } = this.props

        const {
            password,
            passwordHasError,
            passwordErrorText,

            confirmPassword,
            confirmPasswordHasError,
            confirmPasswordErrorText
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
            <Form className="NewPasswordForm">
                <TextField
                    type="text"
                    name="email"
                    value={email}
                    className="NewPasswordForm-TextField"
                    isDisabled={true}
                />
                <TextField
                    type="password"
                    name="password"
                    value={password}
                    hasError={passwordHasError}
                    errorText={passwordErrorText}
                    className="NewPasswordForm-TextField"
                    placeholder="Password"
                    onChange={this.onChangeField}
                />
                <TextField
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    hasError={confirmPasswordHasError}
                    errorText={confirmPasswordErrorText}
                    className="NewPasswordForm-TextField"
                    placeholder="Confirm Password"
                    onChange={this.onChangeField}
                />
                {isNumber(length) && (
                    <div className='NewPassword-PasswordComplexityRules'>
                        <div className="NewPassword-Text">
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
                <div className="margin-bottom-30">
                    <Button
                        outline
                        color='success'
                        className="NewPasswordForm-Btn"
                        onClick={this.onCancel}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color='success'
                        className="NewPasswordForm-Btn"
                        onClick={this.onSubmit}>
                        Save
                    </Button>
                </div>
            </Form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPasswordForm)