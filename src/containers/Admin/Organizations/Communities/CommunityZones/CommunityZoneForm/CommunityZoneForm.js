import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import cn from 'classnames'
import PropTypes from 'prop-types'
import {Form, Col, Row} from 'reactstrap'

import * as communityZoneFormActions from 'redux/community/zone/form/communityZoneFormActions'

import TextField from 'components/Form/TextField/TextField'
import SelectField from "components/Form/SelectField/SelectField";

import './CommunityZoneForm.scss'

function mapStateToProps (state) {
    return {
        error: state.community.zone.form.error,
        fields: state.community.zone.form.fields,
        isValid: state.community.zone.form.isValid,
        isFetching: state.community.zone.form.isFetching
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(communityZoneFormActions, dispatch)
        }
    }
}

class CommunityZoneForm extends Component {

    static propTypes = {
        communityZoneId: PropTypes.number
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

            sound,
            soundHasError,
            soundErrorText,

            soundCount,
            soundCountHasError,
            soundCountErrorText,

            soundInterval,
            soundIntervalHasError,
            soundIntervalErrorText,
        } = fields

        return (
            <Form className={cn('CommunityZoneForm', className)}>
                <div className="CommunityZoneForm-Section">
                    <Row>
                        <Col md={6}>
                            <TextField
                                type="text"
                                name="name"
                                value={name}
                                label="Name*"
                                className="CommunityZoneForm-TextField"
                                hasError={nameHasError}
                                errorText={nameErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={3}>
                            <SelectField
                                type="text"
                                name="sound"
                                value={sound}
                                options={[]}
                                placeholder={"Select Sound"}
                                isMultiple={false}
                                label="Sound*"
                                className="CommunityZoneForm-TextField"
                                hasError={soundHasError}
                                errorText={soundErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={3}>
                            <TextField
                                type="text"
                                name="soundCount"
                                value={soundCount}
                                label="Sound Count*"
                                className="CommunityZoneForm-TextField"
                                hasError={soundCountHasError}
                                errorText={soundCountErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <SelectField
                                name="soundInterval"
                                value={soundInterval}
                                options={[]}
                                isMultiple={false}
                                label="Sound Interval*"
                                className="CommunityZoneForm-TextField"
                                hasError={soundIntervalHasError}
                                errorText={soundIntervalErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                </div>
            </Form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityZoneForm)