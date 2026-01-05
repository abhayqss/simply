import React, {Component} from 'react'

import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {bindActionCreators} from 'redux'
import {
    map,
    isArray,
    isNumber,
    findWhere
} from 'underscore'

import cn from 'classnames'
import PropTypes from 'prop-types'
import {Form, Col, Row, Collapse} from 'reactstrap'

import TextField from 'components/Form/TextField/TextField'
import DateField from 'components/Form/DateField/DateField'
import SelectField from 'components/Form/SelectField/SelectField'
import CheckboxField from 'components/Form/CheckboxField/CheckboxField'

import * as clientDetailsActions from 'redux/client/details/clientDetailsActions'

import * as eventFormActions from 'redux/event/form/eventFormActions'
import * as stateListActions from 'redux/directory/state/list/stateListActions'
import * as eventTypeListActions from 'redux/directory/event/type/list/eventTypeListActions'
import * as systemRoleListActions from 'redux/directory/system/role/list/systemRoleListActions'

import {isEmpty} from 'lib/utils/Utils'

import './EventForm.scss'

function renderTypeGroupSection (id, name, title, data, value, onChange) {
    return (
        <div
            key={id}
            className="MultiSelect-Section"
            style={{ borderLeftColor: SECTION_COLORS[id % 5] }}>
            <div className="MultiSelect-SectionTitle">
                {title}
            </div>
            {map(data, o => (
                <div onClick={() => {
                    onChange(o.id)
                    }}
                    className="MultiSelect-SectionItem"
                     style={(value === o.id) ? {
                         backgroundColor: '#f9f9f9',
                         borderTop: '1px solid #bfbdbd',
                         borderBottom: '1px solid #bfbdbd'
                     } : {}}>
                    {o.title}
                    {(value === o.id) && (
                        <span className="MultiSelect-SectionCheckMark" />
                    )}
                </div>
            ))}
        </div>
    )
}

function mapStateToProps (state) {
    const { form } = state.event

    return {
        error: form.error,
        fields: form.fields,
        isValid: form.isValid,
        isFetching: form.isFetching,

        auth: state.auth,

        client: {
            details: state.client.details
        },

        directory: state.directory
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(eventFormActions, dispatch),

            client: {
                details: bindActionCreators(clientDetailsActions, dispatch)
            },

            directory: {
                role: {list: bindActionCreators(systemRoleListActions, dispatch)},
                event: {
                    type: {list: bindActionCreators(eventTypeListActions, dispatch)},
                },
                state: {list: bindActionCreators(stateListActions, dispatch)},
            },
        }
    }
}

const SECTION_COLORS = [
    '#ffd3c0',
    '#fff1ca',
    '#d5f3b8',
    '#d1ebfe',
    '#e7ccfe'
]

class EventForm extends Component  {
    static propTypes = {
        eventId: PropTypes.number,
    }

    componentDidMount () {
        const {actions, eventId} = this.props

        /*if (this.isEditMode()) {
            actions.details.load(eventId)
        }
        */

        if (this.props.match.params.clientId) {
            this.refreshClientDetails()
        }

        this.loadDirectoryData()

        this.changePersonSubmittingEventField()
    }

    componentDidUpdate (prevProps) {
        const {
            client,
            actions,
        } = this.props

        if (client.details.data !== prevProps.client.details.data) {
            this.updateClientFields()
        }

       /* if (details.data && (details.data !== prevProps.details.data)) {
            actions.changeFields(details.data)
        }*/
    }

    onBlurField = () => {
        this.validate()
    }

    onChangeField = (field, value) => {
        const { actions } = this.props

        actions.changeField(field, value)
    }

    onChangeClientField = (field, value) => {
        this.onChangeField(['client', field], value)
    }

    onChangeEventEssentialField = (field, value) => {
        if (field === 'careTeamRoleId') {

            const roleList = this.props.directory.system.role.list.dataSource.data
            const selectedRole = findWhere(roleList, { id: value })

            this.changeEmployeeFields({
                firstName: 'Denise',
                lastName: 'Weber',
                role: selectedRole.title,
            })
        }

        this.onChangeField(['eventEssentials', field], value)
    }

    onChangeEventDescriptionField = (field, value) => {
        this.onChangeField(['eventDescription', field], value)
    }

    onChangeTreatmentDetailField = (field, value) => {
        this.onChangeField(['treatmentDetails', field], value)
    }

    onChangeResponsibleManagerField = (field, value) => {
        this.onChangeField(['responsibleManager', field], value)
    }

    onChangeRegisteredNurseField = (field, value) => {
        if (isArray(field)) {
            this.onChangeField(['registeredNurse', ...field], value)
        }

        else {
            this.onChangeField(['registeredNurse', field], value)
        }
    }

    onChangePhysicianField = (field, value) => {
        if (isArray(field)) {
            this.onChangeField(['treatmentDetails', 'treatingPhysicianDetails', ...field], value)
        }

        else {
            this.onChangeField(['treatmentDetails', 'treatingPhysicianDetails', field], value)
        }
    }

    onChangeHospitalField = (field, value) => {
        if (isArray(field)) {
            this.onChangeField(['treatmentDetails', 'treatingHospitalDetails', ...field], value)
        }

        else {
            this.onChangeField(['treatmentDetails', 'treatingHospitalDetails', field], value)
        }
    }

    refreshClientDetails() {
        this.updateClientDetails(true)
    }

    updateClientDetails(isReload) {
        const { data } = this.props

        if (isReload || isEmpty(data)) {
            const { actions, match } = this.props

            actions.client.details.load(match.params.clientId)
        }
    }

    changePersonSubmittingEventField () {
        this.onChangeEventEssentialField('personSubmittingEvent', this.props.auth.login.user.data.fullName)
    }

    changeEmployeeFields(employee) {
    const { actions } = this.props

        actions.changeFields({
            employee
        })
    }

    changeClientFields() {
        const { actions, client  } = this.props

        actions.changeFields({
            client: {
                ...client.details.data,
                ssn: client.details.data.ssnLastFourDigits,
            }
        })
    }

    updateClientFields = () => {
        this.changeClientFields()
    }

    isEditMode() {
        return isNumber(this.props.eventId)
    }

    loadDirectoryData() {
        const {
            role,
            event,
            state,
        } = this.props.actions.directory

        role.list.load()
        state.list.load()
        event.type.list.load()
    }

    validate() {
        const data = this.props.fields.toJS()
        return this.props.actions.validate(data)
    }

    render () {
        const {
            fields,
            directory,
            className
        } = this.props

        const {
            event,
            state,
            system
        } = directory

        /*Can't rename to states, because states is already declared above*/
        let stateList = state.list.dataSource.data

        const {
            /*Client Info*/
            client,

            /*Event Essentials*/
            eventEssentials,

            /*Event Description*/
            eventDescription,

            /*Treatment Details*/
            treatmentDetails,

            /*Responsible Manager*/
            hasResponsibleManager,
            responsibleManager,

            /*Registered Nurse*/
            hasRegisteredNurse,
            registeredNurse
        } = fields

        return (
            <Form className={cn('EventForm', className)}>
                <div className='EventForm-Section ClientInfo-Section'>
                    <div className='EventForm-SectionTitle'>
                        Client Info
                    </div>
                    <Row>
                        <Col md={6}>
                            <TextField
                                type='text'
                                name='community'
                                value={client.community}
                                label='Community'
                                isDisabled={true}
                                className='EventForm-TextField'
                                hasError={client.communityHasError}
                                errorText={client.communityErrorText}
                                onChange={this.onChangeClientField}
                            />
                        </Col>
                        <Col md={6}>
                            <TextField
                                type='text'
                                name='organization'
                                value={client.organization}
                                label='Organization'
                                isDisabled={true}
                                className='EventForm-TextField'
                                hasError={client.organizationHasError}
                                errorText={client.organizationErrorText}
                                onChange={this.onChangeClientField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='firstName'
                                value={client.firstName}
                                label='First Name'
                                isDisabled={true}
                                className='EventForm-TextField'
                                hasError={client.firstNameHasError}
                                errorText={client.firstNameErrorText}
                                onChange={this.onChangeClientField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='lastName'
                                value={client.lastName}
                                label='Last Name'
                                isDisabled={true}
                                className='EventForm-TextField'
                                hasError={client.lastNameHasError}
                                errorText={client.lastNameErrorText}
                                onChange={this.onChangeClientField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='ssn'
                                value={client.ssn}
                                label='Social Security Number'
                                isDisabled={true}
                                className='EventForm-TextField'
                                hasError={client.ssnHasError}
                                errorText={client.ssnErrorText}
                                onChange={this.onChangeClientField}
                            />
                        </Col>
                    </Row>
                </div>
                <div className='EventForm-Section EventEssentials-Section'>
                    <div className='EventForm-SectionTitle'>
                        Event Essentials
                    </div>
                    <Row>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='personSubmittingEvent'
                                value={eventEssentials.personSubmittingEvent}
                                label='Person Submitting Event'
                                className='EventForm-TextField'
                                isDisabled={true}
                                hasError={eventEssentials.personSubmittingEventHasError}
                                errorText={eventEssentials.personSubmittingEventErrorText}
                                onChange={this.onChangeEventEssentialField}
                            />
                        </Col>
                        <Col md={4}>
                            <SelectField
                                name='careTeamRoleId'
                                value={eventEssentials.careTeamRoleId}
                                options={map(system.role.list.dataSource.data, ({id, name}) => ({
                                   text: name, value: id
                                }))}
                                label='Care Team Role*'
                                className='EventForm-TextField'
                                hasError={eventEssentials.careTeamRoleIdHasError}
                                errorText={eventEssentials.careTeamRoleIdErrorText}
                                onBlur={this.onBlurField}
                                onChange={this.onChangeEventEssentialField}
                            />
                        </Col>
                        <Col md={4}>
                            <DateField
                                type='text'
                                name='eventDate'
                                value={eventEssentials.eventDate}
                                label='Event Date and Time*'
                                className='EventForm-TextField'
                                hasError={eventEssentials.eventDateHasError}
                                errorText={eventEssentials.eventDateErrorText}
                                onBlur={this.onBlurField}
                                onChange={this.onChangeEventEssentialField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <SelectField
                                name='eventTypeId'
                                value={eventEssentials.eventTypeId}
                                options={map(event.type.list.dataSource.data, o => ({
                                    ...o, data: map(o.data, o => ({ ...o, title: o.label}))
                                }))}
                                isSectioned={true}
                                renderSection={renderTypeGroupSection}
                                label='Event Type*'
                                defaultText="Select"
                                className='EventForm-EventTypeSelectField'
                                hasError={eventEssentials.eventTypeIdHasError}
                                errorText={eventEssentials.eventTypeIdErrorText}
                                onBlur={this.onBlurField}
                                onChange={this.onChangeEventEssentialField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8} className="d-flex margin-top-16">
                            <CheckboxField
                                name='isEmergencyDepartmentVisit'
                                value={eventEssentials.isEmergencyDepartmentVisit}
                                className="EventForm-CheckboxField"
                                label={'Emergency Department Visit'}
                                onChange={this.onChangeEventEssentialField}
                            />
                            <CheckboxField
                                name='isOvernightInpatient'
                                value={eventEssentials.isOvernightInpatient}
                                className="EventForm-CheckboxField margin-left-20"
                                label={'Overnight In-patient'}
                                onChange={this.onChangeEventEssentialField}
                            />
                        </Col>
                    </Row>
                </div>
                <div className='EventForm-Section'>
                    <div className='EventForm-SectionTitle'>
                        Event Description
                    </div>
                    <Row>
                        <Col md={12}>
                            <TextField
                                type='textarea'
                                name='location'
                                value={eventDescription.location}
                                label='Location'
                                className='EventForm-TextArea'
                                hasError={eventDescription.locationHasError}
                                errorText={eventDescription.locationErrorText}
                                onChange={this.onChangeEventDescriptionField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <TextField
                                type='textarea'
                                name='situation'
                                value={eventDescription.situation}
                                label='Situation'
                                className='EventForm-TextArea'
                                hasError={eventDescription.situationHasError}
                                errorText={eventDescription.situationErrorText}
                                onChange={this.onChangeEventDescriptionField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <TextField
                                type='textarea'
                                name='background'
                                value={eventDescription.background}
                                label='Background'
                                className='EventForm-TextArea'
                                hasError={eventDescription.backgroundHasError}
                                errorText={eventDescription.backgroundErrorText}
                                onChange={this.onChangeEventDescriptionField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <TextField
                                type='textarea'
                                name='assessment'
                                value={eventDescription.assessment}
                                label='Assessment'
                                className='EventForm-TextArea'
                                hasError={eventDescription.assessmentHasError}
                                errorText={eventDescription.assessmentErrorText}
                                onChange={this.onChangeEventDescriptionField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <CheckboxField
                                name='hasInjury'
                                value={eventDescription.hasInjury}
                                className="EventForm-CheckboxField margin-bottom-16"
                                label={'Injury'}
                                onChange={this.onChangeEventDescriptionField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <CheckboxField
                                name='isFollowUpExpected'
                                value={eventDescription.isFollowUpExpected}
                                className="EventForm-CheckboxField"
                                label={'Follow up expected'}
                                onChange={this.onChangeEventDescriptionField}
                            />
                        </Col>
                    </Row>
                    <Collapse isOpen={eventDescription.isFollowUpExpected}>
                        <Row>
                            <Col md={12}>
                                <TextField
                                    type='textarea'
                                    name='followUpDetails'
                                    value={eventDescription.followUpDetails}
                                    label='Follow Up'
                                    className='EventForm-TextArea'
                                    hasError={eventDescription.followUpDetailsHasError}
                                    errorText={eventDescription.followUpDetailsErrorText}
                                    onChange={this.onChangeEventDescriptionField}
                                />
                            </Col>
                        </Row>
                    </Collapse>
                </div>
                <div className='EventForm-Section TreatmentDetails-Section'>
                    <div className='EventForm-SectionTitle'>
                        Treatment Details
                    </div>
                    <Row>
                        <Col md={6}>
                            <CheckboxField
                                name='hasTreatingPhysician'
                                value={treatmentDetails.hasTreatingPhysician}
                                className="EventForm-CheckboxField"
                                label={'Include details of treating physician'}
                                onChange={this.onChangeTreatmentDetailField}
                            />
                        </Col>
                    </Row>
                    <Collapse isOpen={treatmentDetails.hasTreatingPhysician}>
                        <Row>
                            <Col md={4}>
                                <TextField
                                    type='text'
                                    name='firstName'
                                    label='First Name*'
                                    value={treatmentDetails.treatingPhysicianDetails.firstName}
                                    className='EventForm-TextField'
                                    placeholder={'At least 2 characters'}
                                    hasError={treatmentDetails.treatingPhysicianDetails.firstNameHasError}
                                    errorText={treatmentDetails.treatingPhysicianDetails.firstNameErrorText}
                                    onBlur={this.onBlurField}
                                    onChange={this.onChangePhysicianField}
                                />
                            </Col>
                            <Col md={4}>
                                <TextField
                                    type='text'
                                    name='lastName'
                                    label='Last Name*'
                                    value={treatmentDetails.treatingPhysicianDetails.lastName}
                                    className='EventForm-TextField'
                                    placeholder={'At least 2 characters'}
                                    hasError={treatmentDetails.treatingPhysicianDetails.lastNameHasError}
                                    errorText={treatmentDetails.treatingPhysicianDetails.lastNameErrorText}
                                    onBlur={this.onBlurField}
                                    onChange={this.onChangePhysicianField}
                                />
                            </Col>
                            <Col md={4}>
                                <TextField
                                    type='text'
                                    name='phone'
                                    label='Phone #'
                                    value={treatmentDetails.treatingPhysicianDetails.phone}
                                    className='EventForm-TextField'
                                    hasError={treatmentDetails.treatingPhysicianDetails.phoneHasError}
                                    errorText={treatmentDetails.treatingPhysicianDetails.phoneErrorText}
                                    onChange={this.onChangePhysicianField}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <CheckboxField
                                    name='hasAddress'
                                    value={treatmentDetails.treatingPhysicianDetails.hasAddress}
                                    className="EventForm-CheckboxField"
                                    label={'Physician Address'}
                                    onChange={this.onChangePhysicianField}
                                />
                            </Col>
                        </Row>
                        <Collapse isOpen={treatmentDetails.treatingPhysicianDetails.hasAddress}>
                            <Row>
                                <Col md={4}>
                                    <TextField
                                        type='text'
                                        name={['address', 'street']}
                                        value={treatmentDetails.treatingPhysicianDetails.address.street}
                                        label='Street*'
                                        className='EventForm-TextField'
                                        hasError={treatmentDetails.treatingPhysicianDetails.address.streetHasError}
                                        errorText={treatmentDetails.treatingPhysicianDetails.address.streetErrorText}
                                        onBlur={this.onBlurField}
                                        onChange={this.onChangePhysicianField}
                                    />
                                </Col>
                                <Col md={4}>
                                    <TextField
                                        type='text'
                                        name={['address', 'city']}
                                        value={treatmentDetails.treatingPhysicianDetails.address.city}
                                        label='City*'
                                        className='EventForm-TextField'
                                        hasError={treatmentDetails.treatingPhysicianDetails.address.cityHasError}
                                        errorText={treatmentDetails.treatingPhysicianDetails.address.cityErrorText}
                                        onBlur={this.onBlurField}
                                        onChange={this.onChangePhysicianField}
                                    />
                                </Col>
                                <Col md={4}>
                                    <SelectField
                                        name={['address', 'stateId']}
                                        value={treatmentDetails.treatingPhysicianDetails.address.stateId}
                                        label='State*'
                                        options={map(stateList, ({id, label}) => ({
                                            text: label, value: id
                                        }))}
                                        defaultText="Select State"
                                        className='EventForm-SelectField'
                                        isMultiple={false}
                                        hasError={treatmentDetails.treatingPhysicianDetails.address.stateIdHasError}
                                        errorText={treatmentDetails.treatingPhysicianDetails.address.stateIdErrorText}
                                        onBlur={this.onBlurField}
                                        onChange={this.onChangePhysicianField}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <TextField
                                        type='text'
                                        name={['address', 'zip']}
                                        value={treatmentDetails.treatingPhysicianDetails.address.zip}
                                        label='Zip Code*'
                                        className='EventForm-TextField'
                                        hasError={treatmentDetails.treatingPhysicianDetails.address.zipHasError}
                                        errorText={treatmentDetails.treatingPhysicianDetails.address.zipErrorText}
                                        onBlur={this.onBlurField}
                                        onChange={this.onChangePhysicianField}
                                    />
                                </Col>
                            </Row>
                        </Collapse>
                    </Collapse>
                    <Row>
                        <Col md={6}>
                            <CheckboxField
                                name='hasHospital'
                                value={treatmentDetails.hasHospital}
                                className="EventForm-CheckboxField"
                                label={'Include details of treating hospital'}
                                onChange={this.onChangeTreatmentDetailField}
                            />
                        </Col>
                    </Row>
                    <Collapse isOpen={treatmentDetails.hasHospital}>
                        <Row>
                            <Col md={8}>
                                <TextField
                                    type='text'
                                    name='name'
                                    value={treatmentDetails.treatingHospitalDetails.name}
                                    label='Hospital Name*'
                                    placeholder={'At least 2 characters'}
                                    className='EventForm-TextField'
                                    hasError={treatmentDetails.treatingHospitalDetails.nameHasError}
                                    errorText={treatmentDetails.treatingHospitalDetails.nameErrorText}
                                    onBlur={this.onBlurField}
                                    onChange={this.onChangeHospitalField}
                                />
                            </Col>
                            <Col md={4}>
                               <TextField
                                   type='text'
                                   name='phone'
                                   value={treatmentDetails.treatingHospitalDetails.phone}
                                   label='Phone #'
                                   className='EventForm-TextField'
                                   hasError={treatmentDetails.treatingHospitalDetails.phoneHasError}
                                   errorText={treatmentDetails.treatingHospitalDetails.phoneErrorText}
                                   onChange={this.onChangeHospitalField}
                               />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <CheckboxField
                                    name='hasAddress'
                                    value={treatmentDetails.treatingHospitalDetails.hasAddress}
                                    className="EventForm-CheckboxField"
                                    label={'Hospital Clinic Address'}
                                    onChange={this.onChangeHospitalField}
                                />
                            </Col>
                        </Row>
                        <Collapse isOpen={treatmentDetails.treatingHospitalDetails.hasAddress}>
                            <Row>
                               <Col md={4}>
                                   <TextField
                                       type='text'
                                       name={['address', 'street']}
                                       value={treatmentDetails.treatingHospitalDetails.address.street}
                                       label='Street*'
                                       className='EventForm-TextField'
                                       hasError={treatmentDetails.treatingHospitalDetails.address.streetHasError}
                                       errorText={treatmentDetails.treatingHospitalDetails.address.streetErrorText}
                                       onBlur={this.onBlurField}
                                       onChange={this.onChangeHospitalField}
                                   />
                               </Col>
                               <Col md={4}>
                                   <TextField
                                       type='text'
                                       name={['address', 'city']}
                                       value={treatmentDetails.treatingHospitalDetails.address.city}
                                       label='City*'
                                       className='EventForm-TextField'
                                       hasError={treatmentDetails.treatingHospitalDetails.address.cityHasError}
                                       errorText={treatmentDetails.treatingHospitalDetails.address.cityErrorText}
                                       onBlur={this.onBlurField}
                                       onChange={this.onChangeHospitalField}
                                   />
                               </Col>
                               <Col md={4}>
                                   <SelectField
                                       name={['address', 'stateId']}
                                       value={treatmentDetails.treatingHospitalDetails.address.stateId}
                                       label='State*'
                                       options={map(stateList, ({id, label}) => ({
                                           text: label, value: id
                                       }))}
                                       defaultText="Select State"
                                       className='EventForm-SelectField'
                                       isMultiple={false}
                                       hasError={treatmentDetails.treatingHospitalDetails.address.stateIdHasError}
                                       errorText={treatmentDetails.treatingHospitalDetails.address.stateIdErrorText}
                                       onBlur={this.onBlurField}
                                       onChange={this.onChangeHospitalField}
                                   />
                               </Col>
                            </Row>
                           <Row>
                               <Col md={4}>
                                   <TextField
                                       type='text'
                                       name={['address', 'zip']}
                                       value={treatmentDetails.treatingHospitalDetails.address.zip}
                                       label='Zip Code*'
                                       className='EventForm-TextField'
                                       hasError={treatmentDetails.treatingHospitalDetails.address.zipHasError}
                                       errorText={treatmentDetails.treatingHospitalDetails.address.zipErrorText}
                                       onBlur={this.onBlurField}
                                       onChange={this.onChangeHospitalField}
                                   />
                               </Col>
                           </Row>
                        </Collapse>
                    </Collapse>
                </div>
                <div className='EventForm-Section ResponsibleManager-Section'>
                    <div className='EventForm-SectionTitle'>
                        Details of Responsible Manager
                    </div>
                    <Row>
                        <Col md={6}>
                            <CheckboxField
                                name='hasResponsibleManager'
                                value={hasResponsibleManager}
                                className="EventForm-CheckboxField"
                                label={'Include details of responsible manager'}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Collapse isOpen={hasResponsibleManager}>
                        <Row>
                            <Col md={4}>
                                <TextField
                                    type='text'
                                    name='firstName'
                                    value={responsibleManager.firstName}
                                    label='First Name*'
                                    placeholder={'At least 2 characters'}
                                    className='EventForm-TextField'
                                    hasError={responsibleManager.firstNameHasError}
                                    errorText={responsibleManager.firstNameErrorText}
                                    onBlur={this.onBlurField}
                                    onChange={this.onChangeResponsibleManagerField}
                                />
                            </Col>
                            <Col md={4}>
                                <TextField
                                    type='text'
                                    name='lastName'
                                    value={responsibleManager.lastName}
                                    label='Last Name*'
                                    placeholder={'At least 2 characters'}
                                    className='EventForm-TextField'
                                    hasError={responsibleManager.lastNameHasError}
                                    errorText={responsibleManager.lastNameErrorText}
                                    onBlur={this.onBlurField}
                                    onChange={this.onChangeResponsibleManagerField}
                                />
                            </Col>
                            <Col md={4}>
                                <TextField
                                    type='text'
                                    name='phone'
                                    value={responsibleManager.phone}
                                    label='Phone #'
                                    className='EventForm-TextField'
                                    hasError={responsibleManager.phoneHasError}
                                    errorText={responsibleManager.phoneErrorText}
                                    onChange={this.onChangeResponsibleManagerField}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}>
                                <TextField
                                    type='email'
                                    name='email'
                                    value={responsibleManager.email}
                                    label='Email'
                                    className='EventForm-TextField'
                                    hasError={responsibleManager.emailHasError}
                                    errorText={responsibleManager.emailErrorText}
                                    onChange={this.onChangeResponsibleManagerField}
                                />
                            </Col>
                        </Row>
                    </Collapse>
                </div>
                <div className='EventForm-Section TreatmentDetails-Section'>
                    <div className='EventForm-SectionTitle'>
                        Details of Registered Nurse (RN)
                    </div>
                    <Row>
                        <Col md={6}>
                            <CheckboxField
                                name='hasRegisteredNurse'
                                value={hasRegisteredNurse}
                                className="EventForm-CheckboxField"
                                label={'Include details of registered nurse'}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Collapse isOpen={hasRegisteredNurse}>
                        <Row>
                            <Col md={4}>
                                <TextField
                                    type='text'
                                    name='firstName'
                                    value={registeredNurse.firstName}
                                    label='First Name*'
                                    placeholder={'At least 2 characters'}
                                    className='EventForm-TextField'
                                    hasError={registeredNurse.firstNameHasError}
                                    errorText={registeredNurse.firstNameErrorText}
                                    onBlur={this.onBlurField}
                                    onChange={this.onChangeRegisteredNurseField}
                                />
                            </Col>
                            <Col md={4}>
                                <TextField
                                    type='text'
                                    name='lastName'
                                    value={registeredNurse.lastName}
                                    label='Last Name*'
                                    placeholder={'At least 2 characters'}
                                    className='EventForm-TextField'
                                    hasError={registeredNurse.lastNameHasError}
                                    errorText={registeredNurse.lastNameErrorText}
                                    onBlur={this.onBlurField}
                                    onChange={this.onChangeRegisteredNurseField}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <CheckboxField
                                    name='hasAddress'
                                    value={registeredNurse.hasAddress}
                                    className="EventForm-CheckboxField"
                                    label={'RN Address'}
                                    onChange={this.onChangeRegisteredNurseField}
                                />
                            </Col>
                        </Row>
                        <Collapse isOpen={registeredNurse.hasAddress}>
                            <Row>
                                <Col md={4}>
                                    <TextField
                                        type='text'
                                        name={['address', 'street']}
                                        value={registeredNurse.address.street}
                                        label='Street*'
                                        className='EventForm-TextField'
                                        hasError={registeredNurse.address.streetHasError}
                                        errorText={registeredNurse.address.streetErrorText}
                                        onBlur={this.onBlurField}
                                        onChange={this.onChangeRegisteredNurseField}
                                    />
                                </Col>
                                <Col md={4}>
                                    <TextField
                                        type='text'
                                        name={['address', 'city']}
                                        value={registeredNurse.address.city}
                                        label='City*'
                                        className='EventForm-TextField'
                                        hasError={registeredNurse.address.cityHasError}
                                        errorText={registeredNurse.address.cityErrorText}
                                        onBlur={this.onBlurField}
                                        onChange={this.onChangeRegisteredNurseField}
                                    />
                                </Col>
                                <Col md={4}>
                                    <SelectField
                                        name={['address', 'stateId']}
                                        value={registeredNurse.address.stateId}
                                        label='State*'
                                        options={map(stateList, ({id, label}) => ({
                                            text: label, value: id
                                        }))}
                                        defaultText="Select State"
                                        className='EventForm-SelectField'
                                        isMultiple={false}
                                        hasError={registeredNurse.address.stateIdHasError}
                                        errorText={registeredNurse.address.stateIdErrorText}
                                        onBlur={this.onBlurField}
                                        onChange={this.onChangeRegisteredNurseField}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <TextField
                                        type='text'
                                        name={['address', 'zip']}
                                        value={registeredNurse.address.zip}
                                        label='Zip Code*'
                                        className='EventForm-TextField'
                                        hasError={registeredNurse.address.zipHasError}
                                        errorText={registeredNurse.address.zipErrorText}
                                        onBlur={this.onBlurField}
                                        onChange={this.onChangeRegisteredNurseField}
                                    />
                                </Col>
                            </Row>
                        </Collapse>
                    </Collapse>
                </div>
            </Form>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventForm))