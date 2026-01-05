import React, { Component } from 'react'

import $ from 'jquery'
import cn from 'classnames'

import {
    map,
    filter,
    groupBy,
    isNumber,
    findWhere
} from 'underscore'

import { geolocated } from 'react-geolocated'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Redirect } from 'react-router-dom'

import Truncate from 'react-truncate'
import DocumentTitle from 'react-document-title'

import {
    Col,
    Row,
    Button,
    Collapse
} from 'reactstrap'

import './Communities.scss'

import Map from 'components/Map/Map'
import List from 'components/List/List'
import Loader from 'components/Loader/Loader'
import ErrorViewer from 'components/ErrorViewer/ErrorViewer'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import SearchField from 'components/SearchField/SearchField'
import SelectField from 'components/Form/SelectField/SelectField'
import InsuranceWizard from 'components/InsuranceWizard/InsuranceWizard'
import ConfirmDialog from 'components/dialogs/ConfirmDialog/ConfirmDialog'
import SuccessDialog from 'components/dialogs/SuccessDialog/SuccessDialog'
import MarketplaceCommunityRow from 'components/rows/MarketplaceCommunityRow/MarketplaceCommunityRow'

import AppointmentScheduler from './AppointmentScheduler/AppointmentScheduler'

import * as primaryFocusListActions from 'redux/directory/primaryFocus/list/primaryFocusListActions'
import * as communityTypeListActions from 'redux/directory/community/type/list/communityTypeListActions'
import * as languageServiceListActions from 'redux/directory/language/service/list/languageServiceListActions'
import * as treatmentServiceListActions from 'redux/directory/treatment/service/list/treatmentServiceListActions'
import * as additionalServiceListActions from 'redux/directory/additional/service/list/additionalServiceListActions'
import * as emergencyServiceListActions from 'redux/directory/emergency/service/list/emergencyServiceListActions'
import * as insuranceNetworkListActions from 'redux/directory/insurance/network/list/insuranceNetworkListActions'
import * as insurancePaymentPlanListActions from 'redux/directory/insurance/payment/plan/list/insurancePaymentPlanListActions'

import * as marketplaceCommunityListActions from 'redux/marketplace/community/list/marketplaceCommunityListActions'
import * as marketplaceCommunityDetailsActions from 'redux/marketplace/community/details/marketplaceCommunityDetailsActions'
import * as marketplaceCommunityAppointmentFormActions from 'redux/marketplace/community/appointment/form/marketplaceCommunityAppointmentFormActions'

import { ReactComponent as Phone } from "images/phone.svg";
import { ReactComponent as Filter } from 'images/filters.svg'
import { ReactComponent as Location } from "images/location.svg"
import {ReactComponent as Warning} from 'images/alert-yellow.svg'

import {
    isEmpty,
    hyphenate,
    isNotEmpty,
    allAreFalse,
    omitEmptyProps,
    withoutEmptyValues
} from 'lib/utils/Utils'

import { path } from 'lib/utils/ContextUtils'

import {
    PAGINATION,
    DIMENSIONS,
    COORDINATES
} from 'lib/Constants'

const VERTICAL_PADDING = 20

const { FIRST_PAGE, MAX_SIZE } = PAGINATION

const {
    FOOTER_HEIGHT,
    NAVIGATION_BAR_HEIGHT
} = DIMENSIONS

const {
    DEFAULT_LATITUDE_DELTA,
    DEFAULT_LONGITUDE_DELTA
} = COORDINATES

function CommunitySummary (props) {
    const {
        data,

        data: {
            communityName,
            organizationName,

            primaryFocuses,
            allowAppointments,

            address,
            phone
        },

        onScheduleAppointment,
        onDetails
    } = props

    return (
        <div className='MarketplaceCommunitySummary'>
            <div className='MarketplaceCommunitySummary-Title'>
                <Truncate lines={3}>
                    {organizationName}, {communityName}
                </Truncate>
            </div>
            <div className='MarketplaceCommunitySummary-PrimaryFocuses'>
                <Truncate lines={2}>
                    {map(primaryFocuses, o => o.label).join(', ')}
                </Truncate>
            </div>
            <div className='MarketplaceCommunitySummary-Address'>
                <div>
                    <Location className="MarketplaceCommunitySummary-Icon"/>
                </div>
                {address}
            </div>
            {phone && (
                <div className='MarketplaceCommunitySummary-Phone'>
                    <div>
                        <Phone className="MarketplaceCommunitySummary-Icon"/>
                    </div>
                    {phone}
                </div>
            )}
            <div>
                {allowAppointments ? (
                    <Button
                        color='success'
                        className='MarketplaceCommunitySummary-AppointmentBtn'
                        onClick={() => { onScheduleAppointment(data) }}>
                        Request an appointment
                    </Button>
                ): <div/>}
                <Button
                    outline
                    color='success'
                    onClick={() => { onDetails(data) }}>
                    Details
                </Button>
            </div>
        </div>
    )
}

function mapStateToProps (state) {
    const {
        list, details, appointment
    } = state.marketplace.community

    return {
        error: list.error,
        isFetching: list.isFetching,
        dataSource: list.dataSource,
        shouldReload: list.shouldReload,

        details,
        appointment,

        directory: state.directory
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(marketplaceCommunityListActions, dispatch),
            details: bindActionCreators(marketplaceCommunityDetailsActions, dispatch),
            appointment: {
                form: bindActionCreators(marketplaceCommunityAppointmentFormActions, dispatch)
            },
            directory: {
                language: {
                    service: { list: bindActionCreators(languageServiceListActions, dispatch) }
                },
                treatment: {
                    service: { list: bindActionCreators(treatmentServiceListActions, dispatch) }
                },
                additional: {
                    service: { list: bindActionCreators(additionalServiceListActions, dispatch) }
                },
                emergency: {
                    service: { list: bindActionCreators(emergencyServiceListActions, dispatch) }
                },
                insurance: {
                    network: { list: bindActionCreators(insuranceNetworkListActions, dispatch) },
                    payment: {
                        plan: {
                            list: bindActionCreators(insurancePaymentPlanListActions, dispatch),
                        }
                    }
                },
                primaryFocus: {
                    list: bindActionCreators(primaryFocusListActions, dispatch)
                },
                community: {
                    type: {
                        list: bindActionCreators(communityTypeListActions, dispatch)
                    }
                }
            }
        },
    }
}

class Communities extends Component {

    filterRef = React.createRef()
    searchRef = React.createRef()

    listTitleRef = React.createRef()

    insuranceFieldRef = React.createRef()
    insuranceWizardPopupRef = React.createRef()

    state = {
        selected: null,
        shouldReload: true,

        isFilterOpen: true,
        shouldOpenDetails: false,

        isAppointmentSchedulerOpen: false,
        isScheduleAppointmentSuccessDialogOpen: false,
        isScheduleAppointmentCancelConfirmDialogOpen: false,

        areCommunityTypesLoaded: false,
        areTreatmentServicesLoaded: false,

        bodyHeight: 0,
        filterHeight: 0,
        searchHeight: 0,

        searchText: '',

        listTitleHeight: 0,

        insuranceWizardStep: 0,
        insuranceSearchText: '',
        isInsuranceWizardOpen: false
    }

    componentDidMount () {
        this.updateSizes()
        this.loadDirectoryData()

        window.addEventListener('click', this.onClick)
        window.addEventListener('resize', this.onResize)

        const {
            match,
            location
        } = this.props

        const {
            communityId
        } = match.params

        if (communityId) {
            this.loadDetails(communityId)
        }

        if (location.state) {
            this.props
                .history
                .replace('marketplace', {})
        }
    }

    componentDidUpdate (prevProps) {
        this.updateSizes()

        const {
            match,
            directory,
            shouldReload,
            dataSource: ds
        } = this.props

        if (shouldReload) this.refresh()

        const {
            areCommunityTypesLoaded,
            areTreatmentServicesLoaded
        } = this.state

        if (this.state.shouldReload
            && areCommunityTypesLoaded
            && areTreatmentServicesLoaded) {
            this.refresh()
        }

        if (match.url !== prevProps.match.url) {
            this.onClearFilter()
        }

        const {
            community,
            treatment,
            primaryFocus
        } = directory


        if (!primaryFocus.list.isFetching
            && prevProps.directory.primaryFocus.list.isFetching) {
            this.onChangeFilterField(
                'primaryFocusIds',
                map(primaryFocus.list.dataSource.data, o => o.id)
            )
        }

        if (!community.type.list.isFetching
            && prevProps.directory.community.type.list.isFetching) {
            this.onChangeFilterField(
                'communityTypeIds',
                map(community.type.list.dataSource.data, o => o.id)
            )
        }

        if (!treatment.service.list.isFetching
            && prevProps.directory.treatment.service.list.isFetching) {
            this.onChangeFilterField(
                'servicesTreatmentApproachesIds',
                map(treatment.service.list.dataSource.data, o => o.id)
            )
        }

        if (prevProps.directory.community.type.list.isFetching
        && !community.type.list.isFetching) {
            this.setState({ areCommunityTypesLoaded: true })
        }

        if (prevProps.directory.treatment.service.list.isFetching
            && !treatment.service.list.isFetching) {
            this.setState({ areTreatmentServicesLoaded: true })
        }

        if (ds.filter.primaryFocusIds
            !== prevProps.dataSource.filter.primaryFocusIds) {
            this.loadCommunityTypes()
            this.loadTreatmentServices()
        }
    }

    componentWillUnmount () {
        this.clear()
        window.removeEventListener('click', this.onClick)
        window.removeEventListener('resize', this.onResize)
    }

    onClick = e => {
        if (this.state.isInsuranceWizardOpen) {
            const node = e.target

            const $input = $(
                this.insuranceFieldRef.current.getInputNode()
            )

            const $wizard = $(
                this.insuranceWizardPopupRef.current
            )

            if (!($input.is(node) || $wizard.find(node).length)) {
                this.setState({ isInsuranceWizardOpen: false })
            }
        }
    }

    onResize = () => {
        this.updateBodyHeight()
    }

    onResetError = () => {
        const {
            clearError, appointment
        } = this.props.actions

        clearError()
        appointment.form.clearError()
    }

    onToggleFilter = () => {
        this.setState(s => ({
            isFilterOpen: !s.isFilterOpen,
        }))

        this.updateSizes()
    }

    onFilterOpen = () => {
        this.updateSizes()
    }

    onFilterClosed = () => {
        this.updateSizes()
    }

    onChangeFilter = (changes) => {
        this
            .props
            .actions
            .changeFilter(changes, false)
    }

    onChangeFilterField = (name, value) => {
        this
            .props
            .actions
            .changeFilterField(name, value, false)
    }

    onRefresh = page => {
        this.refresh(page)
    }

    onClearFilter = () => {
        this.resetFilter(true)
        this.setState({ insuranceWizardStep: 0 })
    }

    onSearch = () => {
        const {
            searchText: t
        } = this.props.dataSource.filter

        if (!t.length || t.length > 1) {
            this.refresh()
            this.setState({ searchText: t })
        }
    }

    onClearSearchField = (name) => {
        this
            .props
            .actions
            .changeFilterField(name, '')

        this.setState({ searchText: '' })
    }

    onDetails = data => {
        this.setState({
            selected: data,
            shouldOpenDetails: true
        })
    }

    onNavigateToCommunity = data => {

    }

    onOpenInsuranceWizard = () => {
        this.setState({ isInsuranceWizardOpen: true })
    }

    onCloseInsuranceWizard = () => {
        this.setState({ isInsuranceWizardOpen: false })
    }

    onChangeInsuranceNetworkFilterField = o => {
        this.setState({ insuranceSearchText: '' })
        this.onChangeFilterField('insuranceNetworkId', o.id)

        if (isEmpty(o.paymentPlans)) {
            this.onCloseInsuranceWizard()
        }

        else if (o.id) {
            this.setState(s => ({
                insuranceWizardStep: s.insuranceWizardStep + 1
            }))
        }
    }

    onChangeInsurancePaymentPlanFilterField = o => {
        this.setState({
            insuranceWizardStep: 1,
            insuranceSearchText: ''
        })

        if (o.networkId) {
            this.onChangeFilterField('insuranceNetworkId', o.networkId)
        }

        this.onChangeFilterField('insurancePaymentPlanId', o.id)

        this.onCloseInsuranceWizard()
    }

    onChangeInsuranceWizardStep = step => {
        const {
            directory,
            dataSource: ds
        } = this.props

        const networkId = ds.filter.insuranceNetworkId

        if (networkId) {
            const { paymentPlans } = findWhere(
                directory.insurance.network.list.dataSource.data,
                {id: networkId}
            ) || {}

            if (isNotEmpty(paymentPlans)) {
                this.setState({ insuranceWizardStep: step })
            }
        }
    }

    onChangeInsuranceField = (name, value) => {
        const {
            insuranceNetworkId,
            insurancePaymentPlanId
        } = this.props.dataSource.filter

        if (!(insuranceNetworkId || insurancePaymentPlanId)) {
            this.setState({ insuranceSearchText: value })
        }
    }

    onClearInsuranceField = () => {
        this.onChangeFilterField('insuranceNetworkId', null)
        this.onChangeFilterField('insurancePaymentPlanId', null)

        this.setState({
            insuranceWizardStep: 0,
            insuranceSearchText: ''
        })
    }

    onOpenAppointmentScheduler = data => {
        this.setState({
            isAppointmentSchedulerOpen: true,
            selected: data
        })
    }

    onScheduleAppointmentSuccess = () => {
        this.setState({
            isAppointmentSchedulerOpen: false,
            isScheduleAppointmentSuccessDialogOpen: true
        })
    }

    onCloseScheduleAppointmentSuccessDialog = () => {
        this.setState({
            isScheduleAppointmentSuccessDialogOpen: false
        })
    }

    onCloseAppointmentScheduler = (shouldConfirm = false) => {
        this.setState({
            isAppointmentSchedulerOpen: shouldConfirm,
            isScheduleAppointmentCancelConfirmDialogOpen: shouldConfirm
        })

        !shouldConfirm && this.props.actions.appointment.form.clear()
    }

    onCloseScheduleAppointmentCancelConfirmDialog = () => {
        this.setState({
            isScheduleAppointmentCancelConfirmDialogOpen: false
        })
    }

    getError () {
        const {
            error, appointment
        } = this.props

        return error || appointment.form.error
    }

    resetFilter (shouldReload) {
        const {
            community,
            treatment,
            primaryFocus
        } = this.props.directory

        this.changeFilter({
            insuranceNetworkId: null,
            insurancePaymentPlanId: null,
            servicesTreatmentApproachesIds: map(treatment.service.list.dataSource.data, o => o.id),
            primaryFocusIds: map(primaryFocus.list.dataSource.data, o => o.id),
            communityTypeIds: map(community.type.list.dataSource.data, o => o.id)
        }, shouldReload)
    }

    changeFilter (changes, shouldReload) {
        this
            .props
            .actions
            .changeFilter(changes, shouldReload)
    }

    updateSizes () {
        this.updateFilterHeight()
        this.updateListTitleHeight()
        this.updateSearchHeight()
    }

    updateBodyHeight () {
        const height = document.body.clientHeight - NAVIGATION_BAR_HEIGHT

        if (this.state.bodyHeight !== height) {
            this.setState({ bodyHeight: height })
        }
    }

    updateFilterHeight () {
        let height = $(this.filterRef.current).outerHeight(true)

        if (height && this.state.filterHeight !== height) {
            this.setState({ filterHeight: height })
        }
    }

    updateListTitleHeight () {
        let height = $(this.listTitleRef.current).outerHeight(true)

        if (height && this.state.listTitleHeight !== height) {
            this.setState({ listTitleHeight: height })
        }
    }

    updateSearchHeight () {
        let height = $(this.searchRef.current).outerHeight(true)

        if (height && this.state.searchHeight !== height) {
            this.setState({ searchHeight: height })
        }
    }

    update (isReload, page) {
        const {
            match,
            isFetching,
            shouldReload,
            dataSource: ds
        } = this.props

        const { communityId } = match.params

        if (isReload || shouldReload || (!isFetching && isEmpty(ds.data))) {
            const {
                coords,
                isGeolocationEnabled,
                isGeolocationAvailable
            } = this.props

            let filter = ds.filter.toJS()

            if (this.areAllPrimaryFocusesSelected()) {
                filter.primaryFocusIds = []
            }

            if (this.areAllCommunityTypesSelected()) {
                filter.communityTypeIds = []
            }

            if (this.areAllTreatmentServicesSelected()) {
                filter.servicesTreatmentApproachesIds = []
            }

            this.props.actions.load({
                communityId,
                page: FIRST_PAGE,
                size: MAX_SIZE,
                ...(isGeolocationAvailable && isGeolocationEnabled && coords ? {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                } : {
                    latitude: DEFAULT_LATITUDE_DELTA,
                    longitude: DEFAULT_LONGITUDE_DELTA,
                }),
                ...omitEmptyProps(filter)
            })

            this.setState({ shouldReload: false })
        }
    }

    loadDirectoryData () {
        const {
            language,
            community,
            treatment,
            additional,
            emergency,
            insurance,
            primaryFocus
        } = this.props.actions.directory

        primaryFocus.list.load()
        community.type.list.load()
        language.service.list.load()
        treatment.service.list.load()
        additional.service.list.load()
        emergency.service.list.load()
        insurance.network.list.load()
        insurance.payment.plan.list.load()
    }

    loadCommunityTypes () {
        const {
            actions,
            dataSource: ds
        } = this.props

        this.setState({
            areCommunityTypesLoaded: false
        })

        actions
            .directory
            .community
            .type
            .list
            .load(
                ds.filter.primaryFocusIds
            )
    }

    loadTreatmentServices () {
        const {
            actions,
            dataSource: ds
        } = this.props

        this.setState({
            areTreatmentServicesLoaded: false
        })

        actions
            .directory
            .treatment
            .service
            .list
            .load(
                ds.filter.primaryFocusIds
            )
    }

    loadDetails (id) {
        this
            .props
            .actions
            .details
            .load(id)
    }

    refresh (page) {
        this.update(true, page || FIRST_PAGE)
    }

    clear () {
        this.props.actions.clear()
    }

    renderListRow = (index, key) => {
        const {
            data
        } = this.props.dataSource

        return index === data.length ? (data.length ? (
            <div key='loader' className='MarketplaceCommunityRow'>
                <Loader/>
            </div>
        ) : (
            <div key='no-data' className='font-size-15 text-center'>
                No communities found. Please change the filtering criteria.
            </div>
        )) : (
            <MarketplaceCommunityRow
                key={key}
                data={data[index]}
                className="MarketplaceCommunityRow"
                highlightedText={this.state.searchText}
                onNavigate={this.onNavigateToCommunity}
                onMoreInfo={this.onDetails}
            />
        )
    }

    renderMapMarkerPopup = data => {
        const ids = data.locationIds

        const communities = filter(
            this.props.dataSource.data,
            o => ids.includes(o.communityId)
        )

        return (
            <>
            {map(communities, o => (
                <CommunitySummary
                    key={o.communityId}
                    data={o}

                    onScheduleAppointment={this.onOpenAppointmentScheduler}
                    onDetails={this.onDetails}
                />
            ))}
            </>
        )
    }

    areAllPrimaryFocusesSelected () {
        const {
            directory,
            dataSource: ds
        } = this.props

        const selected = ds.filter.primaryFocusIds
        const all = directory.primaryFocus.list.dataSource.data

        return all.length === selected.length
    }

    areAllCommunityTypesSelected () {
        const {
            directory,
            dataSource: ds
        } = this.props

        const selected = ds.filter.communityTypeIds
        const all = directory.community.type.list.dataSource.data

        return all.length === selected.length
    }

    areAllTreatmentServicesSelected () {
        const {
            directory,
            dataSource: ds
        } = this.props

        const selected = ds.filter.servicesTreatmentApproachesIds
        const all = directory.treatment.service.list.dataSource.data

        return all.length === selected.length
    }

    getCommunityLocations () {
        return map(this.props.dataSource.data, o => {
            return {
                id: o.communityId,
                coordinate: {
                    lat: o.location.latitude,
                    lng: o.location.longitude
                }
            }
        })
    }

    getMaxInsuranceWizardPopupHeight () {
        const {
            searchHeight,
            listTitleHeight
        } = this.state

        return this.getMaxListHeight()
            + listTitleHeight
            + searchHeight
            + VERTICAL_PADDING * 3
    }

    getMaxListHeight () {
        const {
            filterHeight,
            listTitleHeight,
            searchHeight
        } = this.state

        return document.body.clientHeight
            - NAVIGATION_BAR_HEIGHT
            - VERTICAL_PADDING * 2
            - filterHeight
            - listTitleHeight
            - searchHeight
            - FOOTER_HEIGHT
    }

    getMapHeight () {
        const {
            filterHeight,
            isDetailsOpen,
            listTitleHeight
        } = this.state

        return document.body.clientHeight
            - NAVIGATION_BAR_HEIGHT
            - VERTICAL_PADDING * 2
            - listTitleHeight
            - (isDetailsOpen ? VERTICAL_PADDING * 2 : filterHeight)
            - FOOTER_HEIGHT
    }

    getInsuranceNetworkById (id) {
        const {
            data
        } = this
            .props
            .directory
            .insurance
            .network
            .list
            .dataSource

        return findWhere(data, { id: id })
    }

    getInsurancePaymentPlanById (id) {
        const {
            data
        } = this
            .props
            .directory
            .insurance
            .payment
            .plan
            .list
            .dataSource

        return findWhere(data, { id: id })
    }

    render () {
        const {
            selected,
            shouldOpenDetails
        } = this.state

        const {
            match, details
        } = this.props

        const {
            communityId,
            communityName
        } = match.params

        if (shouldOpenDetails) {
            return (
                <Redirect push to={path(
                    `marketplace/communities/${communityName || hyphenate(selected.communityName)}--${communityId || selected.communityId}`,
                    communityId ? `/partner-providers/${hyphenate(selected.communityName)}--${selected.communityId}` : ''
                )}/>
            )
        }

        const {
            isFilterOpen,

            isAppointmentSchedulerOpen,
            isScheduleAppointmentSuccessDialogOpen,
            isScheduleAppointmentCancelConfirmDialogOpen,

            insuranceWizardStep,
            insuranceSearchText,
            isInsuranceWizardOpen
        } = this.state

        const {
            className,

            isFetching,
            dataSource: {
                data,
                pagination,
                filter: {
                    searchText,
                    servicesTreatmentApproachesIds,
                    primaryFocusIds,
                    communityTypeIds,
                    insuranceNetworkId,
                    insurancePaymentPlanId
                }
            },

            directory,
            directory: {
                treatment,
                community,
                insurance: {
                    network,
                    payment
                }
            }
        } = this.props

        const error = this.getError()

        const primaryFocuses = directory.primaryFocus.list.dataSource.data

        const insuranceNetwork = this.getInsuranceNetworkById(insuranceNetworkId)
        const insurancePaymentPlan = this.getInsurancePaymentPlanById(insurancePaymentPlanId)

        const locations = this.getCommunityLocations()

        return (
            <DocumentTitle title={
                'Simply Connect | Home | Marketplace' + (
                    match.params.communityId && details.data ? ` | ${details.data.name} | Partner Providers` : ''
                )}>
                <div className={cn('MarketplaceCommunities', className)}>
                    {communityId && (
                        <Breadcrumbs
                            className='margin-top-20 margin-left-35 margin-bottom-20'
                            items={[
                                {
                                    title: 'Home',
                                    href: '/marketplace',
                                    isEnabled: true
                                },
                                {
                                    title: 'Community Details',
                                    href: `/marketplace/communities/${communityName}--${communityId}`
                                },
                                {
                                    title: 'Partner Providers',
                                    href: `/marketplace/communities/${communityName}--${communityId}/partner-providers`,
                                    isActive: true
                                },
                            ]}
                        />
                    )}
                    <div className="MarketplaceCommunities-Body">
                        <div ref={this.filterRef}
                             className="MarketplaceCommunityFilter">
                            <div className='d-flex flex-row justify-content-between'>
                                <div className='MarketplaceCommunities-Title'>
                                    {communityId && details.data ? (
                                        <>
                                        Partner Providers / <span className='MarketplaceCommunities-CommunityName'>{details.data.name}</span>
                                        </>
                                    ) : (
                                        <>
                                        Find Location / Service / Community
                                        </>
                                    )}
                                </div>
                                <Filter
                                    className={cn(
                                        'MarketplaceCommunityFilter-Icon',
                                        isFilterOpen
                                            ? 'MarketplaceCommunityFilter_expanded'
                                            : 'MarketplaceCommunityFilter_collapsed',
                                    )}
                                    onClick={this.onToggleFilter}
                                />
                            </div>
                            <Collapse isOpen={isFilterOpen}
                                      onEntered={this.onFilterOpen}
                                      onExited={this.onFilterClosed}>
                                <div className="MarketplaceCommunityFilter-Fields">
                                    <Row>
                                        <Col md={4}>
                                            <SelectField
                                                isMultiple
                                                hasTooltip
                                                name="primaryFocusIds"
                                                label="Primary focus"
                                                value={primaryFocusIds}
                                                placeholder='Select'
                                                options={map(primaryFocuses, o => ({
                                                    text: o.label,
                                                    value: o.id
                                                }))}
                                                onChange={this.onChangeFilterField}
                                            />
                                        </Col>
                                        <Col md={4}>
                                            <SelectField
                                                isMultiple
                                                hasTooltip
                                                name="communityTypeIds"
                                                label="Community type"
                                                placeholder='Select'
                                                value={communityTypeIds}
                                                options={map(community.type.list.dataSource.data, o => ({
                                                    text: o.label,
                                                    value: o.id
                                                }))}
                                                onChange={this.onChangeFilterField}
                                            />
                                        </Col>
                                        <Col md={4}>
                                            <SelectField
                                                isMultiple
                                                hasTooltip
                                                isSectioned
                                                name="servicesTreatmentApproachesIds"
                                                label="Services"
                                                placeholder='Select'
                                                hasSectionTitle
                                                hasSectionSeparator
                                                value={servicesTreatmentApproachesIds}
                                                sections={primaryFocuses ? map(
                                                    groupBy(treatment.service.list.dataSource.data, 'primaryFocusId'),
                                                    (data, id) => ({
                                                        id: +id,
                                                        title: (findWhere(primaryFocuses, { id: +id }) || {}).label,
                                                        options: map(data, o => ({value: o.id, text: o.label}))
                                                    })
                                                ) : []}
                                                onChange={this.onChangeFilterField}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className='position-relative' md={8}>
                                            <SearchField
                                                type="text"
                                                name='insuranceSearchText'
                                                ref={this.insuranceFieldRef}
                                                value={insuranceSearchText || (
                                                    insuranceNetwork && (
                                                        `${insuranceNetwork.title}${insurancePaymentPlan ? ` - ${insurancePaymentPlan.title}` : ''}`
                                                    )
                                                )}
                                                label="Insurance carrier & plan"
                                                placeholder="Select insurance Carrier and Plan"
                                                onClear={this.onClearInsuranceField}
                                                onFocus={this.onOpenInsuranceWizard}
                                                onChange={this.onChangeInsuranceField}
                                            />
                                            {isInsuranceWizardOpen && (
                                                <InsuranceWizard
                                                    innerRef={this.insuranceWizardPopupRef}
                                                    step={insuranceWizardStep}

                                                    maxHeight={this.getMaxInsuranceWizardPopupHeight()}
                                                    searchText={insuranceSearchText}

                                                    data={{
                                                        networks: network.list.dataSource.data,
                                                        selectedNetworkId: insuranceNetworkId,
                                                        selectedPaymentPlanId: insurancePaymentPlanId
                                                    }}

                                                    completedSteps={withoutEmptyValues([
                                                        isNumber(insuranceNetworkId) ? 0 : null,
                                                        isNumber(insurancePaymentPlanId) ? 1 : null
                                                    ])}

                                                    onChangeStep={this.onChangeInsuranceWizardStep}
                                                    onChangeNetwork={this.onChangeInsuranceNetworkFilterField}
                                                    onChangePaymentPlan={this.onChangeInsurancePaymentPlanFilterField}
                                                />
                                            )}
                                        </Col>
                                        <Col md={4}>
                                            <Button
                                                outline
                                                color='success'
                                                className="margin-right-30"
                                                onClick={this.onClearFilter}>
                                                Clear
                                            </Button>
                                            <Button
                                                color='success'
                                                onClick={() => { this.refresh() }}>
                                                Apply
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Collapse>
                        </div>
                        <Row>
                            <Col md={12}>
                                <div
                                    ref={this.listTitleRef}
                                    className="MarketplaceCommunityList-Title">
                                    Locations
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <div className="MarketplaceCommunityList">
                                    <div ref={this.searchRef}
                                         className="MarketplaceCommunityList-Search">
                                        <SearchField
                                            type="text"
                                            name="searchText"
                                            value={searchText}
                                            hasSearchIcon={false}
                                            placeholder="Search by name, address, or primary focus"
                                            className="MarketplaceCommunityList-SearchField"
                                            onClear={this.onClearSearchField}
                                            onChange={this.onChangeFilterField}
                                            onEnterKeyDown={this.onSearch}
                                        />
                                        <Button
                                            color="success"
                                            className="MarketplaceCommunityList-SearchBtn"
                                            onClick={this.onSearch}>
                                            Search
                                        </Button>
                                    </div>
                                    {isFetching ? (
                                        <Loader/>
                                    ) : (
                                        <List
                                            type={'variable'}
                                            renderItem={this.renderListRow}
                                            style={{ maxHeight: this.getMaxListHeight() }}

                                            length={data.length + ((pagination.isFetching || !data.length) && 1)}

                                            onEndReached={() => {
                                                !pagination.isFetching
                                                && data.length < pagination.totalCount
                                                && this.onRefresh(pagination.page + 1)
                                            }}
                                        />
                                    )}
                                </div>
                            </Col>
                            <Col md={8}>
                                <div style={{ height: this.getMapHeight() }}>
                                    {/*<Map
                                        locations={locations}
                                        renderMarkerPopup={this.renderMapMarkerPopup}
                                    />*/}
                                </div>
                            </Col>
                        </Row>
                        {isAppointmentSchedulerOpen && (
                            <AppointmentScheduler
                                isOpen
                                communityId={selected.communityId}
                                communityName={selected.communityName}
                                organizationName={selected.organizationName}
                                primaryFocusIds={map(selected.primaryFocuses, o => o.id)}
                                treatmentServiceIds={map(selected.treatmentServices, o => o.id)}
                                onClose={this.onCloseAppointmentScheduler}
                                onScheduleSuccess={this.onScheduleAppointmentSuccess}
                            />
                        )}
                        {isScheduleAppointmentCancelConfirmDialogOpen && (
                            <ConfirmDialog
                                isOpen
                                icon={Warning}
                                confirmBtnText='OK'
                                title='The updates will not be saved'
                                onConfirm={this.onCloseAppointmentScheduler}
                                onCancel={this.onCloseScheduleAppointmentCancelConfirmDialog}
                            />
                        )}
                        {isScheduleAppointmentSuccessDialogOpen && (
                            <SuccessDialog
                                isOpen
                                title='The request has been sent'
                                text={`The community staff will rich you out within 3 business days. In case of an emergency, please contact ${selected.phone}`}
                                buttons={[
                                    {
                                        text: 'Close',
                                        onClick: this.onCloseScheduleAppointmentSuccessDialog
                                    }
                                ]}
                            />
                        )}
                    </div>
                    {error && (
                        <ErrorViewer
                            isOpen
                            error={error}
                            onClose={this.onResetError}
                        />
                    )}
                </div>
            </DocumentTitle>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    geolocated({ userDecisionTimeout: 5000 })(Communities)
)
