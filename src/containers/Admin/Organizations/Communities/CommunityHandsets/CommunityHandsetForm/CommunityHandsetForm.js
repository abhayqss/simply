import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import cn from 'classnames'
import PropTypes from 'prop-types'
import {Form, Col, Row} from 'reactstrap'

import * as communityHandsetFormActions from 'redux/community/handset/form/communityHandsetFormActions'

import TextField from 'components/Form/TextField/TextField'

import './CommunityHandsetForm.scss'

function mapStateToProps (state) {
    return {
        error: state.community.handset.form.error,
        fields: state.community.handset.form.fields,
        isValid: state.community.handset.form.isValid,
        isFetching: state.community.handset.form.isFetching
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(communityHandsetFormActions, dispatch)
        }
    }
}

class CommunityHandsetForm extends Component {

    static propTypes = {
        communityHandsetId: PropTypes.number
    }

    componentDidMount () {
    }

    onChangeField = (field, value) => {
        const {actions} = this.props

        actions.changeField(field, value).then(() => {
            if (!this.props.isValid) this.validate()
        })
    }

    validate () {
        const data = this.props.fields.toJS()
        return this.props.actions.validate(data)
    }

    render () {

        const {
            error,
            fields,
            isValid,
            isFetching,
            className
        } = this.props

        const {
            name,
            nameHasError,
            nameErrorText,

            displayName,
            displayNameHasError,
            displayNameErrorText,

            handsetId,
            handsetIdHasError,
            handsetIdErrorText,
        } = fields

        return (
            <Form className={cn('CommunityHandsetForm', className)}>
                <div className="CommunityHandsetForm-Section">
                    <Row>
                        <Col md={8}>
                            <TextField
                                type="text"
                                name="name"
                                value={name}
                                label="Name*"
                                className="CommunityHandsetForm-TextField"
                                hasError={nameHasError}
                                errorText={nameErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type="text"
                                name="displayName"
                                value={displayName}
                                label="Display Name"
                                className="CommunityHandsetForm-TextField"
                                hasError={displayNameHasError}
                                errorText={displayNameErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <TextField
                                type="text"
                                name="handsetId"
                                value={handsetId}
                                label="Handset ID*"
                                className="CommunityHandsetForm-TextField"
                                hasError={handsetIdHasError}
                                errorText={handsetIdErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                </div>
            </Form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityHandsetForm)