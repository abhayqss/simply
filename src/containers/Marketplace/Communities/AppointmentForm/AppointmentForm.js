import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {
    map,
    filter,
    groupBy,
    findWhere
} from 'underscore'

import cn from 'classnames'
import PropTypes from 'prop-types'
import {Form, Col, Row, Tooltip} from 'reactstrap'

import Loader from 'components/Loader/Loader'
import TextField from 'components/Form/TextField/TextField'
import DateField from 'components/Form/DateField/DateField'
import SelectField from 'components/Form/SelectField/SelectField'
import CheckboxField from 'components/Form/CheckboxField/CheckboxField'

import './AppointmentForm.scss'

import * as treatmentServiceListActions from 'redux/directory/treatment/service/list/treatmentServiceListActions'
import * as marketplaceCommunityAppointmentFormActions from 'redux/marketplace/community/appointment/form/marketplaceCommunityAppointmentFormActions'

import { Time } from 'lib/utils/Utils'

import { ReactComponent as Info } from 'images/info.svg'

const MIN_VALIDATION_INTERVAL = 700

const time = new Time()

function mapStateToProps (state) {
    const { appointment } = state.marketplace.community

    return {
        error: appointment.form.error,
        fields: appointment.form.fields,
        isValid: appointment.form.isValid,
        isFetching: appointment.form.isFetching,

        directory: state.directory
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(marketplaceCommunityAppointmentFormActions, dispatch),
            directory: {
                treatment: {
                    service: { list: bindActionCreators(treatmentServiceListActions, dispatch) }
                }
            }
        }
    }
}

class AppointmentForm extends Component {

    static propTypes = {
        communityId: PropTypes.number
    }

    state = {
        isPhoneTooltipOpen: false
    }

    timeout = null

    componentDidMount () {
        const {
            communityName,
            organizationName
        } = this.props

        this.changeField('community', communityName)
        this.changeField('organization', organizationName)

        this.loadDirectoryData()
    }

    onChangeField = (name, value) => {
        this.changeField(name, value).then(() => {
            this.validateIfRequired()
        })
    }

    onChangeDateField = (name, value) => {
        this.changeField(name, value ? value.getTime() : null).then(() => {
            const {
                isValid,
                submitCount
            } = this.props

            if (submitCount > 0 && !isValid) this.validate()
        })
    }

    onOverPhoneInfoIcon = () => {
        this.setState({ isPhoneTooltipOpen: true })
    }

    onLeavePhoneInfoIcon = () => {
        this.setState({ isPhoneTooltipOpen: false })
    }

    loadDirectoryData () {
        const {
            primaryFocusIds
        } = this.props

        const {
            treatment
        } = this.props.actions.directory

        treatment.service.list.load(primaryFocusIds)
    }

    changeField (name, value) {
        return this.props.actions.changeField(name, value)
    }


    validateIfRequired() {
        if (this.props.submitCount > 0) {
            if (time.passedFromSaved() > MIN_VALIDATION_INTERVAL) {
                this.validate().then(() => {
                    time.save()
                })
            }

            else if (!this.timeout) {
                this.timeout = setTimeout(() => {
                    this.timeout = null
                    this.validateIfRequired()
                }, MIN_VALIDATION_INTERVAL) // try again
            }
        }
    }

    validate () {
        const data = this.props.fields.toJS()
        return this.props.actions.validate(data)
    }

    render () {
        const {
            fields,
            directory,
            className,
            isFetching,
            primaryFocusIds,
            treatmentServiceIds
        } = this.props

        const {
            isPhoneTooltipOpen
        } = this.state

        const {
            organization,

            community,

            name,
            nameHasError,
            nameErrorText,

            email,
            emailHasError,
            emailErrorText,

            serviceIds,
            serviceIdsHasError,
            serviceIdsErrorText,

            phone,
            phoneHasError,
            phoneErrorText,

            isUrgentCare,
            isUrgentCareHasError,
            isUrgentCareErrorText,

            appointmentDate,
            appointmentDateHasError,
            appointmentDateErrorText,

            comment,
            commentHasError,
            commentErrorText,
        } = fields

        return (
            <Form className={cn('AppointmentForm', className)}>
                {isFetching && (
                    <Loader hasBackdrop />
                )}
                <div className='AppointmentForm-Section'>
                    <div className='AppointmentForm-SectionTitle'>
                        Appointment Details
                    </div>
                    <Row>
                        <Col md={6}>
                            <TextField
                                type='text'
                                value={organization}
                                label='Organization'
                                className='AppointmentForm-TextField'
                                isDisabled={true}
                            />
                        </Col>
                        <Col md={6}>
                            <TextField
                                type='text'
                                value={community}
                                label='Community'
                                className='AppointmentForm-TextField'
                                isDisabled={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <TextField
                                type='text'
                                name='name'
                                value={name}
                                label='Name*'
                                className='AppointmentForm-TextField'
                                hasError={nameHasError}
                                errorText={nameErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={6}>
                            <SelectField
                                isMultiple
                                name='serviceIds'
                                label='Services*'
                                isSectioned
                                hasSectionTitle
                                hasSectionSeparator
                                className='AppointmentForm-SelectField'
                                hasError={serviceIdsHasError}
                                errorText={serviceIdsErrorText}
                                sections={map(
                                    groupBy(
                                        filter(
                                            directory.treatment.service.list.dataSource.data,
                                            o => treatmentServiceIds.includes(o.id)
                                        ), 'primaryFocusId'
                                    ),
                                    (data, id) => ({
                                        id: +id,
                                        title: (findWhere(
                                            directory.primaryFocus.list.dataSource.data, { id: +id }
                                        ) || {}).label,
                                        options: map(data, o => ({ value: o.id, text: o.label }))
                                    })
                                )}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <DateField
                                name='appointmentDate'
                                value={appointmentDate}
                                label='Appointment Date*'
                                minDate={new Date().getTime()}
                                className='AppointmentForm-SelectField'
                                hasError={appointmentDateHasError}
                                errorText={appointmentDateErrorText}
                                onChange={this.onChangeDateField}
                            />
                        </Col>
                        <Col md={3}>
                            <TextField
                                type='text'
                                name='phone'
                                value={phone}
                                label='Phone Number*'
                                className='AppointmentForm-TextField'
                                hasError={phoneHasError}
                                errorText={phoneErrorText}
                                onChange={this.onChangeField}
                                renderIcon={() => (
                                    <Info
                                        id='phoneInfoIcon'
                                        onMouseOver={this.onOverPhoneInfoIcon}
                                        onMouseLeave={this.onLeavePhoneInfoIcon}
                                        className='AppointmentForm-InfoIcon'
                                    />
                                )}
                            />
                            <Tooltip isOpen={isPhoneTooltipOpen} target='phoneInfoIcon'>
                                <ul className='AppointmentForm-PhoneTooltipBody'>
                                    <li>Digits only allowed</li>
                                    <li>No spaces, dashes, or special symbols</li>
                                    <li>Country code is required</li>
                                    <li>‘+’ may be a leading symbol</li>
                                </ul>
                            </Tooltip>
                        </Col>
                        <Col md={6}>
                            <TextField
                                type='text'
                                name='email'
                                value={email}
                                label='Email'
                                className='AppointmentForm-TextField'
                                hasError={emailHasError}
                                errorText={emailErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <CheckboxField
                                name='isUrgentCare'
                                value={isUrgentCare}
                                label='Immediate appointment is needed'
                                className='AppointmentForm-CheckboxField'
                                hasError={isUrgentCareHasError}
                                errorText={isUrgentCareErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <TextField
                                type='textarea'
                                name='comment'
                                value={comment}
                                label='Comment'
                                className='AppointmentForm-TextArea'
                                hasError={commentHasError}
                                errorText={commentErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                </div>
            </Form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentForm)