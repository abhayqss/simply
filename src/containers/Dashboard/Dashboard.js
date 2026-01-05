import React, { Component } from 'react'

import cn from 'classnames'
import { map } from 'underscore'

import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { bindActionCreators } from 'redux'
import { Link, withRouter } from 'react-router-dom'

import {
    Button,
    ListGroup as List,
    ListGroupItem as ListItem,
} from 'reactstrap'

import './Dashboard.scss'

import Table from 'components/Table/Table'
import Footer from 'components/Footer/Footer'
import Loader from 'components/Loader/Loader'
import Actions from 'components/Table/Actions/Actions'
import MultiSelect from 'components/MultiSelect/MultiSelect'
import AssessmentChart from 'components/charts/AssessmentChart/AssessmentChart'
import ServicePlanPieChart from 'components/charts/ServicePlanPieChart/ServicePlanPieChart'

import * as tokenActions from 'redux/auth/token/tokenActions'
import * as loginActions from 'redux/auth/login/loginActions'
import * as logoutActions from 'redux/auth/logout/logoutActions'
import * as caseloadListActions from 'redux/dashboard/caseload/list/caseloadListActions'
import * as dashboardNoteListActions from 'redux/dashboard/note/list/dashboardNoteListActions'

import * as appointmentListActions from 'redux/dashboard/appointment/list/appointmentListActions'
import * as dashboardEventListActions from 'redux/dashboard/event/list/dashboardEventListActions'
import * as dashboardServicePlanCountActions from 'redux/dashboard/servicePlan/count/dashboardServicePlanCountActions'
import * as dashboardAssessmentCountActions from 'redux/dashboard/assessment/count/dashboardAssessmentCountActions'

import { path } from 'lib/utils/ContextUtils'
import { isEmpty, DateUtils } from 'lib/utils/Utils'
import { PAGINATION, DASHBOARD_TYPES } from 'lib/Constants'

const { FIRST_PAGE } = PAGINATION
const {
    CASELOAD,
    APPOINTMENT,
    RECENT_NOTE,
    RECENT_EVENT,
} = DASHBOARD_TYPES

const { format, formats } = DateUtils

const TIME_FORMAT = formats.time
const DATE_FORMAT = formats.americanMediumDate

const APPOINTMENT_TYPE_COLORS = {
    CHECK_UP: '#fff1ca',
    ROUTINE_APPOINTMENT: '#d5f3b8',
    EMERGENCY_APPOINTMENT: '#fde1d5',
}

const RECENT_NOTES_TYPE_COLORS = {
    OFFICE_ED: '#949597',
    MEDICAL_EMERGENCY: '#f36c32',
    PHARMACY_INTERVENTION: '#448993',
    PHYSICIAN_COMMUNICATION: '#ffb602',
}

function mapStateToProps (state) {
    const { dashboard } = state

    return {
        auth: state.auth,

        note: dashboard.note,
        event: dashboard.event,
        caseload: dashboard.caseload,
        assessment: dashboard.assessment,
        appointment: dashboard.appointment,
        servicePlan: dashboard.servicePlan,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            servicePlan: {
                count: bindActionCreators(dashboardServicePlanCountActions, dispatch)
            },
            assessment: {
                count: bindActionCreators(dashboardAssessmentCountActions, dispatch)
            },
            caseload: {
                list: bindActionCreators(caseloadListActions, dispatch)
            },
            appointment: {
                list: bindActionCreators(appointmentListActions, dispatch)
            },
            event: {
                list: bindActionCreators(dashboardEventListActions, dispatch)
            },
            note: {
                list: bindActionCreators(dashboardNoteListActions, dispatch)
            },
            auth: {
                token: bindActionCreators(tokenActions, dispatch),
                login: bindActionCreators(loginActions, dispatch),
                logout: bindActionCreators(logoutActions, dispatch),
            }
        }
    }
}

class Dashboard extends Component {

    state = {
        isRedirectedToNoteList: false,
        isRedirectedToEventList: false,
    }

    componentDidMount () {
        this.refreshNoteList()
        this.refreshEventList()
        this.refreshCaseloadList()
        this.refreshAssessmentCount()
        this.refreshAppointmentList()
        this.refreshServicePlanCount()
    }

    componentDidUpdate () {
        const {
            note,
            event,
            caseload,
            assessment,
            servicePlan,
            appointment
        } = this.props

        if (note.list.shouldReload)
            this.refreshNoteList()

        if (event.list.shouldReload)
            this.refreshEventList()

        if (caseload.list.shouldReload)
            this.refreshCaseloadList()

        if (assessment.count.shouldReload)
            this.refreshAssessmentCount()

        if (appointment.list.shouldReload)
            this.refreshAppointmentList()

        if (servicePlan.count.shouldReload)
            this.refreshServicePlanCount()
    }

    onViewMoreEvents = () => {
        this.setState({
            isRedirectedToEventList: true
        })
    }

    onViewMoreNotes = () => {
        this.setState({
            isRedirectedToNoteList: true
        })
    }

    updateNoteList (isReload, page) {
        const {
            note,
            auth
        } = this.props

        const { user } = auth.login

        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = note.list

        if (isReload || shouldReload || (!isFetching && isEmpty(ds.data))) {
            const { actions } = this.props
            const { page: p, size } = ds.pagination

            actions.note.list.load({
                size,
                page: page || p,
                type: RECENT_NOTE,
                organizationId: user.data && user.data.organizationId,
            })
        }
    }

    updateEventList (isReload, page) {
        const {
            auth,
            event
        } = this.props

        const { user } = auth.login

        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = event.list

        if (isReload || shouldReload || (!isFetching && isEmpty(ds.data))) {
            const { actions } = this.props
            const { page: p, size } = ds.pagination


            actions.event.list.load({
                size,
                page: page || p,
                type: RECENT_EVENT,
                organizationId: user.data && user.data.organizationId,
            })
        }
    }

    updateCaseloadList (isReload, page) {
        const {
            caseload
        } = this.props

        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = caseload.list

        if (isReload || shouldReload || (!isFetching && isEmpty(ds.data))) {
            const { actions } = this.props
            const { page: p, size } = ds.pagination

            actions.caseload.list.load({
                size,
                page: page || p,
                type: CASELOAD
            })
        }
    }

    updateAppointmentList (isReload, page) {
        const {
            appointment
        } = this.props

        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = appointment.list

        if (isReload || shouldReload || (!isFetching && isEmpty(ds.data))) {
            const { actions } = this.props
            const { page: p, size } = ds.pagination

            actions.appointment.list.load({
                size,
                page: page || p,
                type: APPOINTMENT
            })
        }
    }

    updateServicePlanCount () {
        const {
            servicePlan
        } = this.props

        const {
            isFetching,
            shouldReload,
        } = servicePlan.count

        if (shouldReload || (!isFetching)) {
            const { actions } = this.props

            actions.servicePlan.count.load()
        }
    }

    updateAssessmentCount () {
        const {
            assessment
        } = this.props

        const {
            isFetching,
            shouldReload,
        } = assessment.count

        if (shouldReload || (!isFetching)) {
            const { actions } = this.props

            actions.assessment.count.load()
        }
    }

    refreshNoteList (page) {
        this.updateNoteList(true, page || FIRST_PAGE)
    }

    refreshEventList (page) {
        this.updateEventList(true, page || FIRST_PAGE)
    }

    refreshCaseloadList (page) {
        this.updateCaseloadList(true, page || FIRST_PAGE)
    }

    refreshAppointmentList (page) {
        this.updateAppointmentList(true, page || FIRST_PAGE)
    }

    refreshServicePlanCount () {
        this.updateServicePlanCount()
    }

    refreshAssessmentCount () {
        this.updateAssessmentCount()
    }

    onConfigureCaseLoad () {

    }

    render () {
        const {
            className,

            note,
            event,
            caseload,
            assessment,
            servicePlan,
            appointment,
        } = this.props

        const noteListDs = note.list.dataSource
        const eventListDs = event.list.dataSource
        const caseloadListDs = caseload.list.dataSource
        const assessmentDs = assessment.count.dataSource
        const servicePlanDs = servicePlan.count.dataSource
        const appointmentListDs = appointment.list.dataSource

        if (this.state.isRedirectedToEventList) {
            return (
                <Redirect
                    to={{
                        state: { tab: 1 },
                        pathname: path('/events'),
                    }}
                />
            )
        }

        if (this.state.isRedirectedToNoteList) {
            return (
                <Redirect
                    to={{
                        state: { tab: 2 },
                        pathname: path('/events'),
                    }}
                />
            )
        }

        return (
            <div className={cn('Dashboard', className)}>
                <div className='Dashboard-Body'>
                    <div className='Dashboard-Charts'>
                        {assessment.count.isFetching ? (
                            <Loader/>
                        ) : (
                            <AssessmentChart
                                data={assessmentDs.data}
                            />
                        )}
                        {servicePlan.count.isFetching ? (
                            <Loader/>
                        ) : (
                            <ServicePlanPieChart
                                data={servicePlanDs.data}
                            />
                        )}

                    </div>
                    {/* <Table
                        hasPagination
                        keyField='id'
                        title='Caseload'
                        isLoading={caseload.list.isFetching}
                        className='CaseloadList'
                        containerClass='CaseloadListContainer'
                        data={caseloadListDs.data}
                        pagination={caseloadListDs.pagination}
                        columns={[
                            {
                                dataField: 'client',
                                text: 'Client',
                                headerStyle: {
                                    width: '193px',
                                },
                                formatter: (v, row) => {
                                    return (
                                        <>
                                            <Link
                                                to={path('dashboard')}
                                                className='Dashboard-Link'>
                                                {row.client}
                                            </Link>
                                        </>
                                    )
                                },
                            },
                            {
                                dataField: 'status',
                                text: 'Status',
                                headerStyle: {
                                    width: '101px',
                                },
                            },
                            {
                                dataField: 'serviceCoordinator',
                                text: 'Service Coordinator',
                                headerStyle: {
                                    width: '107px',
                                },
                            },
                            {
                                dataField: 'assessment',
                                text: 'Assessment',
                                headerAlign: 'right',
                                align: 'right',
                                headerStyle: {
                                    width: '130px',
                                },
                                style: {color: '#33333'},
                            },
                            {
                                dataField: 'servicePlan',
                                text: 'Service Plan',
                                align: 'right',
                                headerStyle: {
                                    width: '96px',
                                },
                                style: {color: '#33333'},
                            },
                            {
                                dataField: 'riskScore',
                                text: 'Risk Score',
                                headerStyle: {
                                    width: '205px',
                                },
                                style: {color: '#33333'},
                            },
                            {
                                dataField: 'notes',
                                text: 'Notes',
                                headerStyle: {
                                    width: '115px',
                                },
                                formatter: (v, row) => {
                                    return (
                                        <>
                                            <span
                                                className='Dashboard-Link'>
                                                {row.notes}
                                            </span>
                                        </>
                                    )
                                },
                            },
                            {
                                dataField: 'appointment',
                                text: 'Appointment',
                                headerStyle: {
                                    width: '150px',
                                },
                                align: 'right',
                                formatter: (v, row) => {
                                    return (
                                        <>
                                            <span
                                                className='Dashboard-Link'>
                                                {row.appointment}
                                            </span>
                                        </>
                                    )
                                },
                            },
                            {
                                dataField: 'ctMembers',
                                text: 'CT Members',
                                headerStyle: {
                                    width: '115px',
                                },
                                formatter: (v, row) => {
                                    return (
                                        <>
                                            <span
                                                className='Dashboard-Link'>
                                                {row.ctMembers}
                                            </span>
                                        </>
                                    )
                                },
                            },
                        ]}
                        renderCaption={title => {
                            return (
                                <>
                                    <div className="CaseloadList-Caption">
                                        <div>
                                            <div className="CaseloadList-Title Table-Title">
                                                {title}
                                            </div>
                                            <MultiSelect
                                                className={'CaseloadList-TypeSelect'}
                                                options={[]}
                                                defaultText="Status"
                                                isMultiple={false}
                                                onChange={this.onSelectingOption}
                                            />
                                        </div>
                                        <div>
                                            <Actions
                                                iconSize={36}
                                                hasConfigureAction={true}
                                                onConfigure={this.onConfigureCaseLoad}
                                            />
                                        </div>
                                    </div>
                                </>
                            )
                        }}
                    />
                    <Table
                        keyField='id'
                        title='Upcoming appointments'
                        isLoading={appointment.list.isFetching}
                        className='AppointmentList'
                        containerClass='AppointmentListContainer'
                        data={appointmentListDs.data}
                        pagination={appointmentListDs.pagination}
                        columns={[
                            {
                                headerStyle: {
                                    width: '85px',
                                },
                                formatter: (v, row, rowIndex) => {
                                    return (
                                        <div className="AppointmentList-DateTimeWrapper">
                                            <span
                                                className="AppointmentList-NumberSequence">
                                                {rowIndex + 1}
                                            </span>
                                            <div
                                                style={{fontSize: 18}}>
                                                {`${row.appointment.date} ${row.appointment.month}` }
                                            </div>
                                            <span
                                                style={{fontSize: 13}}>
                                                {row.appointment.time}
                                            </span>
                                        </div>
                                    )
                                },
                            },
                            {
                                dataField: 'client',
                                text: 'Client',
                                headerStyle: {
                                    width: '115px',
                                },
                                formatter: (v, row) => {
                                    return (
                                        <>
                                            <Link
                                                to={path('dashboard')}
                                                className='Dashboard-Link'>
                                                {row.client}
                                            </Link>
                                            <span
                                                style={{backgroundColor: APPOINTMENT_TYPE_COLORS[row.appointment.type]}}
                                                className="Dashboard-Status">
                                                {row.appointment.name}
                                            </span>
                                        </>
                                    )
                                },
                            },
                            {
                                dataField: 'location',
                                text: 'Location',
                                headerStyle: {
                                    width: '101px',
                                },
                                formatter: (v, row) => {
                                    return (
                                        <>
                                            <span
                                                className='AppointmentList-Location'>
                                                {row.location}
                                            </span>
                                        </>
                                    )
                                },
                            },
                            {
                                dataField: 'community',
                                text: 'Community',
                                headerStyle: {
                                    width: '107px',
                                },
                            },
                            {
                                dataField: 'provider',
                                text: 'Provider',
                                headerStyle: {
                                    width: '100px',
                                },
                                style: {color: '#33333'},
                            },
                            {
                                dataField: 'status',
                                text: 'Status',
                                headerStyle: {
                                    width: '96px',
                                },
                                style: {color: '#33333'},
                            },
                        ]}
                    />*/}
                    <div className="Dashboard-EventNoteContainer">
                        <div className="RecentEventsSummary">
                            <div className='RecentEventsSummary-Title'>Recent Events</div>
                            {event.list.isFetching ? (
                                <Loader/>
                            ) : (
                                <>
                                    <List className="EventList">
                                        {map(eventListDs.data, o => (
                                            <div>
                                                <ListItem className="EventList-Item">
                                                    <div className="EventList-TextWrapper">
                                                        <span className="EventList-ClientProblem">
                                                            {o.type.title}
                                                        </span>
                                                        <Link
                                                            to={path('dashboard')}
                                                            className='Dashboard-Link'>
                                                            {o.clientName}
                                                        </Link>
                                                    </div>
                                                    <span className="EventList-DateTime">
                                                    {`${format(o.createdDate, DATE_FORMAT)} ${format(o.createdDate, TIME_FORMAT)}`}
                                                </span>
                                                </ListItem>
                                            </div>
                                        ))}
                                    </List>
                                    <div>
                                        <Button
                                            color='success'
                                            className="EventList-ViewMoreBtn"
                                            onClick={this.onViewMoreEvents}>
                                            View More
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="RecentNotesSummary">
                            <div className='RecentNotesSummary-Title'>Recent Notes</div>
                            {note.list.isFetching ? (
                                <Loader/>
                            ) : (
                                <>
                                    <List className="NoteList">
                                        {map(noteListDs.data, o => (
                                            <div>
                                                <ListItem className="NoteList-Item">
                                                    <div className="NoteList-TextWrapper">
                                                        <span className="NoteList-ClientProblem">
                                                            {/*{o.note.name}*/}


                                                        </span>
                                                        <div className="d-flex">
                                                            <Link
                                                                to={path('dashboard')}
                                                                className='Dashboard-Link'>
                                                                {o.clientName}


                                                            </Link>
                                                            <span
                                                                style={{
                                                                    color: '#ffffff',
                                                                    // backgroundColor: RECENT_NOTES_TYPE_COLORS[o.appointment.type]
                                                                }}
                                                                className="Dashboard-Status">
                                                                    {/*{o.appointment.name}*/}

                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span className="NoteList-DateTime">
                                                    {`${format(o.createdDate, DATE_FORMAT)} ${format(o.createdDate, TIME_FORMAT)}`}
                                                </span>
                                                </ListItem>
                                            </div>
                                        ))}
                                    </List>
                                    <div>
                                        <Button
                                            color='success'
                                            className="NoteList-ViewMoreBtn"
                                            onClick={this.onViewMoreNotes}>
                                            View More
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))