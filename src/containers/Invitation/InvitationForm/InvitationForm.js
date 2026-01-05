import React, {Component} from 'react'

import PropTypes from 'prop-types'

import {
    pick,
    isNumber
} from 'underscore'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {Form, Button} from 'reactstrap'

import TextField from 'components/Form/TextField/TextField'

import './InvitationForm.scss'

import * as createFormActions from 'redux/auth/password/create/form/createFormActions'
import * as complexityRulesActions from 'redux/auth/password/complexity/rules/complexityRulesActions'

import { Response } from 'lib/utils/AjaxUtils'

import { ReactComponent as Oval } from "images/oval.svg";

function Detail ({ children }) {
    return (
        <div className="Invitation-Detail">
            <Oval className="Invitation-DetailIcon"/>
            <span className="Invitation-DetailText">
                {children}
            </span>
        </div>
    )
}

function mapStateToProps (state) {
    const { auth } = state

    return {
        fields: auth.password.create.form.fields,
        auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            ...bindActionCreators(createFormActions, dispatch),
            complexity: {
                rules: bindActionCreators(complexityRulesActions, dispatch)
            }
        }
    }
}

class InvitationForm extends Component {

    static propTypes = {
        organizationId: PropTypes.number,

        onAcceptSuccess: PropTypes.func,
        onDeclineSuccess: PropTypes.func
    }

    static defaultProps = {
        onAcceptSuccess: () => {},
        onDeclineSuccess: () => {}
    }

    componentDidMount () {
        this.loadPasswordComplexityRules()
    }

    componentWillUnmount () {
        this.clear()
    }

    onChangeField = (field, value) => {
        this
            .props
            .actions
            .changeField(field, value)
    }

    onAccept = (e) => {
        e.preventDefault()

        this.validate()
            .then(success => {
                if (success) {
                    this.accept()
                        .then(Response(
                            this.props.onAcceptSuccess
                        ))
                }
            })
    }

    onDecline = (e) => {
        e.preventDefault()

        this.decline()
            .then(Response(
                this.props.onDeclineSuccess
            ))
    }

    loadPasswordComplexityRules () {
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

    accept () {
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

    decline () {
        const {
            actions,
            fields: { token }
        } = this.props

        return actions.decline(token)
    }

    clear () {
        this.props.actions.clear()
    }

    render () {
        const {
            auth,
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
            <Form autoComplete="OFF" className="InvitationForm">
                <TextField
                    type="password"
                    name="password"
                    value={password}
                    hasError={passwordHasError}
                    errorText={passwordErrorText}
                    className="InvitationForm-TextField"
                    placeholder="Password"
                    autoComplete="new-password"
                    onChange={this.onChangeField}
                />
                <TextField
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    hasError={confirmPasswordHasError}
                    errorText={confirmPasswordErrorText}
                    className="InvitationForm-TextField"
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    onChange={this.onChangeField}
                />
                {isNumber(length) && (
                    <div className='Invitation-PasswordComplexityRules'>
                        <div className="Invitation-Text">
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
                <div className="margin-top-50">
                    <Button
                        outline
                        color='success'
                        className="InvitationForm-Btn"
                        onClick={this.onDecline}>
                        Decline
                    </Button>
                    <Button
                        type="submit"
                        color='success'
                        className="InvitationForm-Btn"
                        onClick={this.onAccept}>
                        Accept
                    </Button>
                </div>
            </Form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitationForm)