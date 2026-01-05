import React, { Component } from 'react'

import { pick } from 'underscore'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Form, Button } from 'reactstrap'

import TextField from 'components/Form/TextField/TextField'

import './ResetPasswordForm.scss'

import * as resetPasswordFormActions from 'redux/auth/password/reset/form/resetPasswordFormActions'

import { Response } from 'lib/utils/AjaxUtils'

function mapStateToProps (state) {
    return {
        fields: state.auth.password.reset.form.fields
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(resetPasswordFormActions, dispatch)
        }
    }
}

class ResetPasswordForm extends Component {

    static propTypes = {
        onCancel: PropTypes.func,
        onSubmitSuccess: PropTypes.func
    }

    static defaultProps = {
        onCancel: () => {},
        onSubmitSuccess: () => {}
    }

    componentDidMount () {
        this.clear()
    }

    onChangeFiled = (name, value) => {
        this.changeField(name, value)
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

    onCancel = () => {
        this.props.onCancel()
    }

    changeField (name, value) {
        this
            .props
            .actions
            .changeField(name, value)
    }

    validate () {
        const {
            fields,
            actions
        } = this.props

        return actions.validate(
            fields.toJS()
        )
    }

    submit () {
        const {
            fields,
            actions
        } = this.props

        return actions
            .submit(
                pick(
                    fields.toJS(),
                    (v, k) => !(
                        k.includes('HasError') || k.includes('ErrorText')
                    )
                )
            )
    }

    clear () {
        this
            .props
            .actions
            .clear()
    }

    render () {
        const {
            companyId,
            companyIdHasError,
            companyIdErrorText,

            email,
            emailHasError,
            emailErrorText
        } = this.props.fields

        return (
            <Form className="ResetPasswordForm">
                <TextField
                    type="text"
                    name="companyId"
                    value={companyId}
                    hasError={companyIdHasError}
                    errorText={companyIdErrorText}
                    className="ResetPasswordForm-TextField"
                    placeholder="Company ID"
                    onChange={this.onChangeFiled}
                />
                <TextField
                    type="text"
                    name="email"
                    value={email}
                    hasError={emailHasError}
                    errorText={emailErrorText}
                    className="ResetPasswordForm-TextField"
                    placeholder="Email"
                    onChange={this.onChangeFiled}
                />
                <div className="margin-top-30">
                    <Button
                        outline
                        color='success'
                        className="ResetPasswordForm-Btn"
                        onClick={this.onCancel}>
                        Back to login
                    </Button>
                    <Button
                        type="submit"
                        color='success'
                        className="ResetPasswordForm-Btn"
                        onClick={this.onSubmit}>
                        Send email
                    </Button>
                </div>
            </Form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm)