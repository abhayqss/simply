import React, {Component} from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import {
    map,
    last,
    filter,
    isNumber,
    findWhere,
} from 'underscore'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {
    Col,
    Row,
    Form
} from 'reactstrap'

import Loader from 'components/Loader/Loader'
import TextField from 'components/Form/TextField/TextField'
import FileField from 'components/Form/FileField/FileField'
import SelectField from 'components/Form/SelectField/SelectField'
import CheckboxField from 'components/Form/CheckboxField/CheckboxField'

import './ContactForm.scss'

import * as contactFormActions from 'redux/contact/form/contactFormActions'
import * as contactDetailsActions from 'redux/contact/details/contactDetailsActions'

import * as stateListActions from 'redux/directory/state/list/stateListActions'
import * as communityListActions from 'redux/directory/community/list/communityListActions'
import * as systemRoleListActions from 'redux/directory/system/role/list/systemRoleListActions'
import * as organizationListActions from 'redux/directory/organization/list/organizationListActions'

import {ReactComponent as Info} from 'images/info.svg'

import {
    ERROR_CODES,
    CONTACT_STATUS_TYPES,
    PROFESSIONAL_SYSTEM_ROLES
} from 'lib/Constants'

import { isEmpty } from 'lib/utils/Utils'
import { Response } from 'lib/utils/AjaxUtils'

const { INVALID_LOGIN } = ERROR_CODES

const { PENDING } = CONTACT_STATUS_TYPES

let changeLog = []

const NO_COMMUNITY_ERROR_TEXT = 'There is no community created for current organization.'

function mapStateToProps (state) {
    const { form, details } =  state.contact

    return {
        error: form.error,
        fields: form.fields,
        isValid: form.isValid,
        isFetching: form.isFetching,

        details,

        auth: state.auth,

        directory: state.directory
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(contactFormActions, dispatch),

            details: {
                ...bindActionCreators(contactDetailsActions, dispatch),
            },

            directory: {
                state: {list: bindActionCreators(stateListActions, dispatch)},
                community: {list: bindActionCreators(communityListActions, dispatch)},
                organization: {list: bindActionCreators(organizationListActions, dispatch)},
                system: {
                    role: {list: bindActionCreators(systemRoleListActions, dispatch)}
                }
            }
        }
    }
}

class ContactForm extends Component {

    static propTypes = {
        contactId: PropTypes.number,
        isExpiredContact: PropTypes.bool
    }

    state = {
        isStateHintOpen: false
    }

    componentDidMount () {
        this.loadDirectoryData()

        const {
            auth,
            contactId
        } = this.props

        const {
            organizationId
        } = auth.login.user.data

        if (this.isEditMode()) {
            this.loadDetails(contactId)
                .then(Response(({ data }) => {
                    this.changeFields({
                        ...data,
                        address: data.address || {},
                        professionals: PROFESSIONAL_SYSTEM_ROLES.includes(data.systemRoleName)
                    }).then(() => {
                        this.loadCommunities(data.organizationId)
                    })
                }))
        }

        else {
            this.changeFields({
                organizationId,
                enableContact: true,
            }).then(() => {
                this.loadCommunities(organizationId)
                    .then(Response(({ data }) => {
                        if (data.length === 1) {
                            this.changeField('communityId', data[0].id)
                        }
                    }))
            })
        }
    }

    componentWillUnmount () {
        this.clear()
        changeLog = []
    }

    onToggleStateHint = () => {
        this.setState(s => ({
            isStateHintOpen: !s.isStateHintOpen
        }))
    }

    onChangeField = (name, value) => {
        this.changeField(name, value).then(() => {
            this.onFieldChanged(name, value)
            if (!this.props.isValid) this.validate()
        })
    }

    onFieldChanged = (name, value) => {
        changeLog.push({ name, value })

        if (name === 'organizationId') {
            this.changeFields({
                communityId: null,
                communityIdHasError: false,
                communityIdErrorText: ''
            })

            this.loadCommunities(value)
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

        if (name === 'avatar' && !value) {
            this.changeField('avatarName', '')
        }
    }

    onChangeAddressField = (name, value) => {
        this.changeFields({ address: {[name]: value} }).then(() => {
            changeLog.push({ name, value })

            if (!this.props.isValid) this.validate()
        })
    }

    onChangeSystemRoleField  = (name, value) => {
        const role = findWhere(
            this.props.directory.system.role.list.dataSource.data,
            { id: value }
        )

        this.changeFields({
            [name]: value,
            'professionals': PROFESSIONAL_SYSTEM_ROLES.includes(role.name)
        }).then(() => {
            changeLog.push({ name, value })

            if (!this.props.isValid) this.validate()
        })
    }

    clear () {
        this.props.actions.clear()
    }

    validate () {
        const {
            auth,
            fields,
            actions
        } = this.props

        return actions
            .validate(fields.toJS())
            .then(success => {
                if (this.isEditMode()) {
                    return success
                }

                const {
                    login,
                    loginErrorCode,
                    organizationId
                } = fields

                const o = last(changeLog)

                const data = loginErrorCode !== INVALID_LOGIN
                    && o.name === 'login'
                    && { login }

                return data ?
                    this.props
                        .actions
                        .validateUniq({ organizationId, ...data })
                        .then(uniq => success && uniq)
                    : success
            })
    }

    isEditMode() {
        return isNumber(this.props.contactId)
    }

    loadDirectoryData() {
        const {
            actions
        } = this.props

        const {
            state,
            system,
            organization,
        } = actions.directory

        state.list.load()
        organization.list.load()
        system.role.list.load({ isEditable: true })
    }

    loadDetails (contactId, shouldNotSave) {
        return this.props
                   .actions
                   .details
                   .load(contactId, shouldNotSave)
    }

    loadCommunities (organizationId) {
        return this.props
                   .actions
                   .directory
                   .community
                   .list
                   .load({ organizationId })
    }

    changeFields (changes) {
        return this.props
                   .actions
                   .changeFields(changes)
    }

    changeField (name, value) {
        return this.props
                   .actions
                   .changeField(name, value)
    }

    render () {

        const {
            fields,
            details,
            className,
            directory,
            isFetching,
            isExpiredContact
        } = this.props

        const {
            state,
            system,
            community,
            organization
        } = directory

        const {
            firstName,
            firstNameHasError,
            firstNameErrorText,

            lastName,
            lastNameHasError,
            lastNameErrorText,

            systemRoleId,
            systemRoleIdHasError,
            systemRoleIdErrorText,

            professionals,
            professionalsHasError,
            professionalsErrorText,

            login,
            loginHasError,
            loginErrorText,

            organizationId,
            organizationIdHasError,
            organizationIdErrorText,

            communityId,
            communityIdHasError,
            communityIdErrorText,

            avatar,
            avatarHasError,
            avatarErrorText,

            avatarName,

            status,

            address,

            phone,
            phoneHasError,
            phoneErrorText,

            mobilePhone,
            mobilePhoneHasError,
            mobilePhoneErrorText,

            fax,
            faxHasError,
            faxErrorText,

            secureMail,
            secureMailHasError,
            secureMailErrorText,

            /*enabledSearchCapability,
            enabledSearchCapabilityHasError,
            enabledSearchCapabilityErrorText,*/

            enableContact,
            enableContactHasError,
            enableContactErrorText,
        } = fields

        const {
            communityName,
            organizationName
        } = details.data || {}

        const communities = community.list.dataSource.data
        const organizations = organization.list.dataSource.data

        return (
            <Form className={cn('ContactForm', className)}>
                {isFetching && (
                    <Loader hasBackdrop />
                )}
                <div className='ContactForm-Section'>
                    <div className='ContactForm-SectionTitle'>
                        General Data
                    </div>
                    <Row>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='firstName'
                                value={firstName}
                                label='First Name*'
                                className='ContactForm-TextField'
                                isDisabled={isExpiredContact || this.isEditMode()}
                                hasError={firstNameHasError}
                                errorText={firstNameErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='lastName'
                                value={lastName}
                                label='Last Name*'
                                className='ContactForm-TextField'
                                isDisabled={isExpiredContact || this.isEditMode()}
                                hasError={lastNameHasError}
                                errorText={lastNameErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='login'
                                value={login}
                                label='Login*'
                                placeholder='Email'
                                className='ContactForm-TextField'
                                isDisabled={isExpiredContact || this.isEditMode()}
                                hasError={loginHasError}
                                errorText={loginErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <SelectField
                                name='systemRoleId'
                                value={systemRoleId}
                                hasTooltip={true}
                                options={map(system.role.list.dataSource.data, ({id, title}) => ({
                                    text: title, value: id
                                }))}
                                label='System Role*'
                                className='ContactForm-SelectField'
                                isDisabled={isExpiredContact}
                                hasError={systemRoleIdHasError}
                                errorText={systemRoleIdErrorText}
                                onChange={this.onChangeSystemRoleField}
                            />
                        </Col>
                        <Col md={4}>
                            <CheckboxField
                                name='professionals'
                                value={professionals}
                                label='Professionals'
                                className='ContactForm-CheckboxField'
                                isDisabled={isExpiredContact}
                                hasError={professionalsHasError}
                                errorText={professionalsErrorText}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <SelectField
                                name='organizationId'
                                value={organizationId}
                                hasTooltip={true}
                                hasAllOption={false}
                                hasNoneOption={false}
                                options={map(
                                    isEmpty(organizations) ? (
                                        details.data ? [
                                            { id: organizationId, label: organizationName }
                                        ] : []
                                    ) : organizations,
                                    ({ id, label }) => ({
                                        text: label, value: id
                                    })
                                )}
                                label='Organization*'
                                className='ContactForm-SelectField'
                                isDisabled={isExpiredContact || this.isEditMode()}
                                hasError={organizationIdHasError}
                                errorText={organizationIdErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={8}>
                            <SelectField
                                type='text'
                                name='communityId'
                                value={communityId}
                                hasTooltip={true}
                                hasAllOption={false}
                                hasNoneOption={false}
                                options={map(
                                    filter(
                                        isEmpty(communities) ? (
                                            details.data ? [
                                                { id: communityId, name: communityName }
                                            ] : []
                                        ) : communities,
                                        o => o.canAddContact || o.id === communityId
                                    ),
                                    ({ id, name }) => ({ text: name, value: id })
                                )}
                                label='Community*'
                                className={cn(
                                    'ContactForm-SelectField',
                                    { 'no-pointer-events': communities.length <= 1 }
                                )}
                                isDisabled={isExpiredContact}
                                hasError={communityIdHasError}
                                errorText={communityIdErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <FileField
                                name='avatar'
                                value={avatar ? avatar.name : avatarName}
                                label='Profile photo'
                                className='ContactForm-FileField'
                                hasHint={true}
                                isDisabled={isExpiredContact}
                                hasError={avatarHasError}
                                errorText={avatarErrorText}
                                hintText={'Supported file types: JPG, PNG, GIF | Max 1 mb'}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                </div>
                <div className='ContactForm-Section'>
                    <div className='ContactForm-SectionTitle'>
                        Contact Info
                    </div>
                    <Row>
                        <Col md={8}>
                            <TextField
                                type='text'
                                name='street'
                                value={address.street}
                                label='Street*'
                                className='ContactForm-TextField'
                                isDisabled={isExpiredContact}
                                hasError={address.streetHasError}
                                errorText={address.streetErrorText}
                                onChange={this.onChangeAddressField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='city'
                                value={address.city}
                                label='City*'
                                className='ContactForm-TextField'
                                isDisabled={isExpiredContact}
                                hasError={address.cityHasError}
                                errorText={address.cityErrorText}
                                onChange={this.onChangeAddressField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <SelectField
                                name='stateId'
                                value={address.stateId}
                                label='State*'
                                hasTooltip={true}
                                options={map(state.list.dataSource.data, ({ id, label }) => ({
                                    text: label, value: id
                                }))}
                                className='ContactForm-TextField'
                                defaultText='Select State'
                                isDisabled={isExpiredContact}
                                hasError={address.stateIdHasError}
                                errorText={address.stateIdErrorText}
                                onChange={this.onChangeAddressField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='zip'
                                value={address.zip}
                                label='Zip Code*'
                                className='ContactForm-TextField'
                                maxLength='5'
                                isDisabled={isExpiredContact}
                                hasError={address.zipHasError}
                                errorText={address.zipErrorText}
                                onChange={this.onChangeAddressField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='mobilePhone'
                                value={mobilePhone}
                                label='Mobile Phone #*'
                                className='ContactForm-TextField'
                                isDisabled={isExpiredContact}
                                hasError={mobilePhoneHasError}
                                errorText={mobilePhoneErrorText}
                                onChange={this.onChangeField}
                                renderLabelIcon={() => (
                                    <Info
                                        id='mobile-phone-hint'
                                        className='ContactForm-InfoIcon'
                                    />
                                )}
                                tooltip={{
                                    placement: 'top',
                                    target: 'mobile-phone-hint',
                                    render: () => (
                                        <ul className='ContactForm-TooltipBody'>
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
                                name='phone'
                                value={phone}
                                label='Phone #'
                                className='ContactForm-TextField'
                                isDisabled={isExpiredContact}
                                hasError={phoneHasError}
                                errorText={phoneErrorText}
                                onChange={this.onChangeField}
                                renderLabelIcon={() => (
                                    <Info
                                        id='phone-hint'
                                        className='ContactForm-InfoIcon'
                                    />
                                )}
                                tooltip={{
                                    target: 'phone-hint',
                                    render: () => (
                                        <ul className='ContactForm-TooltipBody'>
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
                                name='fax'
                                value={fax || ''}
                                label='Fax'
                                className='ContactForm-TextField'
                                isDisabled={isExpiredContact}
                                hasError={faxHasError}
                                errorText={faxErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type='text'
                                name='secureMail'
                                value={secureMail}
                                label='Secure Email'
                                className='ContactForm-TextField'
                                isDisabled={isExpiredContact}
                                hasError={secureMailHasError}
                                errorText={secureMailErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                </div>
                <div className='ContactForm-Section'>
                    <div className='ContactForm-SectionTitle'>
                        Settings
                    </div>
                    <Row>
                        {/*<Col md={4}>
                            <CheckboxField
                                name='enabledSearchCapability'
                                value={enabledSearchCapability}
                                label='Enable "NwHIN" search capability*'
                                className='ContactForm-CheckboxField'
                                isDisabled={isExpiredContact}
                                hasError={enabledSearchCapabilityHasError}
                                errorText={enabledSearchCapabilityErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>*/}
                        <Col md={4}>
                            <CheckboxField
                                name='enableContact'
                                value={enableContact}
                                label='Enable contact'
                                className='ContactForm-CheckboxField'
                                hasError={enableContactHasError}
                                errorText={enableContactErrorText}
                                isDisabled={
                                    !this.isEditMode()
                                    || isExpiredContact
                                    || (status && status.name === PENDING)
                                }
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    </div>
            </Form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)