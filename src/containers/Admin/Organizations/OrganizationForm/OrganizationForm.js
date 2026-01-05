import React, {Component} from 'react'

import {
    any,
    map,
    last,
    each,
    pluck,
    filter,
    reject,
    isNumber,
    isObject,
    findWhere, omit,
} from 'underscore'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import cn from 'classnames'
import PropTypes from 'prop-types'
import {Label} from 'react-bootstrap'
import {Form, Col, Row, UncontrolledTooltip as Tooltip} from 'reactstrap'

import 'components/InfoHint/InfoHint.scss'

import Tabs from 'components/Tabs/Tabs'
import Table from 'components/Table/Table'
import Loader from 'components/Loader/Loader'
import Actions from 'components/Table/Actions/Actions'
import TextField from 'components/Form/TextField/TextField'
import FileField from 'components/Form/FileField/FileField'
import MultiSelect from 'components/MultiSelect/MultiSelect'
import SearchField from 'components/SearchField/SearchField'
import SelectField from 'components/Form/SelectField/SelectField'
import CheckboxField from 'components/Form/CheckboxField/CheckboxField'

import './OrganizationForm.scss'

import InsuranceNetworkPaymentPlanPicker from '../InsuranceNetworkPaymentPlanPicker/InsuranceNetworkPaymentPlanPicker'

import * as organizationFormActions from 'redux/organization/form/organizationFormActions'
import * as organizationDetailsActions from 'redux/organization/details/organizationDetailsActions'
import * as insuranceNetworkListActions from 'redux/insurance/network/list/insuranceNetworkListActions'

import * as stateListActions from 'redux/directory/state/list/stateListActions'
import * as ageGroupListActions from 'redux/directory/age/group/list/ageGroupListActions'
import * as careLevelListActions from 'redux/directory/care/level/list/careLevelListActions'
import * as primaryFocusListActions from 'redux/directory/primaryFocus/list/primaryFocusListActions'
import * as communityTypeListActions from 'redux/directory/community/type/list/communityTypeListActions'
import * as languageServiceListActions from 'redux/directory/language/service/list/languageServiceListActions'
import * as treatmentServiceListActions from 'redux/directory/treatment/service/list/treatmentServiceListActions'
import * as emergencyServiceListActions from 'redux/directory/emergency/service/list/emergencyServiceListActions'
import * as additionalServiceListActions from 'redux/directory/additional/service/list/additionalServiceListActions'
import * as directoryInsuranceNetworkListActions from 'redux/directory/insurance/network/list/insuranceNetworkListActions'

import {ReactComponent as Info} from 'images/info.svg'

import {
    promise,
    isEmpty,
    isNotEmpty,
    getDataPage,
    getRandomInt
} from 'lib/utils/Utils'

import { Response } from 'lib/utils/AjaxUtils'

import { PAGINATION } from 'lib/Constants'

const ICON_SIZE = 36

const { MAX_SIZE } = PAGINATION

let changeLog = []

function mapStateToProps (state) {
    const { form, details } = state.organization

    return {
        error: form.error,
        fields: form.fields,
        isFetching: form.isFetching,

        isValid: form.isValid,
        isValidLegalInfoTab: form.isValidLegalInfoTab,
        isValidMarketplaceTab: form.isValidMarketplaceTab,

        details,
        insurance: state.insurance,

        directory: state.directory
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(organizationFormActions, dispatch),

            details: bindActionCreators(organizationDetailsActions, dispatch),
            
            insurance: {
                network: { list: bindActionCreators(insuranceNetworkListActions, dispatch) }
            },

            directory: {
                treatment: {
                    service: { list: bindActionCreators(treatmentServiceListActions, dispatch) }
                },
                emergency: {
                    service: { list: bindActionCreators(emergencyServiceListActions, dispatch) }
                },
                language: {
                    service: { list: bindActionCreators(languageServiceListActions, dispatch) }
                },
                additional: {
                    service: { list: bindActionCreators(additionalServiceListActions, dispatch) }
                },

                age: { list: bindActionCreators(ageGroupListActions, dispatch) },
                state: { list: bindActionCreators(stateListActions, dispatch) },
                care: {
                    level: { list: bindActionCreators(careLevelListActions, dispatch) },
                },
                community: {
                    type: { list: bindActionCreators(communityTypeListActions, dispatch) }
                },
                primaryFocus: { list: bindActionCreators(primaryFocusListActions, dispatch) },
                network: { list: bindActionCreators(directoryInsuranceNetworkListActions, dispatch) },
            }
        }
    }
}

function Relationship ({ title, values, onChange }) {
    return (
        <div className="Relationship">
            <Row>
                <Col md={6} className="Relationship-Title">
                    <Label>
                        {title}
                    </Label>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <SelectField
                        type='text'
                        name='comingEvents'
                        value={''}
                        label='I want to share information about the events coming to*'
                        defaultText="Select Value"
                        className='OrganizationForm-SelectField'
                        isMultiple={false}
                        hasError={false}
                        errorText={''}
                        onChange={onChange}
                    />
                </Col>
                <Col md={6}>
                    <SelectField
                        type='text'
                        name='shareOrganization*'
                        value={''}
                        label='Share with Organization*'
                        defaultText="Select Value"
                        className='OrganizationForm-SelectField'
                        isMultiple={false}
                        hasError={false}
                        errorText={''}
                        onChange={onChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <SelectField
                        type='text'
                        name='shareCommunity'
                        value={''}
                        label='Share with Community*'
                        defaultText="Select Value"
                        className='OrganizationForm-SelectField'
                        isMultiple={false}
                        hasError={false}
                        errorText={''}
                        onChange={onChange}
                    />
                </Col>
            </Row>
        </div>
    )
}

class OrganizationForm extends Component {
    static propTypes = {
        tab: PropTypes.number,
        organizationId: PropTypes.number,
        onChangeTab: PropTypes.func
    }

    static defaultProps = {
        tab: 0,
        onChangeTab: () => {}
    }

    state = {
        insuranceNetworkPagination: {
            page: 1,
            size: 5,
        },
        isInsuranceNetworkPaymentPlanPickerOpen: false,
    }

    componentDidMount () {
        changeLog = []

        this.loadDirectoryData()
        this.loadInsuranceNetworks()

        if (this.isEditMode()) {
            this.updateDetails()
                .then(Response(({ data }) => {
                    const marketplace = data.marketplace || {}

                    this.changeFields({ ...data, marketplace })

                    const pfIds = marketplace.primaryFocusIds

                    if (isNotEmpty(pfIds)) {
                        this.loadCommunityTypes(pfIds)
                        this.loadTreatmentServices(pfIds)
                    }
                }))
        }
    }

    componentWillUnmount () {
        this.clear()
        changeLog = []
    }

    onChangeTab = tab => {
        const {
            isValid,
            onChangeTab
        } = this.props

        isValid && onChangeTab(tab)
    }

    onChangeLegalInfoField = (name, value) => {
        this.changeField(name, value).then(() => {
            changeLog.push({ name, value })

            this.onLegalInfoFieldChanged(name, value)

            if (!this.props.isValid) this.validateLegalInfo()
        })
    }

    onLegalInfoFieldChanged = (name, value) => {
        if (name === 'logo' && !value) {
            this.changeField('logoName', '')
        }
    }

    onChangeMarketplaceField = (name, value) => {
        this.changeMarketplaceField(name, value).then(() => {
            changeLog.push({ name, value })

            this.onMarketplaceFieldChanged(name, value)

            if (!this.props.isValid) this.validateMarketplace()
        })
    }

    onMarketplaceFieldChanged = (name, value) => {
        if (name === 'primaryFocusIds') {
            this.onChangeMarketplaceField('communityTypeIds', [])
            this.onChangeMarketplaceField('serviceTreatmentApproachIds', [])

            if (isNotEmpty(value)) {
                this.loadCommunityTypes(value)
                this.loadTreatmentServices(value)
            }

            else {
                this.clearCommunityTypes()
                this.clearTreatmentServices()
            }
        }
    }

    onChangeNetworkSearchField = (name, value) => {
        this.props
            .actions
            .insurance
            .network
            .list
            .changeFilterField(name, value)
            .then(this.onNetworkSearchFieldChanged)
    }

    onNetworkSearchFieldChanged = () => {
        this.loadInsuranceNetworks()
    }

    onClearNetworkSearchField = (name) => {
        this.props
            .actions
            .insurance
            .network
            .list
            .changeFilterField(name, '')
            .then(this.onNetworkSearchFieldChanged)
    }

    onFocusNetworkSearchField = () => {
        this.setState({
            isInsuranceNetworkPaymentPlanPickerOpen: true
        })
    }

    onCompleteInsuranceNetworkPaymentPlanPicker = networks => {
        this.onChangeMarketplaceField(
            'insuranceNetworkIds', pluck(networks, 'id')
        )

        let planIds = []

        const {
            insurancePaymentPlanIds
        } = this.props.fields.marketplace

        each(networks, o => {
            const filtered = filter(
                o.paymentPlans,
                p => insurancePaymentPlanIds.includes(p.id)
            )

            planIds = [
                ...planIds,
                ...map(
                    isNotEmpty(filtered) ? filtered : o.paymentPlans, o => o.id
                ) || []
            ]
        })

        this.onChangeMarketplaceField(
            'insurancePaymentPlanIds', planIds
        )

        this.setState({
            isInsuranceNetworkPaymentPlanPickerOpen: false
        })

        this.onClearNetworkSearchField('name')
    }

    onCancelInsuranceNetworkPaymentPlanPicker = () => {
        this.setState({
            isInsuranceNetworkPaymentPlanPickerOpen: false
        })

        this.onClearNetworkSearchField('name')
    }

    onDeleteInsuranceNetwork = network => {
        const {
            insuranceNetworkIds,
            insurancePaymentPlanIds
        } = this.props.fields.marketplace

        this.onChangeMarketplaceField(
            'insuranceNetworkIds',
            reject(insuranceNetworkIds, id => id === network.id)
        )

        this.onChangeMarketplaceField(
            'insurancePaymentPlanIds',
            reject(insurancePaymentPlanIds, id => any(network.paymentPlans, p => p.id === id))
        )
    }

    onRefreshNetworks = (page) => {
        this.setState({
            insuranceNetworkPagination: {
                page, size: 5
            }
        })
    }

    clear () {
        this.props.actions.clear()
    }

    changeField (name, value) {
        return this.props
                   .actions
                   .changeField(name, value)
    }

    changeMarketplaceField (name, value) {
        return this.props
                   .actions
                   .changeMarketplaceField(name, value)
    }

    changeFields (changes) {
        return this.props
                   .actions
                   .changeFields(changes)
    }

    isEditMode() {
        return isNumber(this.props.organizationId)
    }

    loadDirectoryData() {
        const {actions} = this.props

        const {
            age,
            care,
            state,
            language,
            emergency,
            additional,
            network,
            primaryFocus
        } = actions.directory

        age.list.load()
        state.list.load()
        network.list.load()
        care.level.list.load()
        primaryFocus.list.load()
        language.service.list.load()
        emergency.service.list.load()
        additional.service.list.load()
    }

    loadCommunityTypes (primaryFocusIds) {
        this.props
            .actions
            .directory
            .community
            .type
            .list
            .load(primaryFocusIds)

    }

    clearCommunityTypes () {
        this.props
            .actions
            .directory
            .community
            .type
            .list
            .clear()
    }

    loadTreatmentServices (primaryFocusIds) {
        this.props
            .actions
            .directory
            .treatment
            .service
            .list
            .load(primaryFocusIds)

    }

    clearTreatmentServices () {
        this.props
            .actions
            .directory
            .treatment
            .service
            .list
            .clear()

    }

    updateDetails (isReload) {
        const {
            actions,
            organizationId,
            details: { data }
        } = this.props

        if (isReload || isEmpty(data) || organizationId !== data.id) {
            return actions
                .details
                .load(organizationId, true)

        }

        return promise({
            success: true, data
        })
    }

    loadInsuranceNetworks () {
        const {
            actions,
            insurance
        } = this.props

        actions
            .insurance
            .network
            .list
            .load({
                ...insurance
                    .network
                    .list
                    .dataSource
                    .filter
                    .toJS(),
                size: MAX_SIZE
            })
    }

    validateLegalInfo () {
        const {
            fields,
            actions
        } = this.props

        return actions
            .validateLegalInfo(fields.toJS())
            .then(success => {
                if (this.isEditMode()) {
                    return success
                }

                const { oid, name, companyId } = fields

                const o = last(changeLog)

                const data = omit(
                    {
                        ...o.name === 'oid' && { oid },
                        ...o.name === 'name' && { name },
                        ...o.name === 'companyId' && { companyId }
                    }, isEmpty
                )

                return isNotEmpty(data) ?
                    this.props
                        .actions
                        .validateUniq(data)
                        .then(uniq => success && uniq)
                    : success
            })
    }

    validateMarketplace() {
        const { marketplace } = this.props.fields.toJS()
        return this.props.actions.validateMarketplace(marketplace)
    }

    render () {
        const {
            tab,
            fields,
            isFetching,
            isValidLegalInfoTab,
            isValidMarketplaceTab,

            insurance,
            directory,

            className
        } = this.props

        const {
            insuranceNetworkPagination: insNtwPagination
        } = this.state

        const {
            age,
            care,
            state,
            language,
            treatment,
            emergency,
            additional,
            community,
            primaryFocus
        } = directory

        let communities = community.type.list.dataSource.data
        let treatments = treatment.service.list.dataSource.data

        let networks = insurance.network.list
        let allNetworks = directory.insurance.network.list

        const {
            name,
            nameHasError,
            nameErrorText,

            oid,
            oidHasError,
            oidErrorText,

            companyId,
            companyIdHasError,
            companyIdErrorText,

            email,
            emailHasError,
            emailErrorText,

            phone,
            phoneHasError,
            phoneErrorText,

            street,
            streetHasError,
            streetErrorText,

            city,
            cityHasError,
            cityErrorText,

            stateId,
            stateIdHasError,
            stateIdErrorText,

            zipCode,
            zipCodeHasError,
            zipCodeErrorText,

            logo,
            logoHasError,
            logoErrorText,

            logoName,

            marketplace
        } = fields

        const {
            confirmVisibility,

            prerequisite,
            prerequisiteHasError,
            prerequisiteErrorText,

            exclusion,
            exclusionHasError,
            exclusionErrorText,

            appointmentsEmail,
            appointmentsEmailHasError,
            appointmentsEmailErrorText,

            appointmentsSecureEmail,
            appointmentsSecureEmailHasError,
            appointmentsSecureEmailErrorText,

            servicesSummaryDescription,
            servicesSummaryDescriptionHasError,
            servicesSummaryDescriptionErrorText,

            primaryFocusIds,
            primaryFocusIdsHasError,
            primaryFocusIdsErrorText,

            communityTypeIds,
            communityTypeIdsHasError,
            communityTypeIdsErrorText,

            levelOfCareIds,
            levelOfCareIdsHasError,
            levelOfCareIdsErrorText,

            ageGroupIds,
            ageGroupIdsHasError,
            ageGroupIdsErrorText,

            serviceTreatmentApproachIds,
            serviceTreatmentApproachIdsHasError,
            serviceTreatmentApproachIdsErrorText,

            emergencyServiceIds,
            emergencyServiceIdsHasError,
            emergencyServiceIdsErrorText,

            languageServiceIds,
            languageServiceIdsHasError,
            languageServiceIdsErrorText,

            additionalServiceIds,
            additionalServiceIdsHasError,
            additionalServiceIdsErrorText,

            insuranceNetworkIds,

            insurancePaymentPlanIds,

            allowAppointments //This Name Has to be changed , but using it for backend integration
        } = marketplace

        return (
            <Form className={cn('OrganizationForm', className)}>
                {isFetching && (
                    <Loader hasBackdrop />
                )}
                <Tabs
                    className='OrganizationForm-Tabs'
                    items={[
                        {title: 'Legal Info', isActive: tab === 0, hasError: !isValidLegalInfoTab},
                        {title: 'Marketplace', isActive: tab === 1, hasError: !isValidMarketplaceTab},
                        /* {title: 'Affiliate Relationship', isActive: tab === 2},*/
                    ]}
                    onChange={this.onChangeTab}
                />
                {tab === 0 ? (
                    <div className="LegalInfo">
                        <div className='OrganizationForm-Section LegalInfo-Section'>
                            <div className='OrganizationForm-SectionTitle'>
                                General Data
                            </div>
                            <Row>
                                <Col md={8}>
                                    <TextField
                                        type='text'
                                        name='name'
                                        value={name}
                                        label='Organization Name*'
                                        className='OrganizationForm-TextField'
                                        hasError={nameHasError}
                                        errorText={nameErrorText}
                                        onChange={this.onChangeLegalInfoField}
                                    />
                                </Col>
                                <Col md={4}>
                                    <TextField
                                        type='text'
                                        name='oid'
                                        value={oid}
                                        tabIndex={1}
                                        label='Organization OID*'
                                        renderLabelIcon={()=> (
                                            <Info
                                                id="Oid-Hint"
                                                className="OrganizationForm-LabelIcon"
                                            />
                                        )}
                                        tooltip={{
                                            target: 'Oid-Hint',
                                            text: `Organization OID is a unique ID that is used for
                                             identifying the organization across Simply Connect system.
                                              'Provider NPI' or 'Federal TAX ID' can be used for this purpose.`
                                        }}
                                        className='OrganizationForm-TextField'
                                        hasError={oidHasError}
                                        errorText={oidErrorText}
                                        isDisabled={this.isEditMode()}
                                        onChange={this.onChangeLegalInfoField}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <TextField
                                        type='text'
                                        name='companyId'
                                        value={companyId}
                                        label='Company ID*'
                                        renderLabelIcon={()=> (
                                            <Info
                                                id="Company-ID-Hint"
                                                className="OrganizationForm-LabelIcon"
                                            />
                                        )}
                                        tooltip={{
                                            target: 'Company-ID-Hint',
                                            text: `Company ID is a part of the credentials required
                                             to log in to Simply Connect portal.`
                                        }}
                                        className='OrganizationForm-TextField'
                                        hasError={companyIdHasError}
                                        errorText={companyIdErrorText}
                                        isDisabled={this.isEditMode()}
                                        onChange={this.onChangeLegalInfoField}
                                    />
                                </Col>
                                <Col md={4}>
                                    <TextField
                                        type='email'
                                        name='email'
                                        value={email}
                                        label='Email*'
                                        className='OrganizationForm-TextField'
                                        hasError={emailHasError}
                                        errorText={emailErrorText}
                                        onChange={this.onChangeLegalInfoField}
                                    />
                                </Col>
                                <Col md={4}>
                                    <TextField
                                        type='text'
                                        name='phone'
                                        value={phone}
                                        label='Phone*'
                                        className='OrganizationForm-TextField'
                                        hasError={phoneHasError}
                                        errorText={phoneErrorText}
                                        onChange={this.onChangeLegalInfoField}
                                        renderLabelIcon={()=> (
                                            <Info
                                                id="phone-hint"
                                                className="OrganizationForm-LabelIcon"
                                            />
                                        )}
                                        tooltip={{
                                            target: 'phone-hint',
                                            render: () => (
                                                <ul className='OrganizationForm-PhoneTooltipBody'>
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
                        </div>
                        <div className='OrganizationForm-Section LegalInfo-Section'>
                            <div className='OrganizationForm-SectionTitle'>
                                Address
                            </div>
                            <Row>
                                <Col md={8}>
                                    <TextField
                                        type='text'
                                        name='street'
                                        value={street}
                                        label='Street*'
                                        className='OrganizationForm-TextField'
                                        hasError={streetHasError}
                                        errorText={streetErrorText}
                                        onChange={this.onChangeLegalInfoField}
                                    />
                                </Col>
                                <Col md={4}>
                                    <TextField
                                        type='text'
                                        name='city'
                                        value={city}
                                        label='City*'
                                        className='OrganizationForm-TextField'
                                        hasError={cityHasError}
                                        errorText={cityErrorText}
                                        onChange={this.onChangeLegalInfoField}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <SelectField
                                        name='stateId'
                                        value={stateId}
                                        label='State*'
                                        options={map(state.list.dataSource.data, ({id, label}) => ({
                                            text: label, value: id
                                        }))}
                                        defaultText="Select State"
                                        className='OrganizationForm-SelectField'
                                        isMultiple={false}
                                        hasError={stateIdHasError}
                                        errorText={stateIdErrorText}
                                        onChange={this.onChangeLegalInfoField}
                                    />
                                </Col>
                                <Col md={4}>
                                    <TextField
                                        type='text'
                                        name='zipCode'
                                        value={zipCode}
                                        label='Zip Code*'
                                        className='OrganizationForm-TextField'
                                        maxLength='5'
                                        hasError={zipCodeHasError}
                                        errorText={zipCodeErrorText}
                                        onChange={this.onChangeLegalInfoField}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div className='OrganizationForm-Section LegalInfo-Section'>
                            <div className='OrganizationForm-SectionTitle'>
                                Organization Logo
                            </div>
                            <Row>
                                <Col md={8}>
                                    <FileField
                                        name='logo'
                                        value={logo ? logo.name : logoName}
                                        label='Select file'
                                        renderLabelIcon={()=> (
                                            <Info
                                                id="Logo-Hint"
                                                className="OrganizationForm-LabelIcon"
                                            />
                                        )}
                                        tooltip={{
                                            target: 'Logo-Hint',
                                            text: `The maximum file size for uploads is 1 MB
                                                   Only image files (JPG, GIF, PNG) are allowed
                                                   Recommended aspect ratio is 3:1
                                                   Recommended image resolution is 42x147`
                                        }}
                                        className='OrganizationForm-TextField'
                                        hasError={logoHasError}
                                        errorText={logoErrorText}
                                        hasHint={true}
                                        hintText={'Supported file types: JPG, PNG, GIF | Max 1 mb'}
                                        onChange={this.onChangeLegalInfoField}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                ) : null}
                {tab === 1 ? (
                    <div className='Marketplace'>
                        <div className='OrganizationForm-Section Marketplace-Section'>
                            <Row>
                                <Col md={12}>
                                    <CheckboxField
                                        id="ConfirmVisibilityHint"
                                        name='confirmVisibility'
                                        value={confirmVisibility}
                                        className="OrganizationForm-ConfirmVisibilityField"
                                        label={'Confirm that organization will be visible in Marketplace'}
                                        renderLabelIcon={() => (
                                            <Info
                                                id='ConfirmVisibilityHint'
                                                className={'InfoHint ConfirmVisibilityHint'}/>
                                        )}
                                        onChange={this.onChangeMarketplaceField}
                                    />
                                    <Tooltip
                                        placement="right"
                                        target="ConfirmVisibilityHint">
                                        The organization will be available in the search results in
                                        mobile and web apps ("Marketplace" feature).
                                    </Tooltip>
                                </Col>
                            </Row>
                            <div className='OrganizationForm-SectionTitle'>
                                Basic Info
                            </div>
                            <Row>
                                <Col md={6}>
                                    <SelectField
                                        name='primaryFocusIds'
                                        value={primaryFocusIds}
                                        options={map(primaryFocus.list.dataSource.data, ({id, label}) => ({
                                            text: label, value: id
                                        }))}
                                        label='Primary focus*'
                                        defaultText="Select Value"
                                        className='OrganizationForm-SelectField'
                                        isMultiple={true}
                                        hasTooltip={true}
                                        hasAllOption={false}
                                        hasError={primaryFocusIdsHasError}
                                        errorText={primaryFocusIdsErrorText}
                                        onChange={this.onChangeMarketplaceField}
                                    />
                                </Col>
                                <Col md={6}>
                                    <SelectField
                                        name='communityTypeIds'
                                        value={communityTypeIds}
                                        options={map(communities, ({id, label}, i) => ({
                                            text: label,
                                            value: id,
                                            hasSeparator: communities[i].primaryFocusId !== (
                                                communities[i + 1] && communities[i + 1].primaryFocusId
                                            )
                                        }))}
                                        label='Community type*'
                                        defaultText="Select Value"
                                        className='OrganizationForm-SelectField'
                                        isMultiple={true}
                                        hasTooltip={true}
                                        isDisabled={isEmpty(communities)}
                                        hasError={communityTypeIdsHasError}
                                        errorText={communityTypeIdsErrorText}
                                        onChange={this.onChangeMarketplaceField}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <SelectField
                                        name='ageGroupIds'
                                        value={ageGroupIds}
                                        options={map(age.group.list.dataSource.data, ({id, label}) => ({
                                            text: label, value: id
                                        }))}
                                        label='Age Groups Accepted'
                                        defaultText="Select Value"
                                        className='OrganizationForm-SelectField'
                                        isMultiple={true}
                                        hasTooltip={true}
                                        hasError={ageGroupIdsHasError}
                                        errorText={ageGroupIdsErrorText}
                                        onChange={this.onChangeMarketplaceField}
                                    />
                                </Col>
                                <Col md={6}>
                                    <SelectField
                                        name='levelOfCareIds'
                                        value={levelOfCareIds}
                                        options={map(care.level.list.dataSource.data, ({id, label}) => ({
                                            text: label, value: id
                                        }))}
                                        label='Levels Of Care'
                                        defaultText="Select Value"
                                        className='OrganizationForm-SelectField'
                                        isMultiple={true}
                                        hasTooltip={true}
                                        hasAllOption={false}
                                        hasNoneOption={true}
                                        hasError={levelOfCareIdsHasError}
                                        errorText={levelOfCareIdsErrorText}
                                        onChange={this.onChangeMarketplaceField}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div className='OrganizationForm-Section Marketplace-Section'>
                            <div className='OrganizationForm-SectionTitle'>
                                Services
                            </div>
                            <Row>
                                <Col md={12}>
                                    <TextField
                                        type='textarea'
                                        name='servicesSummaryDescription'
                                        value={servicesSummaryDescription}
                                        label='Services Summary Description*'
                                        className='OrganizationForm-TextAreaField'
                                        hasError={servicesSummaryDescriptionHasError}
                                        errorText={servicesSummaryDescriptionErrorText}
                                        onChange={this.onChangeMarketplaceField}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <SelectField
                                        name='serviceTreatmentApproachIds'
                                        value={serviceTreatmentApproachIds}
                                        options={map(treatments, ({id, label}, i) => ({
                                            text: label,
                                            value: id,
                                            hasSeparator: treatments[i].primaryFocusId !== (
                                                treatments[i + 1] && treatments[i + 1].primaryFocusId
                                            )
                                        }))}
                                        label='Services/Treatment Approaches*'
                                        defaultText="Select Value"
                                        className='OrganizationForm-SelectField'
                                        isMultiple={true}
                                        hasTooltip={true}
                                        isDisabled={isEmpty(treatments)}
                                        hasError={serviceTreatmentApproachIdsHasError}
                                        errorText={serviceTreatmentApproachIdsErrorText}
                                        onChange={this.onChangeMarketplaceField}
                                    />
                                </Col>
                                <Col md={6}>
                                    <SelectField
                                        name='emergencyServiceIds'
                                        value={emergencyServiceIds}
                                        options={map(emergency.service.list.dataSource.data, ({id, label}) => ({
                                            text: label, value: id
                                        }))}
                                        label='Emergency Services'
                                        defaultText="Select Value"
                                        className='OrganizationForm-SelectField'
                                        isMultiple={true}
                                        hasTooltip={true}
                                        hasError={emergencyServiceIdsHasError}
                                        errorText={emergencyServiceIdsErrorText}
                                        onChange={this.onChangeMarketplaceField}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <SelectField
                                        name='languageServiceIds'
                                        value={languageServiceIds}
                                        options={map(language.service.list.dataSource.data, ({id, label}) => ({
                                            text: label, value: id
                                        }))}
                                        label='Language Services'
                                        defaultText="Select Value"
                                        className='OrganizationForm-SelectField'
                                        isMultiple={true}
                                        hasTooltip={true}
                                        hasNoneOption={true}
                                        hasError={languageServiceIdsHasError}
                                        errorText={languageServiceIdsErrorText}
                                        onChange={this.onChangeMarketplaceField}
                                    />
                                </Col>
                                <Col md={6}>
                                    <SelectField
                                        name='additionalServiceIds'
                                        value={additionalServiceIds}
                                        options={map(additional.service.list.dataSource.data, ({id, label}) => ({
                                            text: label, value: id
                                        }))}
                                        label='Additional Services'
                                        defaultText="Select Value"
                                        className='OrganizationForm-SelectField'
                                        isMultiple={true}
                                        hasTooltip={true}
                                        hasNoneOption={true}
                                        hasError={additionalServiceIdsHasError}
                                        errorText={additionalServiceIdsErrorText}
                                        onChange={this.onChangeMarketplaceField}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div className='OrganizationForm-Section Marketplace-Section'>
                            <div className='OrganizationForm-SectionTitle'>
                                Program requirements
                            </div>
                            <Row>
                                <Col md={12}>
                                    <TextField
                                        type='textarea'
                                        name='prerequisite'
                                        value={prerequisite}
                                        label='Prerequisite'
                                        className='OrganizationForm-TextAreaField'
                                        hasError={prerequisiteHasError}
                                        errorText={prerequisiteErrorText}
                                        onChange={this.onChangeMarketplaceField}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <TextField
                                        type='textarea'
                                        name='exclusion'
                                        value={exclusion}
                                        label='Exclusion'
                                        className='OrganizationForm-TextAreaField'
                                        hasError={exclusionHasError}
                                        errorText={exclusionErrorText}
                                        onChange={this.onChangeMarketplaceField}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div className='OrganizationForm-Section Marketplace-Section'>
                            <div className='OrganizationForm-SectionTitle'>
                                Appointments
                            </div>
                            <Row>
                                <Col md={12}>
                                    <CheckboxField
                                        className='OrganizationForm-CheckboxField'
                                        name='allowAppointments'
                                        value={allowAppointments}
                                        label={'Allow appointments via PHR app'}
                                        onChange={this.onChangeMarketplaceField}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <TextField
                                        type='text'
                                        name='appointmentsEmail'
                                        value={appointmentsEmail}
                                        label='Email'
                                        className='OrganizationForm-TextField'
                                        isMultiple={false}
                                        hasError={appointmentsEmailHasError}
                                        errorText={appointmentsEmailErrorText}
                                        onChange={this.onChangeMarketplaceField}
                                    />
                                </Col>
                                <Col md={6}>
                                    <TextField
                                        type='text'
                                        name='appointmentsSecureEmail'
                                        value={appointmentsSecureEmail}
                                        label={`Secure Email ${allowAppointments ? '*' : ''}`}
                                        className='OrganizationForm-TextField'
                                        isMultiple={false}
                                        hasError={appointmentsSecureEmailHasError}
                                        errorText={appointmentsSecureEmailErrorText}
                                        onChange={this.onChangeMarketplaceField}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div className='OrganizationForm-Section Marketplace-Section'>
                            <div className='OrganizationForm-SectionTitle'>
                                Payment & Insurance Accepted
                            </div>
                            <SearchField
                                name="name"
                                value={networks.dataSource.filter.name}
                                placeholder='Search Network by Name'
                                className='OrganizationForm-SearchField'
                                onClear={this.onClearNetworkSearchField}
                                onChange={this.onChangeNetworkSearchField}
                                onFocus={this.onFocusNetworkSearchField}
                            />
                            {this.state.isInsuranceNetworkPaymentPlanPickerOpen && (
                                <InsuranceNetworkPaymentPlanPicker
                                    networkIds={insuranceNetworkIds}
                                    paymentPlanIds={insurancePaymentPlanIds}
                                    searchedText={networks.dataSource.filter.name}
                                    onComplete={this.onCompleteInsuranceNetworkPaymentPlanPicker}
                                    onCancel={this.onCancelInsuranceNetworkPaymentPlanPicker}
                                />
                            )}
                            {!isEmpty(insuranceNetworkIds) && (
                                <Table
                                    hasHover
                                    hasPagination
                                    className="OrganizationForm-SelectedNetworks"
                                    title="Network / Payment method"
                                    keyField="rid"
                                    isLoading={allNetworks.isFetching}
                                    data={getDataPage(
                                        map(
                                            filter(
                                                allNetworks.dataSource.data,
                                                o => insuranceNetworkIds.includes(o.id)
                                            ),
                                            o => ({rid: getRandomInt(0, 10000), ...o})
                                        ),
                                        { ...insNtwPagination, page: insNtwPagination.page - 1 }
                                    )}
                                    pagination={{
                                        ...insNtwPagination,
                                        totalCount: insuranceNetworkIds.length
                                    }}
                                    columns={[
                                        {
                                            dataField: 'title',
                                            text: 'Network Name',
                                            headerStyle: {
                                                width: '430px'
                                            }
                                        },
                                        {
                                            dataField: 'paymentPlans',
                                            text: 'Payment Plan',
                                            headerStyle: {
                                                width: '350px'
                                            },
                                            formatter: (v, row) => {
                                                const paymentPlans = findWhere(
                                                    allNetworks.dataSource.data,
                                                    { id: row.id }
                                                ).paymentPlans

                                                return (
                                                    paymentPlans.length ? (
                                                        <MultiSelect
                                                            isMultiple
                                                            isDisabled
                                                            hasTooltip
                                                            className="InsuranceNetworkPaymentPlanList-MultiSelect"
                                                            value={map(
                                                                filter(
                                                                   paymentPlans,
                                                                    o => insurancePaymentPlanIds.includes(o.id)
                                                                ),
                                                                o => o.id
                                                            )}
                                                            options={map(paymentPlans, ({id, title}) => ({
                                                                text: title, value: id
                                                            }))}
                                                        />
                                                    ) : null
                                                )
                                            }
                                        },
                                        {
                                            dataField: '',
                                            text: '',
                                            formatter: (v, row) => {
                                                return (
                                                    <Actions
                                                        data={row}
                                                        iconSize={ICON_SIZE}
                                                        className={'InsuranceNetworkPaymentPlanList-Actions'}
                                                        hasDeleteAction
                                                        deleteHintMessage={"Delete plan and network"}
                                                        onDelete={this.onDeleteInsuranceNetwork}
                                                    />
                                                )
                                            }
                                        }
                                    ]}
                                    onRefresh={this.onRefreshNetworks}
                                />
                            )}
                        </div>
                    </div>
                ) : null}
                {/*tab === 2 ? (
                 <div className='OrganizationForm-Section'>
                     <div className='OrganizationForm-SectionTitle'>
                         <Row>
                             <Col md={10}>
                                 Affiliated Organizations & Communities
                             </Col>
                             <Col md={2}>
                                 <Button className="brn btn-success">
                                    Add relationship
                                 </Button>
                             </Col>
                         </Row>
                     </div>
                     <Relationship title="Relationship 1"/>
                     <Relationship title="Relationship 2"/>
                     <Relationship title="Relationship 3"/>
                 </div>
                 ) : null*/}
            </Form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationForm)