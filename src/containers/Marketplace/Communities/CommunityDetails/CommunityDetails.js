import React, { Component, Fragment } from 'react'

import {
    map,
    filter,
    compact,
    findWhere
} from 'underscore'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ShowMore from 'react-show-more'
import { Row, Col, Button } from 'reactstrap'
import DocumentTitle from 'react-document-title'

import Map from 'components/Map/Map'
import Loader from 'components/Loader/Loader'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import ErrorViewer from 'components/ErrorViewer/ErrorViewer'
import ConfirmDialog from 'components/dialogs/ConfirmDialog/ConfirmDialog'
import SuccessDialog from 'components/dialogs/SuccessDialog/SuccessDialog'
import CollapsibleSection from 'components/CollapsibleSection/CollapsibleSection'

import './CommunityDetails.scss'

import AppointmentScheduler from '../AppointmentScheduler/AppointmentScheduler'

import * as ageGroupListActions from 'redux/directory/age/group/list/ageGroupListActions'
import * as careLevelListActions from 'redux/directory/care/level/list/careLevelListActions'
import * as primaryFocusListActions from 'redux/directory/primaryFocus/list/primaryFocusListActions'
import * as communityTypeListActions from 'redux/directory/community/type/list/communityTypeListActions'
import * as languageServiceListActions from 'redux/directory/language/service/list/languageServiceListActions'
import * as treatmentServiceListActions from 'redux/directory/treatment/service/list/treatmentServiceListActions'
import * as emergencyServiceListActions from 'redux/directory/emergency/service/list/emergencyServiceListActions'
import * as insuranceNetworkListActions from 'redux/directory/insurance/network/list/insuranceNetworkListActions'
import * as additionalServiceListActions from 'redux/directory/additional/service/list/additionalServiceListActions'
import * as insurancePaymentPlanListActions from 'redux/directory/insurance/payment/plan/list/insurancePaymentPlanListActions'

import * as marketplaceCommunityDetailsActions from 'redux/marketplace/community/details/marketplaceCommunityDetailsActions'
import * as marketplaceCommunityAppointmentFormActions from 'redux/marketplace/community/appointment/form/marketplaceCommunityAppointmentFormActions'

import { ReactComponent as Phone } from 'images/phone.svg'
import { ReactComponent as Location } from 'images/location.svg'
import { ReactComponent as Warning } from 'images/alert-yellow.svg'

import {
    isEmpty,
    isNotEmpty,
    getAddress,
    allAreEmpty,
    allAreNotEmpty,
    hyphenatedToTitle
} from 'lib/utils/Utils'

import { DIMENSIONS } from 'lib/Constants'
import {Redirect} from "react-router-dom";
import {path} from "lib/utils/ContextUtils";

const TITLE_HEIGHT = 70
const BREAD_CRUMBS_HEIGHT = 65

const {
    FOOTER_HEIGHT,
    NAVIGATION_BAR_HEIGHT
} = DIMENSIONS

function mapStateToProps (state) {
    const {
        details, appointment
    } = state.marketplace.community

    return {
        data: details.data,
        error: details.error,
        isFetching: details.isFetching,
        shouldReload: details.shouldReload,

        appointment,

        directory: state.directory,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(marketplaceCommunityDetailsActions, dispatch),

            appointment: {
                form: bindActionCreators(marketplaceCommunityAppointmentFormActions, dispatch)
            },

            directory: {
                community: {
                    type: { list: bindActionCreators(communityTypeListActions, dispatch) }
                },
                primaryFocus: {
                    list: bindActionCreators(primaryFocusListActions, dispatch)
                },
                language: {
                    service: { list: bindActionCreators(languageServiceListActions, dispatch) }
                },
                additional: {
                    service: { list: bindActionCreators(additionalServiceListActions, dispatch) }
                },
                emergency: {
                    service: { list: bindActionCreators(emergencyServiceListActions, dispatch) }
                },
                treatment: {
                    service: { list: bindActionCreators(treatmentServiceListActions, dispatch) }
                },
                age: {
                    group: { list: bindActionCreators(ageGroupListActions, dispatch) }
                },
                care: {
                    level: { list: bindActionCreators(careLevelListActions, dispatch) }
                },
                insurance: {
                    network: { list: bindActionCreators(insuranceNetworkListActions, dispatch) },
                    payment: {
                        plan: {
                            list: bindActionCreators(insurancePaymentPlanListActions, dispatch),
                        }
                    }
                }
            }
        }
    }
}

class MarketplaceCommunityDetails extends Component {
    state = {
        shouldOpenPartners: false,
        isAppointmentSchedulerOpen: false,
        isScheduleAppointmentSuccessDialogOpen: false,
        isScheduleAppointmentCancelConfirmDialogOpen: false
    }

    componentDidMount () {
        this.refresh()
        this.loadDirectoryData()
    }

    componentDidUpdate (prevProps) {
        const {
            match,
            shouldReload
        } = this.props

        shouldReload && this.refresh()

        const {
            partnerId,
            communityId
        } = match.params

        if (partnerId !== prevProps.match.params.partnerId
            || communityId !== prevProps.match.params.communityId) {
            this.refresh()
        }
    }

    onResetError = () => {
        const {
            clearError, appointment
        } = this.props.actions

        clearError()
        appointment.form.clearError()
    }

    onPartners = () => {
        this.setState({
            shouldOpenPartners: true
        })
    }

    onOpenAppointmentScheduler = () => {
        this.setState({
            isAppointmentSchedulerOpen: true
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

    loadDirectoryData () {
        const {
            age,
            care,
            language,
            community,
            treatment,
            additional,
            emergency,
            insurance,
            primaryFocus
        } = this.props.actions.directory

        age.group.list.load()
        care.level.list.load()
        primaryFocus.list.load()
        community.type.list.load()
        language.service.list.load()
        treatment.service.list.load()
        additional.service.list.load()
        emergency.service.list.load()
        insurance.network.list.load()
        insurance.payment.plan.list.load()
    }

    update (isReload) {
        const {
            actions, match
        } = this.props

        const {
            partnerId,
            communityId
        } = match.params

        isReload && actions.load(
            partnerId || communityId
        )
    }

    refresh () {
        this.update(true)
    }

    getMapHeight () {
        return document.body.clientHeight
            - NAVIGATION_BAR_HEIGHT
            - BREAD_CRUMBS_HEIGHT
            - TITLE_HEIGHT
            - FOOTER_HEIGHT
    }

    getAddress () {
        const { data } = this.props

        return getAddress({
            ...data,
            zip: data.zipCode,
            state: data.stateName
        })
    }

    render () {
        const {
            data,
            match,
            isFetching
        } = this.props

        const {
            communityId,
            communityName,

            partnerId,
            partnerName
        } = match.params

        const {
            shouldOpenPartners,
            isAppointmentSchedulerOpen,
            isScheduleAppointmentSuccessDialogOpen,
            isScheduleAppointmentCancelConfirmDialogOpen
        } = this.state

        if (shouldOpenPartners) {
            return (
                <Redirect push to={
                    path(`marketplace/communities/${communityName}--${communityId}/partner-providers`)
                }/>
            )
        }

        let content = null

        if (isFetching) {
            content = (
                <Loader style={{ marginTop: "70%" }}/>
            )
        }

        else if (isEmpty(data)) {
            content = (
                <h4>No Data</h4>
            )
        }

        else {
            const {
                directory: {
                    age,
                    care,
                    language,
                    community,
                    insurance,
                    additional,
                    emergency,
                    treatment,
                    primaryFocus
                },
                data: {
                    id,
                    name,
                    phone,
                    marketplace,
                    organizationName
                }
            } = this.props

            const ageGroups = age.group.list.dataSource.data
            const careLevels = care.level.list.dataSource.data
            const primaryFocuses = primaryFocus.list.dataSource.data
            const communityTypes = community.type.list.dataSource.data
            const languageServices = language.service.list.dataSource.data
            const treatmentServices = treatment.service.list.dataSource.data
            const emergencyServices = emergency.service.list.dataSource.data
            const additionalServices = additional.service.list.dataSource.data
            const insuranceNetworks = insurance.network.list.dataSource.data
            const insurancePaymentPlans = insurance.payment.plan.list.dataSource.data

            const location = {
                id,
                isPicked: true,
                coordinate: {
                    lat: data.location.latitude,
                    lng: data.location.longitude
                }
            }

            content = (
                <>
                    <div className="MarketplaceCommunityDetails-Title">
                        {name}
                    </div>
                    <Row>
                        <Col md={4}>
                            <div
                                className='overflow-auto'
                                style={{ maxHeight: this.getMapHeight() }}>
                                <div className="MarketplaceCommunityDetails-OrganizationCommunityNames">
                                    {organizationName.toUpperCase()}, {name.toUpperCase()}
                                </div>
                                {allAreNotEmpty(marketplace.primaryFocusIds, primaryFocuses) && (
                                    <div className="MarketplaceCommunityDetails-PrimaryFocus">
                                        {map(
                                            filter(
                                                primaryFocuses,
                                                o => marketplace.primaryFocusIds.includes(o.id)
                                            ), o => o.label
                                        ).join(', ')}
                                    </div>
                                )}
                                {allAreNotEmpty(marketplace.communityTypeIds, communityTypes) && (
                                    <div className="MarketplaceCommunityDetails-Types">
                                        {map(
                                            filter(
                                                communityTypes,
                                                o => marketplace.communityTypeIds.includes(o.id)
                                            ), o => o.label
                                        ).join(', ')}
                                    </div>
                                )}
                                {isNotEmpty(marketplace.servicesSummaryDescription) && (
                                    <div className="MarketplaceCommunityDetails-ServicesSummaryDescription">
                                        <ShowMore
                                            lines={4}
                                            more='more'
                                            less='less'
                                            anchorClass='ShowMoreBtn'>
                                            {marketplace.servicesSummaryDescription}
                                        </ShowMore>
                                    </div>
                                )}
                                {!partnerId && (
                                    <div className='margin-top-20 margin-bottom-20'>
                                        <Button
                                            color='success'
                                            className='MarketplaceCommunityDetails-AppointmentBtn'
                                            onClick={this.onPartners}>
                                            View Partner Providers
                                        </Button>
                                    </div>
                                )}
                                <div
                                    className='MarketplaceCommunityDetails-Section MarketplaceCommunityDetails-ContactInfoSection'>
                                    <div className='MarketplaceCommunityDetails-ContactInfoSectionTitle'>
                                        Contact Info
                                    </div>
                                    <div className="MarketplaceCommunityDetails-Address">
                                        <Location className="MarketplaceCommunityDetails-Icon"/>
                                        {this.getAddress()}
                                    </div>
                                    <div className="MarketplaceCommunityDetails-Phone">
                                        <Phone className="MarketplaceCommunityDetails-Icon"/>
                                        {data.phone}
                                    </div>
                                    {marketplace.allowAppointments && (
                                        <div className="margin-top-30">
                                            <Button
                                                color='success'
                                                className='MarketplaceCommunityDetails-AppointmentBtn'
                                                onClick={this.onOpenAppointmentScheduler}>
                                                Request an appointment
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                {!allAreEmpty(marketplace.prerequisite, marketplace.exclusion) && (
                                    <div
                                        className='MarketplaceCommunityDetails-Section MarketplaceCommunityDetails-ProgramRequirementsSection'>
                                        <div
                                            className='MarketplaceCommunityDetails-ProgramRequirementsSectionTitle margin-bottom-20'>
                                            Program Requirements
                                        </div>
                                        {isNotEmpty(marketplace.prerequisite) && (
                                            <CollapsibleSection title="Prerequisite">
                                                <div className='MarketplaceCommunityDetails-Prerequisite'>
                                                    {marketplace.prerequisite}
                                                </div>
                                            </CollapsibleSection>
                                        )}
                                        {isNotEmpty(marketplace.exclusion) && (
                                            <CollapsibleSection title="Exclusion">
                                                <div className='MarketplaceCommunityDetails-Exclusion'>
                                                    {marketplace.exclusion}
                                                </div>
                                            </CollapsibleSection>
                                        )}
                                    </div>
                                )}
                                {!allAreEmpty(
                                    marketplace.levelOfCareIds,
                                    marketplace.serviceTreatmentApproachIds,
                                    marketplace.emergencyServiceIds,
                                    marketplace.additionalServiceIds,
                                    marketplace.ageGroupIds,
                                    marketplace.languageServiceIds,
                                    marketplace.insuranceNetworks
                                ) && (
                                    <div
                                        className='MarketplaceCommunityDetails-Section MarketplaceCommunityDetails-ServicesSection'>
                                        <div className='MarketplaceCommunityDetails-ServicesSectionTitle margin-bottom-20'>
                                            Services
                                        </div>
                                        {allAreNotEmpty(marketplace.levelOfCareIds, careLevels) && (
                                            <CollapsibleSection title="Levels Of Care" isOpenByDefault>
                                                {map(marketplace.levelOfCareIds, id => (
                                                    <div key={id} className="MarketplaceCommunityDetails-Service">
                                                        {findWhere(careLevels, { id }).label}
                                                    </div>
                                                ))}
                                            </CollapsibleSection>
                                        )}
                                        {allAreNotEmpty(marketplace.serviceTreatmentApproachIds, treatmentServices) && (
                                            <CollapsibleSection
                                                title="Services / Treatment Approaches"
                                                isOpenByDefault={isEmpty(
                                                    marketplace.serviceTreatmentApproachIds
                                                )}>
                                                {map(marketplace.serviceTreatmentApproachIds, id => (
                                                    <div key={id} className="MarketplaceCommunityDetails-Service">
                                                        {(findWhere(treatmentServices, { id }) || {}).label || ''}
                                                    </div>
                                                ))}
                                            </CollapsibleSection>
                                        )}
                                        {allAreNotEmpty(marketplace.emergencyServiceIds, emergencyServices) && (
                                            <CollapsibleSection
                                                title="Emergency Services"
                                                isOpenByDefault={allAreEmpty(
                                                    marketplace.levelOfCareIds,
                                                    marketplace.serviceTreatmentApproachIds
                                                )}>
                                                {map(marketplace.emergencyServiceIds, id => (
                                                    <div key={id} className="MarketplaceCommunityDetails-Service">
                                                        {findWhere(emergencyServices, { id }).label}
                                                    </div>
                                                ))}
                                            </CollapsibleSection>
                                        )}
                                        {allAreNotEmpty(marketplace.additionalServiceIds, additionalServices) && (
                                            <CollapsibleSection
                                                title="Additional Services"
                                                isOpenByDefault={allAreEmpty(
                                                    marketplace.levelOfCareIds,
                                                    marketplace.serviceTreatmentApproachIds,
                                                    marketplace.emergencyServiceIds
                                                )}>
                                                {map(marketplace.additionalServiceIds, id => (
                                                    <div key={id} className="MarketplaceCommunityDetails-Service">
                                                        {findWhere(additionalServices, { id }).label}
                                                    </div>
                                                ))}
                                            </CollapsibleSection>
                                        )}
                                        {allAreNotEmpty(marketplace.ageGroupIds, ageGroups) && (
                                            <CollapsibleSection
                                                title="Age Groups Accepted"
                                                isOpenByDefault={allAreEmpty(
                                                    marketplace.levelOfCareIds,
                                                    marketplace.serviceTreatmentApproachIds,
                                                    marketplace.emergencyServiceIds,
                                                    marketplace.additionalServiceIds
                                                )}>
                                                {map(marketplace.ageGroupIds, id => (
                                                    <div key={id} className="MarketplaceCommunityDetails-Service">
                                                        {findWhere(ageGroups, { id }).label}
                                                    </div>
                                                ))}
                                            </CollapsibleSection>
                                        )}
                                        {allAreNotEmpty(marketplace.languageServiceIds, languageServices) && (
                                            <CollapsibleSection
                                                title="Language Services"
                                                isOpenByDefault={allAreEmpty(
                                                    marketplace.levelOfCareIds,
                                                    marketplace.serviceTreatmentApproachIds,
                                                    marketplace.emergencyServiceIds,
                                                    marketplace.additionalServiceIds,
                                                    marketplace.ageGroupIds
                                                )}>
                                                {map(marketplace.languageServiceIds, id => (
                                                    <div key={id} className="MarketplaceCommunityDetails-Service">
                                                        {findWhere(languageServices, { id }).label}
                                                    </div>
                                                ))}
                                            </CollapsibleSection>
                                        )}
                                        {allAreNotEmpty(marketplace.insuranceNetworks, insuranceNetworks) && (
                                            <CollapsibleSection
                                                title="Payment / Insurance Accepted"
                                                isOpenByDefault={allAreEmpty(
                                                    marketplace.levelOfCareIds,
                                                    marketplace.serviceTreatmentApproachIds,
                                                    marketplace.emergencyServiceIds,
                                                    marketplace.additionalServiceIds,
                                                    marketplace.ageGroupIds,
                                                    marketplace.languageServiceIds
                                                )}>
                                                {map(marketplace.insuranceNetworks, ({ id, title, paymentPlans }) => (
                                                    <Fragment key={id}>
                                                        <div className="MarketplaceCommunityDetails-InsuranceNetwork">
                                                            {title}
                                                        </div>
                                                        {map(paymentPlans, ({ id: pId, title }) => (
                                                            <div key={`${id}:${pId}`} className="MarketplaceCommunityDetails-InsuranceNetworkPaymentPlan">
                                                                {title}
                                                            </div>
                                                        ))}
                                                    </Fragment>
                                                ))}
                                            </CollapsibleSection>
                                        )}
                                    </div>
                                )}
                            </div>
                        </Col>
                        <Col md={8}>
                            <div style={{ height: this.getMapHeight() }}>
                                <Map locations={[location]}/>
                            </div>
                        </Col>
                    </Row>
                    {isAppointmentSchedulerOpen && (
                        <AppointmentScheduler
                            isOpen
                            communityId={id}
                            communityName={name}
                            organizationName={organizationName}
                            primaryFocusIds={map(primaryFocuses, o => o.id)}
                            treatmentServiceIds={marketplace.serviceTreatmentApproachIds}
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
                            text={`The community staff will rich you out within 3 business days. In case of an emergency, please contact ${phone}`}
                            buttons={[
                                {
                                    text: 'Close',
                                    onClick: this.onCloseScheduleAppointmentSuccessDialog
                                }
                            ]}
                        />
                    )}
                </>
            )
        }

        const error = this.getError()

        return (
            <DocumentTitle
                title={
                    'Simply Connect | Home | ' + (
                        partnerId ? `${hyphenatedToTitle(communityName)} | Partner Providers | ` : ''
                    ) + 'Community Details'
                }>
                <div className='MarketplaceCommunityDetails'>
                    <Breadcrumbs
                        className='margin-top-20 margin-left-35 margin-bottom-20'
                        items={compact([
                            {
                                title: 'Home',
                                href: '/marketplace',
                                isEnabled: true
                            },
                            {
                                title: 'Community Details',
                                href: `/marketplace/communities/${communityName}--${communityId}`,
                                isActive: !partnerId
                            },
                            partnerId && {
                                title: 'Partner Providers',
                                href: `/marketplace/communities/${communityName}--${communityId}/partner-providers`,
                            },
                            partnerId && {
                                title: 'Community Details',
                                href: `/marketplace/communities/${communityName}--${communityId}/partner-providers/${partnerName}--${partnerId}`,
                                isActive: true
                            }
                        ])}
                    />
                    <div className='MarketplaceCommunityDetails-Body'>
                        {content}
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

export default connect(mapStateToProps, mapDispatchToProps)(MarketplaceCommunityDetails)

