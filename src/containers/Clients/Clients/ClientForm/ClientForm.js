import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import {
    map,
    omit,
    last,
    compact,
    isNumber
} from 'underscore'

import moment from 'moment'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
    Col,
    Row,
    Form
} from 'reactstrap'

import Action from 'components/Action/Action'
import Loader from 'components/Loader/Loader'
import TextField from 'components/Form/TextField/TextField'
import DateField from 'components/Form/DateField/DateField'
import FileField from 'components/Form/FileField/FileField'
import SelectField from 'components/Form/SelectField/SelectField'
import CheckboxField from 'components/Form/CheckboxField/CheckboxField'
import RadioGroupField from 'components/Form/RadioGroupField/RadioGroupField'

import './ClientForm.scss'

import LoadStatesAction from 'actions/directory/LoadStatesAction'
import LoadGendersAction from 'actions/directory/LoadGendersAction'
import LoadOrganizationsAction from 'actions/directory/LoadOrganizationsAction'
import LoadMaritalStatusesAction from 'actions/directory/LoadMaritalStatusesAction'
import LoadInsuranceNetworksAction from 'actions/directory/LoadInsuranceNetworksAction'

import * as clientFormActions from 'redux/client/form/clientFormActions'
import * as clientDetailsActions from 'redux/client/details/clientDetailsActions'

import * as communityListActions from 'redux/directory/community/list/communityListActions'

import { Response } from 'lib/utils/AjaxUtils'

import {
    Time,
    isEmpty,
    isNotEmpty,
    allAreTrue,
    DateUtils as DU
} from 'lib/utils/Utils'

import { ERROR_CODES } from 'lib/Constants'

import { ReactComponent as Info } from 'images/info.svg'

const RADIO_GROUP_OPTIONS = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
]

const { INVALID_SSN, INVALID_EMAIL } = ERROR_CODES

const { format, formats } = DU

const DATE_FORMAT = formats.americanMediumDate
const DATE_TIME_ZONE_FORMAT = formats.longDateMediumTime12TimeZone

let changeLog = []

const time = new Time()

const MIN_VALIDATION_INTERVAL = 900

const NO_COMMUNITY_ERROR_TEXT = 'There is no community created for current organization.'

function mapStateToProps (state) {
    const {
        form, list, details
    } = state.client

    return {
        error: form.error,
        fields: form.fields,
        isValid: form.isValid,
        isValidated: form.isValidated,
        isFetching: form.isFetching,

        auth: state.auth,

        list,
        details,

        directory: state.directory
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(clientFormActions, dispatch),

            details: bindActionCreators(clientDetailsActions, dispatch),

            communities: bindActionCreators(communityListActions, dispatch)
        }
    }
}

class ClientForm extends Component {

    static propTypes = {
        clientId: PropTypes.number
    }

    timeout = null

    componentDidMount () {
        changeLog = []
    }

    componentWillUnmount () {
        changeLog = []
        this.actions.clear()
    }

    onChangeField = (name, value) => {
        this.changeField(name, value).then(() => {
            changeLog.push({ name, value })

            this.onFieldChanged(name, value)

            if (this.props.isValidated) this.validateIfRequired()
            else this.validateUniq()
        })
    }

    onFieldChanged = (name, value) => {
        if (name === 'avatar' && !value) {
            this.changeField('avatarName', '')
        }
    }

    onChangeAddressField = (name, value) => {
        this.changeAddressField(name, value).then(() => {
            changeLog.push({ name, value })

            if (this.props.isValidated) this.validateIfRequired()
        })
    }

    onChangeDateField = (name, value) => {
        this.changeField(name, value ? format(value, DATE_FORMAT) : null)
            .then(() => {
                if (this.props.isValidated) this.validate()
            })
    }

    onChangeDateTimeField = (name, value) => {
        this.changeField(name, value ? new Date(value).getTime() : null)
            .then(() => {
                if (this.props.isValidated) this.validate()
            })
    }

    get actions () {
        return this.props.actions
    }

    get isEditMode () {
        return isNumber(this.props.clientId)
    }

    get data () {
        return this.props.fields.toJS()
    }

    updateCommunities (organizationId) {
        this.changeFields({
            communityIdHasError: false,
            communityIdErrorText: ''
        })

        this.actions.communities
            .load({ organizationId })
            .then(Response(({ data }) => {
                if (isEmpty(data)) {
                    this.changeFields({
                        communityIdHasError: true,
                        communityIdErrorText: NO_COMMUNITY_ERROR_TEXT
                    })
                }

                if (data.length === 1) {
                    this.changeField('communityId', data[0].id)
                }
            }))
    }

    validate () {
        const data = this.data

        return (
            this.actions
                .validate(data, {
                    excluded: compact([
                        data.hasNoEmail && ['email']
                    ])
                })
                .then(success => {
                    return this.validateUniq().then(uniq => {
                        return success && uniq
                    })
                })
        )
    }

    validateUniq () {
        const {
            clientId,
            communityId,
            organizationId,
            ssn,
            ssnErrorCode,
            email,
            emailErrorCode,
            memberNumber,
            medicareNumber,
            medicaidNumber
        } = this.data

        const { details } = this.props

        let uniqInOrg = true

        if (email && emailErrorCode !== INVALID_EMAIL) {
            if (!(this.isEditMode && email === details.data.email)) {
                uniqInOrg = this.actions.validateUniqInOrganization({
                    email, clientId, organizationId
                })
            }
        }

        let uniqInComm = true

        if (isNumber(communityId)) {
            const data = omit({
                ...ssnErrorCode !== INVALID_SSN && !(
                    this.isEditMode && ssn === details.data.ssn
                ) && { ssn },
                ...!(
                    this.isEditMode && memberNumber === details.data.memberNumber
                ) && { memberNumber },
                ...!(
                    this.isEditMode && medicareNumber === details.data.medicareNumber
                ) && { medicareNumber },
                ...!(
                    this.isEditMode && medicaidNumber === details.data.medicaidNumber
                ) && { medicaidNumber }
            }, isEmpty)

            if (isNotEmpty(data)) {
                uniqInComm = this.actions.validateUniqInCommunity({
                    ...data, clientId, communityId
                })
            }
        }

        return Promise.all([uniqInOrg, uniqInComm]).then(values => {
            return allAreTrue(...values)
        })
    }

    changeFields (changes) {
        return this.actions.changeFields(changes)
    }

    changeField (...args) {
        return this.actions.changeField(...args)
    }

    changeAddressField (...args) {
        return this.actions.changeAddressField(...args)
    }

    validateIfRequired () {
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

    render () {
        const {
            list,
            fields,
            details,
            clientId,
            className,
            directory,
            isFetching,
        } = this.props

        const {
            isActive,
            /*Demographics*/
            firstName,
            firstNameHasError,
            firstNameErrorText,

            lastName,
            lastNameHasError,
            lastNameErrorText,

            ssn,
            ssnHasError,
            ssnErrorText,

            birthDate,
            birthDateHasError,
            birthDateErrorText,

            genderId,
            genderIdHasError,
            genderIdErrorText,

            maritalStatusId,
            maritalStatusIdHasError,
            maritalStatusIdErrorText,

            /*Community*/
            organizationId,
            organizationIdHasError,
            organizationIdErrorText,

            communityId,
            communityIdHasError,
            communityIdErrorText,

            /*Telecom*/
            cellPhone,
            cellPhoneHasError,
            cellPhoneErrorText,

            phone,
            phoneHasError,
            phoneErrorText,

            email,
            emailHasError,
            emailErrorText,

            hasNoEmail,

            address,

            avatar,
            avatarHasError,
            avatarErrorText,

            avatarName,

            /*Insurance*/
            insuranceNetworkId,
            insuranceNetworkIdHasError,
            insuranceNetworkIdErrorText,

            insurancePaymentPlan,
            insurancePaymentPlanHasError,
            insurancePaymentPlanErrorText,

            groupNumber,
            groupNumberHasError,
            groupNumberErrorText,

            memberNumber,
            memberNumberHasError,
            memberNumberErrorText,

            medicareNumber,
            medicareNumberHasError,
            medicareNumberErrorText,

            medicaidNumber,
            medicaidNumberHasError,
            medicaidNumberErrorText,

            /*Ancillary Information*/
            primaryCarePhysician,
            primaryCarePhysicianHasError,
            primaryCarePhysicianErrorText,

            retained,

            intakeDate,
            intakeDateHasError,
            intakeDateErrorText,

            currentPharmacyName,
            currentPharmacyNameHasError,
            currentPharmacyNameErrorText,

            referralSource,
            referralSourceHasError,
            referralSourceErrorText,

            riskScore,
            riskScoreHasError,
            riskScoreErrorText,
        } = fields

        return (
            <Form className={cn('ClientForm', className)}>
                <LoadStatesAction/>
                <LoadGendersAction/>
                <LoadOrganizationsAction/>
                <LoadMaritalStatusesAction/>
                <LoadInsuranceNetworksAction/>
                <Action
                    action={() => {
                        if (this.isEditMode) {
                            const setData = data => {
                                this.changeFields({
                                    ...data,
                                    hasNoEmail: !data.email,
                                    address: data.address || {}
                                }).then(() => {
                                    this.updateCommunities(data.organizationId)
                                })
                            }

                            if (isEmpty(details.data) || clientId !== details.data.id) {
                                this.actions.details
                                    .load(clientId)
                                    .then(Response(({ data }) => {
                                        setData(data)
                                    }))
                            }

                            else setData(details.data)
                        }

                        else {
                            const {
                                communityIds,
                                organizationId
                            } = list.dataSource.filter

                            this.changeFields({
                                organizationId,
                                communityId: (
                                    communityIds && communityIds.length === 1
                                ) ? communityIds[0] : null
                            }).then(() => {
                                this.updateCommunities(organizationId)
                            })
                        }
                    }}
                />
                <Action
                    isMultiple
                    params={{ organizationId }}
                    shouldPerform={prevParams => (
                        isNumber(prevParams.organizationId)
                        && organizationId !== prevParams.organizationId
                    )}
                    action={() => {
                        this.changeField('communityId', null)
                        this.updateCommunities(organizationId)
                    }}
                />
                {isFetching && (
                    <Loader hasBackdrop/>
                )}
                <div className='ClientForm-Section'>
                    <div className='ClientForm-SectionTitle'>
                        Demographics
                    </div>
                    <Row>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='firstName'
                                value={firstName}
                                label='First Name*'
                                className='ClientForm-TextField'
                                hasError={firstNameHasError}
                                errorText={firstNameErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='lastName'
                                value={lastName}
                                label='Last Name*'
                                className='ClientForm-TextField'
                                hasError={lastNameHasError}
                                errorText={lastNameErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='ssn'
                                value={this.isEditMode && ssn ?
                                    `*****${ssn.substring(5, 9)}`
                                    : ssn
                                }
                                label='Social Security Number*'
                                placeholder='XXX XX XXXX'
                                className='ClientForm-TextField'
                                hasError={ssnHasError}
                                errorText={ssnErrorText}
                                isDisabled={!isActive || this.isEditMode}
                                maxLength={9}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <DateField
                                name="birthDate"
                                className="ClientForm-DateField"
                                value={birthDate ? moment(
                                    birthDate, 'MM/DD/YYYY'
                                ).toDate().getTime() : null}
                                dateFormat="MM/dd/yyyy"
                                label="Date Of Birth*"
                                maxDate={new Date()}
                                hasError={birthDateHasError}
                                errorText={birthDateErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeDateField}
                            />
                        </Col>
                        <Col md={4}>
                            <SelectField
                                name='genderId'
                                value={genderId}
                                options={map(
                                    directory.gender.list.dataSource.data,
                                    ({ id, label }) => ({
                                        text: label, value: id
                                    })
                                )}
                                label='Gender*'
                                className='ClientForm-SelectField'
                                hasError={genderIdHasError}
                                errorText={genderIdErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={4}>
                            <SelectField
                                name='maritalStatusId'
                                value={maritalStatusId}
                                options={map(
                                    directory.marital.status.list.dataSource.data,
                                    ({ id, label }) => ({
                                        text: label, value: id
                                    })
                                )}
                                label='Martial Status'
                                className='ClientForm-SelectField'
                                hasError={maritalStatusIdHasError}
                                errorText={maritalStatusIdErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <SelectField
                                name="stateId"
                                value={address.stateId}
                                options={map(
                                    directory.state.list.dataSource.data,
                                    ({ id, label }) => ({
                                        text: label, value: id
                                    })
                                )}
                                label='State*'
                                className='ClientForm-TextField'
                                defaultText='Select'
                                hasError={address.stateIdHasError}
                                errorText={address.stateIdErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeAddressField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name="city"
                                value={address.city}
                                label='City*'
                                className='ClientForm-TextField'
                                hasError={address.cityHasError}
                                errorText={address.cityErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeAddressField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name="zip"
                                label='Zip Code*'
                                value={address.zip}
                                className='ClientForm-TextField'
                                hasError={address.zipHasError}
                                errorText={address.zipErrorText}
                                isDisabled={!isActive}
                                maxLength={5}
                                onChange={this.onChangeAddressField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name="street"
                                value={address.street}
                                label='Street*'
                                className='ClientForm-TextField'
                                hasError={address.streetHasError}
                                errorText={address.streetErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeAddressField}
                            />
                        </Col>
                        <Col md={8}>
                            <FileField
                                name='avatar'
                                value={avatar ? avatar.name : avatarName}
                                label='User Photo'
                                className='ClientForm-TextField'
                                isDisabled={!isActive}
                                hasError={avatarHasError}
                                errorText={avatarErrorText}
                                onChange={this.onChangeField}
                                renderLabelIcon={() => (
                                    <Info
                                        id='avatar-hint'
                                        className='ClientForm-InfoIcon'
                                    />
                                )}
                                tooltip={{
                                    placement: 'top',
                                    target: 'avatar-hint',
                                    render: () => (
                                        <ul className='ClientForm-TooltipBody'>
                                            <li>The maximum file size for uploads is 1 MB</li>
                                            <li>Only image files (JPG, GIF, PNG) are allowed</li>
                                            <li>Recommended aspect ratio is 3:1</li>
                                            <li>Recommended image resolution is 42x147</li>
                                        </ul>
                                    )
                                }}
                            />
                        </Col>
                    </Row>
                </div>
                <div className='ClientForm-Section'>
                    <div className='ClientForm-SectionTitle'>
                        Community
                    </div>
                    <Row>
                        <Col md={6}>
                            <SelectField
                                type='text'
                                name='organizationId'
                                value={organizationId}
                                options={map(
                                    directory.organization.list.dataSource.data,
                                    ({ id, label }) => ({
                                        text: label, value: id
                                    })
                                )}
                                label='Organization*'
                                className='ClientForm-SelectField'
                                hasError={organizationIdHasError}
                                errorText={organizationIdErrorText}
                                isDisabled={!isActive || this.isEditMode}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={6}>
                            <SelectField
                                type='text'
                                name='communityId'
                                value={communityId}
                                options={map(
                                    directory.community.list.dataSource.data,
                                    ({ id, name }) => ({
                                        text: name, value: id
                                    })
                                )}
                                label='Community*'
                                className='ClientForm-SelectField'
                                hasError={communityIdHasError}
                                errorText={communityIdErrorText}
                                isDisabled={!isActive || this.isEditMode}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                </div>
                <div className='ClientForm-Section'>
                    <div className='ClientForm-SectionTitle'>
                        Telecom
                    </div>
                    <Row>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='cellPhone'
                                value={cellPhone}
                                label='Cell Phone*'
                                className='ClientForm-TextField'
                                hasError={cellPhoneHasError}
                                errorText={cellPhoneErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeField}
                                renderLabelIcon={() => (
                                    <Info
                                        id='cell-phone-hint'
                                        className='ClientForm-InfoIcon'
                                    />
                                )}
                                tooltip={{
                                    placement: 'top',
                                    target: 'cell-phone-hint',
                                    render: () => (
                                        <ul className='ClientForm-TooltipBody'>
                                            <li>Digits only allowed</li>
                                            <li>No spaces, dashes, or special symbols</li>
                                            <li>Country code is required</li>
                                            <li>‘+’ may be a leading symbol</li>
                                        </ul>
                                    )
                                }}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='phone'
                                value={phone}
                                label='Home Phone'
                                className='ClientForm-TextField'
                                hasError={phoneHasError}
                                errorText={phoneErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeField}
                                renderLabelIcon={() => (
                                    <Info
                                        id='home-phone-hint'
                                        className='ClientForm-InfoIcon'
                                    />
                                )}
                                tooltip={{
                                    placement: 'top',
                                    target: 'home-phone-hint',
                                    render: () => (
                                        <ul className='ClientForm-TooltipBody'>
                                            <li>Digits only allowed</li>
                                            <li>No spaces, dashes, or special symbols</li>
                                            <li>Country code is required</li>
                                            <li>‘+’ may be a leading symbol</li>
                                        </ul>
                                    )
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='email'
                                value={email}
                                label={'Email' + (hasNoEmail ? '' : '*')}
                                className='ClientForm-TextField'
                                hasError={emailHasError}
                                errorText={emailErrorText}
                                isDisabled={!isActive || hasNoEmail}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={4} className='d-flex align-items-center'>
                            <CheckboxField
                                type='text'
                                name='hasNoEmail'
                                value={hasNoEmail}
                                label="Client does't have email"
                                className='ClientForm-CheckboxField'
                                isDisabled={!isActive || email}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                </div>
                <div className='ClientForm-Section'>
                    <div className='ClientForm-SectionTitle'>
                        Insurance
                    </div>
                    <Row>
                        <Col md={6}>
                            <SelectField
                                name='insuranceNetworkId'
                                hasSearchBox={true}
                                value={insuranceNetworkId}
                                options={map(
                                    directory.insurance.network.list.dataSource.data,
                                    ({ id, title }) => ({
                                        text: title, value: id
                                    })
                                )}
                                label='Network'
                                placeholder="Search by network name"
                                className='ClientForm-SelectField'
                                hasError={insuranceNetworkIdHasError}
                                errorText={insuranceNetworkIdErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={6}>
                            <TextField
                                type='text'
                                label='Plan'
                                name='insurancePaymentPlan'
                                value={insurancePaymentPlan}
                                className='ClientForm-TextField'
                                hasError={insurancePaymentPlanHasError}
                                errorText={insurancePaymentPlanErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='groupNumber'
                                value={groupNumber}
                                label='Group Number'
                                className='ClientForm-TextField'
                                hasError={groupNumberHasError}
                                errorText={groupNumberErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='memberNumber'
                                value={memberNumber}
                                label='Member Number'
                                className='ClientForm-TextField'
                                hasError={memberNumberHasError}
                                errorText={memberNumberErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='medicareNumber'
                                value={medicareNumber}
                                label='Medicare Number'
                                className='ClientForm-TextField'
                                hasError={medicareNumberHasError}
                                errorText={medicareNumberErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='medicaidNumber'
                                value={medicaidNumber}
                                label='Medicaid Number'
                                className='ClientForm-TextField'
                                hasError={medicaidNumberHasError}
                                errorText={medicaidNumberErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                </div>
                <div className='ClientForm-Section'>
                    <div className='ClientForm-SectionTitle'>
                        Ancillary Information
                    </div>
                    <Row>
                        <Col md={8}>
                            <TextField
                                type='text'
                                name='primaryCarePhysician'
                                value={primaryCarePhysician}
                                label='Primary Care Physician'
                                className='ClientForm-TextField'
                                hasError={primaryCarePhysicianHasError}
                                errorText={primaryCarePhysicianErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={4}>
                            <RadioGroupField
                                containerClass="ClientForm-RadioGroupField"
                                name="retained"
                                selected={retained}
                                title="Retained"
                                isDisabled={!isActive}
                                options={RADIO_GROUP_OPTIONS}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <DateField
                                hasTimeSelect
                                name="intakeDate"
                                className="ClientForm-DateField"
                                value={intakeDate}
                                label="Intake Date"
                                display={intakeDate && format(intakeDate, DATE_TIME_ZONE_FORMAT)}
                                hasError={intakeDateHasError}
                                errorText={intakeDateErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeDateTimeField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='currentPharmacyName'
                                value={currentPharmacyName}
                                label='Current Pharmacy Name'
                                className='ClientForm-TextField'
                                hasError={currentPharmacyNameHasError}
                                errorText={currentPharmacyNameErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='referralSource'
                                value={referralSource}
                                label='Referral Source'
                                className='ClientForm-TextField'
                                hasError={referralSourceHasError}
                                errorText={referralSourceErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='riskScore'
                                value={riskScore}
                                label='Risk score'
                                className='ClientForm-TextField'
                                hasError={riskScoreHasError}
                                errorText={riskScoreErrorText}
                                isDisabled={!isActive}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                </div>
            </Form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientForm)