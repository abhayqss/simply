import React, {Component} from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'
import {map, isNumber} from 'underscore'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {Image} from 'react-bootstrap'
import {Col, Row, Button, UncontrolledTooltip as Tooltip} from 'reactstrap'

import * as eventDetailsActions from 'redux/event/details/eventDetailsActions'
import * as eventNoteListActions from 'redux/event/note/list/eventNoteListActions'
import * as eventNotificationListActions from 'redux/event/notification/list/eventNotificationListActions'

import Tabs from 'components/Tabs/Tabs'
import Table from 'components/Table/Table'
import Detail from 'components/Detail/Detail'
import Loader from 'components/Loader/Loader'

import NoteViewer from '../NoteViewer/NoteViewer'
import NoteEditor from '../NoteEditor/NoteEditor'

import {ReactComponent as CreateEvent} from 'images/create-event.svg'
import {ReactComponent as DownloadPdf} from 'images/download-event-pdf.svg'

import {PAGINATION} from 'lib/Constants'
import {isEmpty, DateUtils as DU} from 'lib/utils/Utils'

import './EventDetails.scss'

const {format, formats} = DU

const TIME_FORMAT = formats.time
const DATE_FORMAT = formats.americanMediumDate

const {FIRST_PAGE} = PAGINATION

const RELATED_NOTE_LIST_STATUS_COLORS = {
    UPDATED: '#d3dfe8',
    CREATED: '#d5f3b8',
}

const EVENT_DESCRIPTION_SECTIONS = {
    CLIENT_INFO: { name: 'client', title: 'Client Info' },
    EVENT_ESSENTIALS: { name: 'eventEssentials', title: 'Event Essentials' },
    EVENT_DESCRIPTION: { name: 'eventDescription', title: 'Event Description' },
    TREATMENT_DETAILS: { name: 'treatmentDetails', title: 'Treatment Details' },
    RESPONSIBLE_MANAGER: { name: 'responsibleManager', title: 'Responsible Manager' },
    REGISTERED_NURSE: { name: 'registeredNurse', title: 'Registered Nurse (RN)' },
    CLIENT_VISIT: { name: 'clientVisit', title: 'Client Visit' },
    INSURANCE: { name: 'insurance', title: 'Insurance' },
    GUARANTOR: { name: 'guarantor', title: 'Guarantor' },
    PROCEDURES: { name: 'procedures', title: 'Procedures' },
    DIAGNOSIS: { name: 'diagnosis', title: 'Diagnosis' },
    ALLERGIES: { name: 'allergies', title: 'Allergies' },
}

const REMOVABLE_HEIGHT = 188

function mapStateToProps(state) {
    return {
        event: state.event,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            event: {
                details: bindActionCreators(eventDetailsActions, dispatch),

                note: {
                    list: bindActionCreators(eventNoteListActions, dispatch),
                },
                notification: {
                    list: bindActionCreators(eventNotificationListActions, dispatch),
                },
            },
        },
    }
}

function SubDetail({ text, value }) {
    return value ? (
        <div className="SubDetail">
            <span className="SubDetail-Title">{text}</span>
            <span className="SubDetail-Value">{value}</span>
        </div>
    ) : null
}

class EventDetails extends Component {
    static propTypes = {
        eventId: PropTypes.number,
    }

    state = {
        tab: 0,
        anchors: [],
        selectedNote: null,
        isNoteViewerOpen: false,
        isNoteEditorOpen: false
    }

    componentDidMount() {
        this.clear()
        this.refresh()
        this.refreshNoteList()
        this.refreshNotificationList()

        this.changeNoteListFilter()
        this.changeNotificationListFilter()
    }

    componentDidUpdate(prevProps) {
        const { event, eventId } = this.props

        if (!eventId) {
            this.clear()
        }

        if (event.details.shouldReload || (eventId !== prevProps.eventId)) {
            this.setState({ tab: 0 })



            this.refresh()
            this.refreshNoteList()
            this.refreshNotificationList()
        }

        if (event.note.list.shouldReload) {
            this.refreshNoteList()
        }

        if (event.notification.list.shouldReload) {
            this.refreshNotificationList()
        }
    }

    onRefreshNoteList = (page) => {
        this.refreshNoteList(page)
    }

    onRefreshNotificationList = (page) => {
        this.refreshNotificationList(page)
    }

    onCreateIncidentReport = () => {

    }

    onChangeTab = tab => {
        this.setState({ tab })
    }

    onAddNote = () => {
        this.setState({
            isNoteEditorOpen: true
        })
    }

    onDownloadPdf = () => {
        alert('Coming Soon')
    }

    onOpenNoteViewer = note => {
        this.setState({
            selectedNote: note,
            isNoteViewerOpen: true
        })
    }

    onCloseNoteViewer = () => {
        this.setState({
            selectedNote: null,
            isNoteViewerOpen: false
        })
    }

    onCloseNoteEditor = () => {
        this.setState({
            isNoteEditorOpen: false
        })
    }

    isLoading() {
        const { isFetching, shouldReload } = this.props.event.details

        return isFetching || shouldReload
    }

    clear() {
        this.props.actions.event.details.clear()
    }

    changeNoteListFilter() {
        this
            .props
            .actions
            .event
            .note
            .list
            .changeFilter({ eventId: this.props.eventId })
    }

    changeNotificationListFilter() {
        this
            .props
            .actions
            .event
            .notification
            .list
            .changeFilter({ eventId: this.props.eventId })
    }

    refresh() {
        this.update(true)
    }

    refreshNoteList(page) {
        this.updateNoteList(true, page || FIRST_PAGE)
    }

    refreshNotificationList(page) {
        this.updateNotificationList(true, page || FIRST_PAGE)
    }

    update(isReload) {
        const { actions, eventId, clientId } = this.props

        if (isReload) {
            actions.event.details.load(eventId, clientId)
        }
    }

    updateNoteList(isReload, page) {
        const { event } = this.props
        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = event.note.list

        if (isReload || shouldReload || (!isFetching && isEmpty(ds.data))) {
            const { actions, eventId, clientId } = this.props
            const { page: p, size } = ds.pagination

            actions.event.note.list.load({
                size,
                page: page || p,
                ...ds.filter.toJS(),
                eventId,
                clientId
            })
        }
    }

    updateNotificationList(isReload, page) {
        const { event, eventId, clientId } = this.props
        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = event.notification.list

        if (isReload || shouldReload || (!isFetching && isEmpty(ds.data))) {
            const { actions } = this.props
            const { page: p, size } = ds.pagination

            actions.event.notification.list.load({
                size,
                page: page || p,
                ...ds.filter.toJS(),
                eventId,
                clientId
            })
        }
    }

    render() {
        const {
            tab,
            selectedNote,
            isNoteViewerOpen,
            isNoteEditorOpen
        } = this.state

        const {
            event,
            eventId,
            className,
            scrollableContainerHeight
        } = this.props

        const noteListDs = event.note.list.dataSource
        const notificationListDs = event.notification.list.dataSource

        let content = null

        if (tab === 0) {
            if (this.isLoading()) {
                content = <Loader />
            }

            else if (isEmpty(event.details.data) || !eventId) {
                content = (
                    <div className="EventDetails-NoDataText">No Details</div>
                )
            }

            else {
                const {
                    client,
                    diagnosis,
                    allergies,
                    insurances,
                    guarantors,
                    procedures,
                    clientVisit,
                    registeredNurse,
                    eventEssentials,
                    eventDescription,
                    treatmentDetails,
                    responsibleManager,
                } = event.details.data

                const alertBoxHeight = client.hasAlert ? 135 : 0

                content = (
                    <div>
                        {client.hasAlert && (
                            <div className="EventDescription-Alert">
                                <span className="EventDescription-AlertText">
                                    You received this alert because you are assigned as the responsible
                                    party for event types of
                                    <span className="EventDescription-AlertHighlightedText">
                                        "Medication alert"
                                    </span> occur for
                                    <span className="EventDescription-AlertHighlightedText">
                                        {client.displayName}
                                    </span>
                                </span>
                            </div>
                        )}
                        <div className="EventDescription-Navigation">
                            {map(EVENT_DESCRIPTION_SECTIONS, section => {
                                return event.details.data[section.name] ? (
                                    <a key={section.name} className="EventDescription-NavLink" href={'#' + section.name}>
                                        {section.title}
                                    </a>
                                ) : null
                            })}
                        </div>
                        <div className="overflow-auto" style={{
                            height: scrollableContainerHeight - REMOVABLE_HEIGHT - alertBoxHeight
                        }}>
                            {!isEmpty(client) && (
                                <div id='client' className="EventDescription-Section EventClientInfo">
                                    <div className="d-flex justify-content-between margin-bottom-24 padding-right-24">
                                        <div className="EventDescription-SectionTitle">
                                            Client Info
                                        </div>
                                        <Button
                                            outline
                                            color='success'
                                            onClick={this.onCreateIncidentReport}>
                                            Create Incident Report
                                        </Button>
                                    </div>
                                    <Detail title="Client name">
                                        {client.fullName}
                                    </Detail>
                                    <Detail title="Client Aliases">
                                        {client.aliases}
                                    </Detail>
                                    <Detail title="Client identifier">
                                        {client.identifier}
                                    </Detail>
                                    <Detail title="Social security number">
                                        {client.ssn}
                                    </Detail>
                                    <Detail title="Date of birth">
                                        {client.dob}
                                    </Detail>
                                    <Detail title="Gender">
                                        {client.gender}
                                    </Detail>
                                    <Detail title="Marital Status">
                                        {client.maritalStatus}
                                    </Detail>
                                    <Detail title="Primary language">
                                        {client.primaryLanguage}
                                    </Detail>
                                    <Detail title="Client Account Number">
                                        {client.clientAccountNumber}
                                    </Detail>
                                    <Detail title="Race">
                                        {client.race}
                                    </Detail>
                                    <Detail title="Ethnic group">
                                        {client.ethnicGroup}
                                    </Detail>
                                    <Detail title="Nationality">
                                        {client.nationality}
                                    </Detail>
                                    <Detail title="Religion">
                                        {client.religion}
                                    </Detail>
                                    <Detail title="Citizenship">
                                        {client.citizenship}
                                    </Detail>
                                    <Detail title="Veterans Military Status">
                                        {client.veteransMilitaryStatus}
                                    </Detail>
                                    <Detail title="Phone number - Home">
                                        {client.phone && (<SubDetail
                                            text="Telephone number"
                                            value={client.phone}
                                        />)}
                                    </Detail>
                                    <Detail title="Phone number - Business">
                                        {client.cellPhone && (<SubDetail
                                            text="Telephone number"
                                            value={client.cellPhone}
                                        />)}
                                    </Detail>
                                    {client.address && (
                                        <Detail title="Address">
                                            {client.address.street} {client.address.city} {client.address.stateName} {client.address.zip}
                                        </Detail>
                                    )}
                                    <Detail title="Organization">
                                        {client.organization}
                                    </Detail>
                                    <Detail title="Community">
                                        {client.community}
                                    </Detail>
                                    <Detail title="Death Date and Time">
                                        {format(client.deathDate, DATE_FORMAT)} {format(client.deathDate, TIME_FORMAT)}
                                    </Detail>
                                </div>
                            )}
                            {!isEmpty(eventEssentials) && (
                                <div id='eventEssentials' className="EventDescription-Section EventEssentials">
                                    <div className="d-flex justify-content-between margin-bottom-24">
                                        <div className="EventDescription-SectionTitle">
                                            Event Essentials
                                        </div>
                                    </div>
                                    <Detail title="Person submitting event">
                                        {eventEssentials.personSubmittingEvent}
                                    </Detail>
                                    <Detail title="Care team role">
                                        {eventEssentials.careTeamRole}
                                    </Detail>
                                    <Detail title="Event date and time">
                                        {format(eventEssentials.eventDateAndTime, DATE_FORMAT)} {format(eventEssentials.eventDateAndTime, TIME_FORMAT)}
                                    </Detail>
                                    <Detail title="Event type">
                                        <span
                                            style={{ backgroundColor: '#fff1ca' }}
                                            className="EventDescription-Type">
                                            {eventEssentials.eventType.title}
                                        </span>
                                    </Detail>
                                    <Detail title="Emergency department visit">
                                        {eventEssentials.emergencyDepartmentVisit ? 'Yes' : 'No'}
                                    </Detail>
                                    <Detail title="Overnight in-patient">
                                        {eventEssentials.overnightInPatient ? 'Yes' : 'No'}
                                    </Detail>
                                    <Detail title="Client device ID">
                                        {eventEssentials.clientDeviceId}
                                    </Detail>
                                    <Detail title="Event type code">
                                        {eventEssentials.eventTypeCode}
                                    </Detail>
                                    <Detail title="Recorded date/time">
                                        {format(eventEssentials.recordedDateTime, DATE_FORMAT)} {format(eventEssentials.recordedDateTime, TIME_FORMAT)}
                                    </Detail>
                                </div>
                            )}
                            {!isEmpty(eventDescription) && (
                                <div id='eventDescription' className="EventDescription-Section EventDescription">
                                    <div className="d-flex justify-content-between margin-bottom-24">
                                        <div className="EventDescription-SectionTitle">
                                            Event Description
                                        </div>
                                    </div>
                                    <Detail title="Location">
                                        {eventDescription.location}
                                    </Detail>
                                    <Detail title="Injury">
                                        {eventDescription.injury ? 'Yes' : 'No'}
                                    </Detail>
                                    <Detail title="Situation">
                                        {eventDescription.situation}
                                    </Detail>
                                    <Detail title="Background">
                                        {eventDescription.background}
                                    </Detail>
                                    <Detail title="Assessment">
                                        {eventDescription.assessment}
                                    </Detail>
                                    <Detail title="Follow Up Expected">
                                        {eventDescription.followUpExpected ? 'Yes' : 'No'}
                                    </Detail>
                                    <Detail title="Follow Up Details">
                                        {eventDescription.followUpDetails}
                                    </Detail>
                                </div>
                            )}
                            {!isEmpty(treatmentDetails) && (
                                <div id='treatmentDetails' className="EventDescription-Section TreatmentDetails">
                                    <div className="d-flex justify-content-between margin-bottom-24">
                                        <div className="EventDescription-SectionTitle">
                                            Treatment Details
                                        </div>
                                    </div>
                                    {treatmentDetails.treatingPhysicianDetails && (
                                        <>
                                            <Detail title="Physician Name">
                                                {treatmentDetails.treatingPhysicianDetails.name}
                                            </Detail>
                                            {treatmentDetails.treatingPhysicianDetails.address && (
                                                <Detail title="Address">
                                                    {treatmentDetails.treatingPhysicianDetails.address.street}
                                                    {treatmentDetails.treatingPhysicianDetails.address.city}
                                                    {treatmentDetails.treatingPhysicianDetails.address.stateName}
                                                    {treatmentDetails.treatingPhysicianDetails.address.zip}
                                                </Detail>
                                            )}
                                            <Detail title="Phone">
                                                {treatmentDetails.treatingPhysicianDetails.phone}
                                            </Detail>
                                        </>
                                    )}
                                    {treatmentDetails.treatingHospitalDetails && (
                                        <>
                                            <Detail title="Physician Name">
                                                {treatmentDetails.treatingHospitalDetails.name}
                                            </Detail>
                                            {treatmentDetails.treatingHospitalDetails.address && (
                                                <Detail title="Address">
                                                    {treatmentDetails.treatingHospitalDetails.address.street}
                                                    {treatmentDetails.treatingHospitalDetails.address.city}
                                                    {treatmentDetails.treatingHospitalDetails.address.stateName}
                                                    {treatmentDetails.treatingHospitalDetails.address.zip}
                                                </Detail>
                                            )}
                                            <Detail title="Phone">
                                                {treatmentDetails.treatingHospitalDetails.phone}
                                            </Detail>
                                        </>
                                    )}
                                </div>
                            )}
                            {!isEmpty(responsibleManager) && (
                                <div id='responsibleManager' className="EventDescription-Section ResponsibleManager">
                                    <div className="d-flex justify-content-between margin-bottom-24">
                                        <div className="EventDescription-SectionTitle">
                                            Responsible Manager
                                        </div>
                                    </div>
                                    <Detail title="Name">
                                        {responsibleManager.displayName}
                                    </Detail>
                                    <Detail title="Phone">
                                        {responsibleManager.phone}
                                    </Detail>
                                    <Detail title="Email">
                                        {responsibleManager.email}
                                    </Detail>
                                </div>
                            )}
                            {!isEmpty(registeredNurse) && (
                                <div id='registeredNurse' className="EventDescription-Section RegisteredNurse">
                                    <div className="d-flex justify-content-between margin-bottom-24">
                                        <div className="EventDescription-SectionTitle">
                                            Registered Nurse (RN)
                                        </div>
                                    </div>
                                    <Detail title="Name">
                                        {`${registeredNurse.firstName} ${registeredNurse.lastName}`}
                                    </Detail>
                                    <Detail title="Phone">
                                        {registeredNurse.phone}
                                    </Detail>
                                </div>
                            )}
                            {!isEmpty(procedures) && (
                                <div id='procedures' className="EventDescription-Section EventProcedures">
                                    <div className="d-flex justify-content-between margin-bottom-24">
                                        <div className="EventDescription-SectionTitle">
                                            Procedures
                                        </div>
                                    </div>
                                    {map(procedures, (o, i) => (
                                        <div className="EventDescription-Section Procedures">
                                            <div className="d-flex justify-content-between margin-bottom-24">
                                                <div className="EventDescription-SectionTitle font-size-16">
                                                    PROCEDURE #{i+1}
                                                </div>
                                            </div>
                                            <Detail title="Set id">
                                                {o.setId}
                                            </Detail>
                                            <Detail title="Procedure coding method">
                                                {o.procedureCodingMethod}
                                            </Detail>
                                            {o.procedureCode && (
                                                <Detail title="Procedure code">
                                                    <SubDetail
                                                        text="identifier"
                                                        value={o.procedureCode.identifier}
                                                    />
                                                    <SubDetail
                                                        text="text"
                                                        value={o.procedureCode.text}
                                                    />
                                                    <SubDetail
                                                        text="Name Of Coding System"
                                                        value={o.procedureCode.codingSystemName}
                                                    />
                                                </Detail>
                                            )}
                                            <Detail title="Procedure Description">
                                                {o.procedureDescription}
                                            </Detail>
                                            <Detail title="Procedure date/time">
                                                {format(o.procedureDateTime, DATE_FORMAT)} {format(o.procedureDateTime, TIME_FORMAT)}
                                            </Detail>
                                            <Detail title="Procedure functional type">
                                                {o.procedureFunctionalType}
                                            </Detail>
                                            {o.associatedDiagnosisCode && (
                                                <Detail title="Associated Diagnosis Code">
                                                    <SubDetail
                                                        text="identifier"
                                                        value={o.associatedDiagnosisCode.identifier}
                                                    />
                                                    <SubDetail
                                                        text="text"
                                                        value={o.associatedDiagnosisCode.text}
                                                    />
                                                    <SubDetail
                                                        text="Name Of Coding System"
                                                        value={o.associatedDiagnosisCode.codingSystemName}
                                                    />
                                                </Detail>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {!isEmpty(clientVisit) && (
                                <div id='clientVisit' className="EventDescription-Section ClientVisit">
                                    <div className="d-flex justify-content-between margin-bottom-24">
                                        <div className="EventDescription-SectionTitle">
                                            Client Visit
                                        </div>
                                    </div>
                                    <Detail title="Client class">
                                        {clientVisit.clientClass}
                                    </Detail>
                                    {clientVisit.assignedClientLocation && (
                                        <Detail title="Assigned Client Location">
                                            <SubDetail
                                                text="point of care"
                                                value={clientVisit.assignedClientLocation.pointOfCare}
                                            />
                                            <SubDetail
                                                text="room"
                                                value={clientVisit.assignedClientLocation.room}
                                            />
                                            <SubDetail
                                                text="bed"
                                                value={clientVisit.assignedClientLocation.bed}
                                            />
                                            <SubDetail
                                                text="facility"
                                                value={clientVisit.assignedClientLocation.facility.namespaceID}
                                            />
                                            <SubDetail
                                                text="location status"
                                                value={clientVisit.assignedClientLocation.locationStatus}
                                            />
                                            <SubDetail
                                                text="person location status"
                                                value={clientVisit.assignedClientLocation.personLocationStatus}
                                            />
                                            <SubDetail
                                                text="building"
                                                value={clientVisit.assignedClientLocation.building}
                                            />
                                            <SubDetail
                                                text="floor"
                                                value={clientVisit.assignedClientLocation.floor}
                                            />
                                            <SubDetail
                                                text="location description"
                                                value={clientVisit.assignedClientLocation.locationDescription}
                                            />
                                        </Detail>
                                    )}
                                    {clientVisit.admissionType && (
                                        <Detail title="Admission type">
                                            <SubDetail
                                                text="accident"
                                                value={clientVisit.admissionType.personLocationStatus}
                                            />
                                            <SubDetail
                                                text="emergency"
                                                value={clientVisit.admissionType.building}
                                            />
                                            <SubDetail
                                                text="labor and delivery"
                                                value={clientVisit.admissionType.floor}
                                            />
                                            <SubDetail
                                                text="routine"
                                                value={clientVisit.admissionType.locationDescription}
                                            />
                                        </Detail>
                                    )}
                                    {clientVisit.priorClientLocation && (
                                        <Detail title="Prior Client Location">
                                            <SubDetail
                                                text="point of care"
                                                value={clientVisit.priorClientLocation.pointOfCare}
                                            />
                                            <SubDetail
                                                text="room"
                                                value={clientVisit.priorClientLocation.room}
                                            />
                                            <SubDetail
                                                text="bed"
                                                value={clientVisit.priorClientLocation.bed}
                                            />
                                            <SubDetail
                                                text="facility"
                                                value={clientVisit.priorClientLocation.facility.namespaceID}
                                            />
                                            <SubDetail
                                                text="location status"
                                                value={clientVisit.priorClientLocation.locationStatus}
                                            />
                                            <SubDetail
                                                text="person location status"
                                                value={clientVisit.priorClientLocation.personLocationStatus}
                                            />
                                            <SubDetail
                                                text="building"
                                                value={clientVisit.priorClientLocation.building}
                                            />
                                            <SubDetail
                                                text="floor"
                                                value={clientVisit.priorClientLocation.floor}
                                            />
                                            <SubDetail
                                                text="location description"
                                                value={clientVisit.priorClientLocation.locationDescription}
                                            />
                                        </Detail>
                                    )}
                                    <Detail title="Attending doctor">
                                        {clientVisit.attendingDoctors}
                                    </Detail>
                                    <Detail title="Referring doctor">
                                        {clientVisit.referringDoctors}
                                    </Detail>
                                    <Detail title="Consulting doctor">
                                        {clientVisit.consultingDoctors}
                                    </Detail>
                                    <Detail title="Preadmit Test Indicator">
                                        {clientVisit.preadmitTestIndicator}
                                    </Detail>
                                    <Detail title="Readmission Indicator">
                                        {clientVisit.readmissionIndicator}
                                    </Detail>
                                    <Detail title="Admit source">
                                        {clientVisit.admitSource}
                                    </Detail>
                                    <Detail title="Ambulatory Status">
                                        {clientVisit.ambulatoryStatuses}
                                    </Detail>
                                    <Detail title="Discharge Disposition">
                                        {clientVisit.dischargeDisposition}
                                    </Detail>
                                    {clientVisit.dischargedToLocation && (
                                        <Detail title="Discharged To Location">
                                            <SubDetail
                                                text="discharge location"
                                                value={clientVisit.dischargedToLocation.dischargeLocation}
                                            />
                                            <SubDetail
                                                text="effective date"
                                                value={clientVisit.dischargedToLocation.effectiveDate}
                                            />
                                        </Detail>
                                    )}
                                    <Detail title="Servicing Facility">
                                        {clientVisit.servicingFacility}
                                    </Detail>
                                    <Detail title="Admit date/time">
                                        {format(clientVisit.admitDatetime, DATE_FORMAT)} {format(clientVisit.admitDatetime, TIME_FORMAT)}
                                    </Detail>
                                    <Detail title="Discharge date/time">
                                        {format(clientVisit.dischargeDatetime, DATE_FORMAT)} {format(clientVisit.dischargeDatetime, TIME_FORMAT)}
                                    </Detail>
                                </div>
                            )}
                            {!isEmpty(diagnosis) && (
                                <div id='diagnosis' className="EventDescription-Section EventDiagnosis">
                                    <div className="d-flex justify-content-between margin-bottom-24">
                                        <div className="EventDescription-SectionTitle">
                                            Diagnosis
                                        </div>
                                    </div>
                                    {map(diagnosis, (o, i) => (
                                        <div className="EventDescription-Section Diagnosis">
                                            <div className="d-flex justify-content-between margin-bottom-24">
                                                <div className="EventDescription-SectionTitle font-size-16">
                                                    DIAGNOSIS #{i+1}
                                                </div>
                                            </div>
                                            <Detail title="Set id">
                                                {o.setId}
                                            </Detail>
                                            <Detail title="Diagnosis coding method">
                                                {o.diagnosisCodingMethod}
                                            </Detail>
                                            {o.diagnosisCode && (
                                                <Detail title="Diagnosis code">
                                                    <SubDetail
                                                        text="identifier"
                                                        value={o.diagnosisCode.identifier}
                                                    />
                                                    <SubDetail
                                                        text="text"
                                                        value={o.diagnosisCode.text}
                                                    />
                                                    <SubDetail
                                                        text="Name Of Coding System"
                                                        value={o.diagnosisCode.codingSystemName}
                                                    />
                                                </Detail>
                                            )}
                                            <Detail title="Diagnosis Description">
                                                {o.diagnosisDescription}
                                            </Detail>
                                            <Detail title="Diagnosis date/time">
                                                {format(o.diagnosisDateTime, DATE_FORMAT)} {format(o.diagnosisDateTime, TIME_FORMAT)}
                                            </Detail>
                                            <Detail title="Diagnosis type">
                                                {o.diagnosisType}
                                            </Detail>
                                            {o.associatedDiagnosisCode && (
                                                <Detail title="Associated Diagnosis Code">
                                                    <SubDetail
                                                        text="identifier"
                                                        value={o.associatedDiagnosisCode.identifier}
                                                    />
                                                    <SubDetail
                                                        text="text"
                                                        value={o.associatedDiagnosisCode.text}
                                                    />
                                                    <SubDetail
                                                        text="Name Of Coding System"
                                                        value={o.associatedDiagnosisCode.codingSystemName}
                                                    />
                                                </Detail>
                                            )}
                                            <Detail title="Diagnosis clinician">
                                                {o.diagnosisClinician}
                                            </Detail>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {!isEmpty(guarantors) && (
                                <div id='guarantors' className="EventDescription-Section EventGuarantors">
                                    <div className="d-flex justify-content-between margin-bottom-24">
                                        <div className="EventDescription-SectionTitle">
                                            Guarantors
                                        </div>
                                    </div>
                                    {map(guarantors, (o, i) => (
                                        <div className="EventDescription-Section Guarantors">
                                            <div className="d-flex justify-content-between margin-bottom-24">
                                                <div className="EventDescription-SectionTitle font-size-16">
                                                    GUARANTOR #{i+1}
                                                </div>
                                            </div>
                                            <Detail title="Set id">
                                                {o.setId}
                                            </Detail>
                                            <Detail title="Guarantor name">
                                                <SubDetail
                                                    text="first name"
                                                    value={o.firstName}
                                                />
                                                <SubDetail
                                                    text="last name"
                                                    value={o.lastName}
                                                />
                                                <SubDetail
                                                    text="middle name"
                                                    value={o.middleName}
                                                />
                                            </Detail>
                                            {o.address && (
                                                <Detail title="Guarantor address">
                                                    <SubDetail
                                                        text="street address"
                                                        value={o.address.street}
                                                    />
                                                    <SubDetail
                                                        text="city"
                                                        value={o.address.city}
                                                    />
                                                    <SubDetail
                                                        text="state or province"
                                                        value={o.address.stateName}
                                                    />
                                                    <SubDetail
                                                        text="zip or postal code"
                                                        value={o.address.postalCode}
                                                    />
                                                    <SubDetail
                                                        text="country"
                                                        value={o.address.country}
                                                    />
                                                </Detail>
                                            )}
                                            <Detail title="Guarantor Phone Number - Home">
                                                <SubDetail
                                                    text="Telephone Number"
                                                    value={o.telephoneNumber}
                                                />
                                                <SubDetail
                                                    text="Country Code"
                                                    value={o.countryCode}
                                                />
                                                <SubDetail
                                                    text="Area/city Code"
                                                    value={o.areaCode}
                                                />
                                                <SubDetail
                                                    text="Phone Number"
                                                    value={o.phoneNumber}
                                                />
                                                <SubDetail
                                                    text="Extension"
                                                    value={o.extension}
                                                />
                                                <SubDetail
                                                    text="Email Address"
                                                    value={o.email}
                                                />
                                            </Detail>
                                            {o.primaryLanguage && (
                                                <Detail title="Guarantor primary language">
                                                    <SubDetail
                                                        text="identifier"
                                                        value={o.primaryLanguage.identifier}
                                                    />
                                                    <SubDetail
                                                        text="text"
                                                        value={o.primaryLanguage.text}
                                                    />
                                                    <SubDetail
                                                        text="Name Of Coding System"
                                                        value={o.primaryLanguage.codingSystemName}
                                                    />
                                                </Detail>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {!isEmpty(insurances) && (
                                <div id='insurances' className="EventDescription-Section EventInsurances">
                                    <div className="d-flex justify-content-between margin-bottom-24">
                                        <div className="EventDescription-SectionTitle">
                                            Insurances
                                        </div>
                                    </div>
                                    {map(insurances, (o, i) => (
                                        <div className="EventDescription-Section Insurances">
                                            <div className="d-flex justify-content-between margin-bottom-24">
                                                <div className="EventDescription-SectionTitle font-size-16">
                                                    INSURANCE #{i+1}
                                                </div>
                                            </div>
                                            <Detail title="Set id">
                                                {o.setId}
                                            </Detail>
                                            {o.insurancePlanId && (
                                                <Detail title="Insurance Plan ID">
                                                    <SubDetail
                                                        text="identifier"
                                                        value={o.insurancePlanId.identifier}
                                                    />
                                                    <SubDetail
                                                        text="text"
                                                        value={o.insurancePlanId.text}
                                                    />
                                                    <SubDetail
                                                        text="Name Of Coding System"
                                                        value={o.insurancePlanId.codingSystemName}
                                                    />
                                                </Detail>
                                            )}
                                            {o.insuranceCompanyId && (
                                                <Detail title="Insurance Company ID">
                                                    <SubDetail
                                                        text="ID"
                                                        value={o.insuranceCompanyId.id}
                                                    />
                                                    <SubDetail
                                                        text="Identifier Type Code"
                                                        value={o.insuranceCompanyId.typeCode}
                                                    />
                                                    <SubDetail
                                                        text="Assigning Authority"
                                                        value={o.insuranceCompanyId.assigingAuthority}
                                                    />
                                                    <SubDetail
                                                        text="Assigning Facility"
                                                        value={o.insuranceCompanyId.assigningFacility}
                                                    />
                                                </Detail>
                                            )}
                                            {o.insuranceCompany && (
                                                <Detail title="Insurance Company Name">
                                                    <SubDetail
                                                        text="Organization Name"
                                                        value={o.insuranceCompany.name}
                                                    />
                                                    <SubDetail
                                                        text="Organization Name Type Code"
                                                        value={o.insuranceCompany.typeCode}
                                                    />
                                                    <SubDetail
                                                        text="ID Number"
                                                        value={o.insuranceCompany.id}
                                                    />
                                                    <SubDetail
                                                        text="Assigning Authority"
                                                        value={o.insuranceCompany.assigningAuthority}
                                                    />
                                                    <SubDetail
                                                        text="Assigning Facility ID"
                                                        value={o.insuranceCompany.assigningFacilityId}
                                                    />
                                                </Detail>
                                            )}
                                            <Detail title="Insurance Company Phone Number">
                                                <SubDetail
                                                    text="Telephone Number"
                                                    value={o.telephoneNumber}
                                                />
                                                <SubDetail
                                                    text="Country Code"
                                                    value={o.countryCode}
                                                />
                                                <SubDetail
                                                    text="Area/city Code"
                                                    value={o.areaCode}
                                                />
                                                <SubDetail
                                                    text="Phone Number"
                                                    value={o.phoneNumber}
                                                />
                                                <SubDetail
                                                    text="Extension"
                                                    value={o.extension}
                                                />
                                                <SubDetail
                                                    text="Email Address"
                                                    value={o.email}
                                                />
                                            </Detail>
                                            <Detail title="Group Number">
                                                {o.groupNumber}
                                            </Detail>
                                            {o.group && (
                                                <Detail title="Group Name">
                                                    <SubDetail
                                                        text="Organization Name"
                                                        value={o.group.name}
                                                    />
                                                    <SubDetail
                                                        text="Organization Name Type Code"
                                                        value={o.group.typeCode}
                                                    />
                                                    <SubDetail
                                                        text="ID Number"
                                                        value={o.group.id}
                                                    />
                                                    <SubDetail
                                                        text="Assigning Authority"
                                                        value={o.group.assigningAuthority}
                                                    />
                                                    <SubDetail
                                                        text="Assigning Facility ID"
                                                        value={o.group.assigningFacilityId}
                                                    />
                                                </Detail>
                                            )}
                                            <Detail title="Plan Effective Date">
                                                {format(o.planEffectiveDate, DATE_FORMAT)} {format(o.planEffectiveDate, TIME_FORMAT)}
                                            </Detail>
                                            <Detail title="Plan Expiration Date">
                                                {format(o.planExpirationDate, DATE_FORMAT)} {format(o.planExpirationDate, TIME_FORMAT)}
                                            </Detail>
                                            <Detail title="Plan Effective Date">
                                                {o.planType}
                                            </Detail>
                                            {o.insured && (
                                                <Detail title="Name of Insured">
                                                    <SubDetail
                                                        text="first name"
                                                        value={o.insured.firstName}
                                                    />
                                                    <SubDetail
                                                        text="last name"
                                                        value={o.insured.lastName}
                                                    />
                                                    <SubDetail
                                                        text="middle name"
                                                        value={o.insured.middleName}
                                                    />
                                                </Detail>
                                            )}
                                            <Detail title="Insured's Relationship to Client">
                                                {o.insuredRelationship}
                                            </Detail>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {!isEmpty(allergies) && (
                                <div id='allergies' className="EventDescription-Section EventAllergies">
                                    <div className="d-flex justify-content-between margin-bottom-24">
                                        <div className="EventDescription-SectionTitle">
                                            Allergies
                                        </div>
                                    </div>
                                    {map(allergies, (o, i) => (
                                        <div className="EventDescription-Section Allergy">
                                            <div className="d-flex justify-content-between margin-bottom-24">
                                                <div className="EventDescription-SectionTitle font-size-16">
                                                    ALLERGY #{i+1}
                                                </div>
                                            </div>
                                            <Detail title="Set id">
                                                {o.setId}
                                            </Detail>
                                            <Detail title="Type">
                                                {o.type}
                                            </Detail>
                                            {o.description && (
                                                <Detail title="Code/Mnemonic/ Description">
                                                    <SubDetail
                                                        text="identifier"
                                                        value={o.description.identifier}
                                                    />
                                                    <SubDetail
                                                        text="text"
                                                        value={o.description.text}
                                                    />
                                                    <SubDetail
                                                        text="name of coding system"
                                                        value={o.description.text}
                                                    />
                                                </Detail>
                                            )}
                                            <Detail title="Severity">
                                                {o.severity}
                                            </Detail>
                                            <Detail title="Reaction">
                                                {o.reaction}
                                            </Detail>
                                            <Detail title="Identification Date">
                                                {format(o.identificationDateTime, DATE_FORMAT)} {format(o.identificationDateTime, TIME_FORMAT)}
                                            </Detail>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        }

        if (tab === 1) {
            content = (
                <Table
                    hasHover
                    hasPagination
                    isLoading={event.notification.list.isFetching}
                    keyField="id"
                    className="EventSentNotificationList"
                    containerClass="EventSentNotificationListContainer"
                    data={notificationListDs.data}
                    pagination={notificationListDs.pagination}
                    columns={[
                        {
                            dataField: 'contactType',
                            text: 'Contact',
                            sort: true,
                            headerStyle: {
                                width: '258px'
                            },
                            formatter: (v, row) => {
                                return (
                                    <Row id={'EventSentNotificationHint-' + row.id}>
                                        <Col md={4}>
                                            {row.hint && (
                                                <Tooltip
                                                    className="EventSentNotification-Hint"
                                                    placement='top-start'
                                                    target={'EventSentNotificationHint-' + row.id}>
                                                    <div>
                                                        <div className="font-weight-bold text-left">
                                                         {row.hint.split('with text:')[0]} with text:

                                                         </div>
                                                         {row.hint.split('with text:')[1]}
                                                    </div>
                                                </Tooltip>
                                            )}
                                            <Image
                                                className="EventSentNotification-ContactAvatar"
                                                src={row.avatar}
                                            />
                                        </Col>
                                        <Col md={8}>
                                            <Row>
                                                <span className="EventSentNotification-ContactFullName">
                                                    {row.fullName}
                                                </span>
                                            </Row>
                                            <Row>
                                                <span className="EventSentNotification-ContactRole">
                                                    {row.role}
                                                </span>
                                            </Row>
                                        </Col>
                                    </Row>
                                )
                            },
                        },
                        {
                            dataField: 'responsibility',
                            text: 'Responsibility',
                            sort: true,
                        },
                        {
                            dataField: 'organization',
                            text: 'Organization',
                            sort: true,
                        },
                        {
                            dataField: 'lisOfChannel',
                            text: 'Channel',
                            sort: true,
                        },
                        {
                            dataField: 'notificationDateTime',
                            text: 'Date',
                            sort: true,
                            headerAlign: 'right',
                            headerStyle: {
                                width: '140px'
                            },
                            align: 'right',
                            formatter: v => `${format(v, DATE_FORMAT)} ${format(v, TIME_FORMAT)}`
                        },
                    ]}
                    onRefresh={this.onRefreshNotificationList}
                />
            )
        }

        if (tab === 2) {
            content = (
                <Table
                    hasPagination
                    keyField='id'
                    isLoading={event.note.list.isFetching}
                    className='EventRelatedNoteList'
                    containerClass='EventRelatedNoteListContainer'
                    data={noteListDs.data}
                    pagination={noteListDs.pagination}
                    columns={[
                        {
                            dataField: 'createdDate',
                            text: 'Date',
                            headerAlign: 'right',
                            headerStyle: {
                                width: '200px'
                            },
                            formatter: v => `${format(v, DATE_FORMAT)} ${format(v, TIME_FORMAT)}`
                        },
                        {
                            dataField: 'status',
                            text: 'Status',
                            formatter: (v) => (
                                <span
                                    className="EventRelatedNote-Status"
                                    style={{ backgroundColor: RELATED_NOTE_LIST_STATUS_COLORS[v.name] }}>
                                    {v.title}
                                </span>
                            )
                        },
                        {
                            dataField: 'clientName',
                            text: 'Author',
                        },
                        {
                            dataField: 'role',
                            text: 'Role',
                            headerStyle: {
                                width: '200px'
                            },
                        },
                        {
                            dataField: 'archived',
                            text: 'Updates',
                            headerStyle: {
                                width: '165px'
                            },
                            formatter: (v, row) => (
                                v ? (
                                    <Button
                                        color="link"
                                        className="EventRelatedNote-ViewBtn"
                                        onClick={() => {
                                            this.onOpenNoteViewer(row)
                                        }}>
                                        View Details
                                    </Button>
                                ) : null
                            )
                        }
                    ]}
                    onRefresh={this.onRefreshNoteList}
                />
            )
        }

        return (
            <div className={cn('EventDetails', className)}>
                <div className="EventDetails-Header">
                    <Tabs
                        className='EventDetails-Tabs'
                        items={[
                            {title: 'Events Description', isActive: tab === 0},
                            {title: 'Notification Sent', isActive: tab === 1},
                            {title: 'Related Notes', isActive: tab === 2},
                        ]}
                        onChange={this.onChangeTab}
                    />
                    {(tab === 0) && (
                        <div>
                            <CreateEvent
                                className="EventDetails-CreateEventBtn"
                                onClick={this.onAddNote}
                            />
                            <DownloadPdf
                                className="EventDetails-DownloadPdfBtn"
                                onClick={this.onDownloadPdf}
                            />
                        </div>
                    )}
                </div>
                {content}
                {isNoteViewerOpen && (
                    <NoteViewer
                        isOpen={isNoteViewerOpen}
                        onClose={this.onCloseNoteViewer}
                        noteId={selectedNote && selectedNote.id}
                    />
                )}
                <NoteEditor
                    eventId={eventId}
                    isOpen={isNoteEditorOpen}
                    onClose={this.onCloseNoteEditor}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails)
