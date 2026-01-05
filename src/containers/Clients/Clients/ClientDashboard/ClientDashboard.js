import React, { Component } from 'react'

import { map } from 'underscore'

import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { bindActionCreators } from 'redux'

import DocumentTitle from 'react-document-title'

import { Button } from 'reactstrap'

import './ClientDashboard.scss'

import Loader from 'components/Loader/Loader'
import Dropdown from 'components/Dropdown/Dropdown'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import ConfirmDialog from 'components/dialogs/ConfirmDialog/ConfirmDialog'
import SuccessDialog from 'components/dialogs/SuccessDialog/SuccessDialog'

import LoadCanAddServicePlanAction from 'actions/clients/LoadCanAddServicePlanAction'
import LoadClientElementCountsAction from 'actions/clients/LoadClientElementCountsAction'

import * as sideBarActions from 'redux/sidebar/sideBarActions'
import * as clientDetailsActions from 'redux/client/details/clientDetailsActions'

import { path } from 'lib/utils/ContextUtils'
import { isEmpty, pickAs } from 'lib/utils/Utils'

import { ReactComponent as Warning } from 'images/alert-yellow.svg'

import { getSideBarItems } from '../../SideBarItems'

import ClientEditor from '../ClientEditor/ClientEditor'
import NoteEditor from '../../../Events/NoteEditor/NoteEditor'

import ClientDetails from './ClientDetails/ClientDetails'
import ClientProblemsSummary from './ClientProblemsSummary/ClientProblemsSummary'
import ClientAllergiesSummary from './ClientAllergiesSummary/ClientAllergiesSummary'
import ClientRecentNotesSummary from './ClientRecentNotesSummary/ClientRecentNotesSummary'
import ClientMedicationsSummary from './ClientMedicationsSummary/ClientMedicationsSummary'
import ClientEncountersSummary from './ClientEncountersSummary/ClientEncountersSummary'
import ClientAssessmentsSummary from './ClientAssessmentsSummary/ClientAssessmentsSummary'
import ClientServicesCostSummary from './ClientServicesCostSummary/ClientServicesCostSummary'
import ClientRecentEventsSummary from './ClientRecentEventsSummary/ClientRecentEventsSummary'
import ClientServicePlansSummary from './ClientServicePlansSummary/ClientServicePlansSummary'
import ClientUpcomingAppointments from './ClientUpcomingAppointments/ClientUpcomingAppointments'
import ClientEventUtilizationSummary from './ClientEventUtilizationSummary/ClientEventUtilizationSummary'
import ClientDocumentsDevicesSummary from './ClientDocumentsDevicesSummary/ClientDocumentsDevicesSummary'

import { loadCounts } from 'redux/client/clientActions'

const VIDEO_CALL = 'VIDEO_CALL'
const EDIT_DETAILS = 'EDIT_DETAILS'
const RIDE_HISTORY = 'RIDE_HISTORY'
const CREATE_EVENT = 'CREATE_EVENT'
const MARK_AS_INACTIVE = 'MARK_AS_INACTIVE'
const CREATE_ASSESSMENT = 'CREATE_ASSESSMENT'
const REQUEST_A_NEW_RIDE = 'REQUEST_A_NEW_RIDE'
const CREATE_SERVICE_PLAN = 'CREATE_SERVICE_PLAN'
const CARE_TEAM = 'CARE_TEAM'

const OPTIONS = [
    /*{ name: 'CREATE_EVENT', text: 'Create Event', value: 0, hasSeparator: true },*/
    { name: CREATE_ASSESSMENT, title: 'Create Assessment' },
    { name: CREATE_SERVICE_PLAN, title: 'Create Service Plan', hasSeparator: true },
    /* {name: 'REQUEST_A_NEW_RIDE', text: 'Request a new ride', value: 3},*/
    /* {name: 'RIDE_HISTORY', text: 'Ride History', value: 4},*/
    /*    {name: 'VIDEO_CALL', text: 'Video call', value: 5, hasSeparator: true},*/
    /*    {name: 'MARK_AS_INACTIVE', text: 'Mark as Inactive', value: 6},*/
    { name: EDIT_DETAILS, title: 'Edit Client Record' },
    { name: CARE_TEAM, title: 'Care Team' }
]

function mapStateToProps(state) {
    const {
        details,
        document,
        assessment,
        servicePlan
    } = state.client

    return {
        details,

        documentCount: document.count.value,
        assessmentCount: assessment.count.value,
        servicePlanCount: servicePlan.count.value,
        eventCount: state.event.note.composed.count.value,
        user: state.auth.login.user.data || {},
        canAdd: servicePlan.can.add.value
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            details: bindActionCreators(clientDetailsActions, dispatch),
            sidebar: bindActionCreators(sideBarActions, dispatch)
        }
    }
}

class ClientDashboard extends Component {
    state = {
        shouldOpenCareTeam: false,
        shouldCreateAssessment: false,
        shouldCreateServicePlan: false,

        isNoteEditorOpen: false,

        isDetailsEditorOpen: false,
        isSaveDetailsSuccessDialogOpen: false,
        isCancelEditDetailsConfirmDialogOpen: false
    }

    componentDidMount() {
        this.refresh()
        this.updateSideBar()
    }

    componentWillUnmount() {
        this.actions.details.clear()
    }

    onAddNote = () => {
        this.setState({ isNoteEditorOpen: true })
    }

    onCloseNoteEditor = () => {
        this.setState({ isNoteEditorOpen: false })
    }

    onCloseDetailsEditor = (shouldConfirm = false) => {
        this.setState({
            isDetailsEditorOpen: shouldConfirm,
            isSaveDetailsSuccessDialogOpen: false,
            isCancelEditDetailsConfirmDialogOpen: shouldConfirm
        })
    }

    onSaveDetailsSuccess = () => {
        this.setState({
            isDetailsEditorOpen: false,
            isSaveDetailsSuccessDialogOpen: true
        })
    }

    onCloseCancelEditDetailsConfirmDialog = () => {
        this.setState({
            isCancelEditDetailsConfirmDialogOpen: false
        })
    }

    onUpdateSideBar = () => {
        this.updateSideBar()
    }

    get actions() {
        return this.props.actions
    }

    get clientId() {
        return +this.props.match.params.clientId
    }

    updateSideBar() {
        this.actions.sidebar.update({
            isHidden: false,
            items: getSideBarItems({
                clientId: this.clientId,
                ...pickAs(
                    this.props,
                    'eventCount',
                    'documentCount',
                    'assessmentCount',
                    'servicePlanCount',
                )
            })
        })
    }

    selectOption(name) {
        switch (name) {
            case EDIT_DETAILS: {
                this.setState({ isDetailsEditorOpen: true })
                break
            }
            case CREATE_ASSESSMENT: {
                this.setState({ shouldCreateAssessment: true })
                break
            }
            case CREATE_SERVICE_PLAN: {
                this.setState({ shouldCreateServicePlan: true })
                break
            }
            case CARE_TEAM: {
                this.setState({ shouldOpenCareTeam: true })
                break
            }
        }
    }

    isLoading() {
        const { isFetching, shouldReload } = this.props

        return isFetching || shouldReload
    }

    refresh() {
        this.update(true)
    }

    update(isReload) {
        if (isReload || isEmpty(this.props.data)) {
            this.actions.details.load(
                this.clientId
            )
        }
    }

    getOptions() {
        const options = OPTIONS.filter(option => {
            return option.name !== CREATE_SERVICE_PLAN || this.props.canAdd
        })

        return options
    }

    render() {
        const {
            shouldCreateAssessment,
            shouldCreateServicePlan,
            shouldOpenCareTeam
        } = this.state

        const clientId = this.clientId

        if (shouldCreateAssessment) {
            return (
                <Redirect
                    to={{
                        pathname: path(`clients/${clientId}/assessments`),
                        state: { shouldCreate: true }
                    }}
                />
            )
        }

        if (shouldCreateServicePlan) {
            return (
                <Redirect
                    to={{
                        pathname: path(`clients/${clientId}/service-plans`),
                        state: { shouldCreate: true }
                    }}
                />
            )
        }

        if (shouldOpenCareTeam) {
            return (
                <Redirect
                    to={{
                        pathname: path(`clients/${clientId}/care-team`)
                    }}
                />
            )
        }

        const {
            data,
            isFetching
        } = this.props.details

        let content = null

        if (isFetching) {
            content = <Loader/>
        }

        else if (isEmpty(data)) {
            content = <h4>No Data</h4>
        }

        else {
            const {
                isNoteEditorOpen,
                isDetailsEditorOpen,
                isSaveDetailsSuccessDialogOpen,
                isCancelEditDetailsConfirmDialogOpen
            } = this.state

            content = (
                <>
                    <div className='ClientDashboard-Body'>
                        <Breadcrumbs
                            className='ClientDashboard-Breadcrumbs'
                            items={[
                                {
                                    title: 'Clients',
                                    href: '/clients',
                                    isEnabled: true
                                },
                                {
                                    title: 'Dashboard',
                                    href: '/clients/' + this.clientId,
                                    isActive: true,
                                },
                            ]}
                        />
                        <div className="ClientDashboard-ClientDetailsHeader">
                            <span className="ClientDashboard-ClientDetailsTitle">Client Details</span>
                            <span className="ClientDashboard-ClientName">
                                / {data.firstName + ' ' + data.lastName}
                            </span>
                            <Dropdown
                                toggleText="More Options"
                                items={map(this.getOptions(), o => ({
                                    text: o.title,
                                    value: o.name,
                                    onClick: () => this.selectOption(o.name)
                                }))}
                                className="ClientDashboard-MoreOptionsDropdown"
                            />
                            {/*<Button
                                color="success"
                                className="ClientDashboard-AddNoteBtn"
                                onClick={this.onAddNote}>
                                Add a Note
                            </Button>*/}
                            <NoteEditor
                                isOpen={isNoteEditorOpen}
                                onClose={this.onCloseNoteEditor}
                            />
                        </div>
                        <div className="ClientDashboard-Section">
                            <ClientDetails/>
                            <div style={{ flex: 1 }}/>
                            {/*<ClientDocumentsDevicesSummary/>*/}
                        </div>
                        {/*<ClientServicePlansSummary className='margin-bottom-60'/>
                        <ClientUpcomingAppointments className="ClientDashboard-Section"/>
                        <ClientServicesCostSummary className='margin-bottom-60'/>
                        <ClientEventUtilizationSummary className='margin-bottom-60'/>
                        <ClientEncountersSummary className='margin-bottom-60'/>
                        <ClientAssessmentsSummary className='margin-bottom-60'/>
                        <div className="ClientDashboard-Section">
                            <ClientRecentEventsSummary className='flex-1 margin-right-30'/>
                            <ClientRecentNotesSummary className='flex-1'/>
                        </div>
                        <div className="ClientDashboard-MedicationsSummary ClientDashboard-Section">
                            <ClientMedicationsSummary/>
                        </div>
                        <div className="ClientDashboard-ProblemsSummary">
                            <ClientProblemsSummary/>
                        </div>
                        <div className="ClientDashboard-AllergiesSummary ClientDashboard-Section">
                            <ClientAllergiesSummary/>
                        </div>*/}
                        {isDetailsEditorOpen && (
                            <ClientEditor
                                isOpen
                                clientId={this.clientId}
                                onClose={this.onCloseDetailsEditor}
                                onSaveSuccess={this.onSaveDetailsSuccess}
                            />
                        )}
                        {isCancelEditDetailsConfirmDialogOpen && (
                            <ConfirmDialog
                                isOpen
                                icon={Warning}
                                confirmBtnText='OK'
                                title='The updates will not be saved'
                                onConfirm={() => {
                                    this.onCloseDetailsEditor()
                                }}
                                onCancel={this.onCloseCancelEditDetailsConfirmDialog}
                            />
                        )}
                        {isSaveDetailsSuccessDialogOpen && (
                            <SuccessDialog
                                isOpen
                                title="The client record has been updated."
                                buttons={[
                                    {
                                        text: 'Close',
                                        color: 'success',
                                        onClick: () => {
                                            this.refresh()
                                            this.onCloseDetailsEditor()
                                        }
                                    }
                                ]}
                            />
                        )}
                    </div>
                </>
            )
        }

        const userId = this.props.user.id

        return (
            <DocumentTitle title="Simply Connect | Clients | Client Dashboard">
                <div className="ClientDashboard">
                    <LoadCanAddServicePlanAction
                        shouldPerform={() => !!userId}
                        params={{ userId }}
                    />
                    <LoadClientElementCountsAction
                        params={{ clientId }}
                        onPerformed={this.onUpdateSideBar}
                    />
                    {content}
                </div>
            </DocumentTitle>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientDashboard)