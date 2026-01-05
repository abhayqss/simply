import React, { Component } from 'react'

import cn from 'classnames'
import { find } from 'underscore'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import fileDownload from 'js-file-download'

import {
    Badge,
    Button,
    UncontrolledTooltip as Tooltip
} from 'reactstrap'

import DocumentTitle from 'react-document-title'

import './ServicePlans.scss'

import Table from 'components/Table/Table'
import Actions from 'components/Table/Actions/Actions'
import SearchField from 'components/SearchField/SearchField'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import ErrorDialog from 'components/dialogs/ErrorDialog/ErrorDialog'
import ConfirmDialog from 'components/dialogs/ConfirmDialog/ConfirmDialog'
import SuccessDialog from 'components/dialogs/SuccessDialog/SuccessDialog'

import LoadClientDetailsAction from 'actions/clients/LoadClientDetailsAction'
import LoadCanAddServicePlanAction from 'actions/clients/LoadCanAddServicePlanAction'
import LoadClientElementCountsAction from 'actions/clients/LoadClientElementCountsAction'

import * as sideBarActions from 'redux/sidebar/sideBarActions'
import * as servicePlanListActions from 'redux/client/servicePlan/list/servicePlanListActions'
import * as servicePlanFormActions from 'redux/client/servicePlan/form/servicePlanFormActions'

import { PAGINATION } from 'lib/Constants'
import { Response } from 'lib/utils/AjaxUtils'
import { isEmpty, pickAs, DateUtils } from 'lib/utils/Utils'

import { ReactComponent as Warning } from 'images/alert-yellow.svg'

import { getSideBarItems } from '../../SideBarItems'

import ServicePlanFilter from './ServicePlanFilter/ServicePlanFilter'
import ServicePlanEditor from './ServicePlanEditor/ServicePlanEditor'
import ServicePlanViewer from './ServicePlanViewer/ServicePlanViewer'

const { FIRST_PAGE } = PAGINATION

const { format, formats } = DateUtils

const ICON_SIZE = 36;
const DATE_FORMAT = formats.americanMediumDate

const STATUS_COLORS = {
    IN_DEVELOPMENT: '#d5f3b8',
    SHARED_WITH_CLIENT: '#ffedc2',
}

function mapStateToProps(state) {
    const {
        details,
        assessment,
        servicePlan,
    } = state.client

    return {
        error: servicePlan.list.error,
        isFetching: servicePlan.list.isFetching,
        dataSource: servicePlan.list.dataSource,
        shouldReload: servicePlan.list.shouldReload,

        details: details.data,

        count: servicePlan.count.value,
        assessmentCount: assessment.count.value,
        servicePlanCount: servicePlan.count.value,
        user: state.auth.login.user.data,
        canAdd: servicePlan.can.add.value
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            ...bindActionCreators(servicePlanListActions, dispatch),
            form: bindActionCreators(servicePlanFormActions, dispatch),
            sidebar: bindActionCreators(sideBarActions, dispatch)
        }
    }
}

class ServicePlans extends Component {

    state = {
        selected: null,
        selectedArchived: null,
        selectedNeed: null,
        selectedIndex: null,
        selectedNeedIndex: null,

        isEditorOpen: false,
        isViewerOpen: false,
        isArchiveViewerOpen: false,

        isCancelDeleteGoalDialogOpen: false,
        isCancelDeleteNeedDialogOpen: false,
        isCancelChangeNeedDialogOpen: false,
        isCancelEditConfirmDialogOpen: false,
        isInDevelopmentErrorDialogOpen: false,

        cancelDeleteNeedDialog: {
            isOpen: false
        }
    }

    componentDidMount() {
        this.refresh()
        this.updateSideBar()

        const {
            state
        } = this.props.location

        if (state) {
            this.setState({
                isEditorOpen: state.shouldCreate
            })

            this.props
                .history
                .replace('service-plans', {})
        }
    }

    componentDidUpdate() {
        if (this.props.shouldReload) {
            this.refresh()
        }
    }

    onUpdateSideBar = () => {
        this.updateSideBar()
    }

    onRefresh = (page) => {
        this.refresh(page)
    }

    onAdd = () => {
        this.isAnyInDevelopment()
            .then(Response(isTrue => {
                this.setState({
                    isEditorOpen: !isTrue,
                    isInDevelopmentErrorDialogOpen: isTrue
                })
            }))
    }

    onEdit = servicePlan => {
        this.setState({
            isEditorOpen: true,
            selected: servicePlan
        })
    }

    onCloseCancelEditConfirmDialog = () => {
        this.setState({
            isCancelEditConfirmDialogOpen: false
        })
    }

    onCloseEditor = (shouldConfirm = false) => {
        this.setState(s => ({
            selected: shouldConfirm ? s.selected : null,
            isEditorOpen: shouldConfirm,
            isSaveSuccessDialogOpen: false,
            isCancelEditConfirmDialogOpen: shouldConfirm
        }))

        !shouldConfirm && this.clearForm()
    }

    onSaveSuccess = (dataHasChanged) => {
        this.refresh()

        this.setState(s => ({
            isEditorOpen: false,
            isSaveSuccessDialogOpen: dataHasChanged,
            selected: null
        }))

        this.loadSidebarCounts()
    }

    onDeleteGoal = (needIndex, index, shouldConfirm) => {
        if (shouldConfirm) {
            this.setState({
                selectedIndex: index,
                selectedNeedIndex: needIndex,
                isCancelDeleteGoalDialogOpen: true
            })
        }

        else {
            this.props.actions.form.removeGoal(needIndex, index)
        }
    }

    onConfirmDeleteGoalDialog = () => {
        const {
            selectedIndex,
            selectedNeedIndex
        } = this.state

        const { actions } = this.props

        actions.form.removeGoal(selectedNeedIndex, selectedIndex)

        this.setState({
            selectedIndex: null,
            selectedNeedIndex: null,
            isCancelDeleteGoalDialogOpen: false
        })
    }

    onCloseDeleteGoalDialog = () => {
        this.setState({
            selectedIndex: null,
            selectedNeedIndex: null,
            isCancelDeleteGoalDialogOpen: false
        })
    }

    onDeleteNeed = (needIndex, shouldConfirm, onDeleteNeedWithAnchorTag, isEducationTask) => {
        if (shouldConfirm) {
            this.setState({
                selectedNeedIndex: needIndex,
                isCancelDeleteNeedDialogOpen: true,
                selectedNeed: {
                    onDeleteNeed: onDeleteNeedWithAnchorTag,
                    isEducationTask
                }
            })
        }

        else {
            onDeleteNeedWithAnchorTag(needIndex)
        }
    }

    onDeletePlanNeed = (shouldConfirm, onDelete) => {
        if (shouldConfirm) this.setState({
            cancelDeleteNeedDialog: {
                isOpen: true,
                onConfirm: () => {
                    onDelete()

                    this.setState({
                        cancelDeleteNeedDialog: {
                            isOpen: false
                        }
                    })
                }
            }
        })

        else onDelete()
    }

    onConfirmDeleteNeedDialog = () => {
        const {
            selectedNeed,
            selectedNeedIndex
        } = this.state

        selectedNeed.onDeleteNeed(selectedNeedIndex)

        this.setState({
            selectedNeed: null,
            selectedNeedIndex: null,
            isCancelDeleteNeedDialogOpen: false
        })
    }

    onCloseDeleteNeedDialog = () => {
        this.setState({
            selectedNeed: null,
            selectedNeedIndex: null,
            isCancelDeleteNeedDialogOpen: false
        })
    }

    onChangeNeed = (needIndex, field, value, shouldConfirm, isEducationTask, onRestorePrevOption, onReorderingAnchors) => {
        const { actions } = this.props

        if (shouldConfirm) {
            this.setState({
                selectedNeedIndex: needIndex,
                isCancelChangeNeedDialogOpen: true,
                selectedNeed: { field, value, isEducationTask, onRestorePrevOption, onReorderingAnchors },
            })
        }

        else {
            actions.form.clearNeedFields(needIndex).then(() => {
                actions.form.changeNeedField(needIndex, field, value)

                onReorderingAnchors(needIndex, field, value)
            })
        }
    }

    onConfirmChangeNeedDialog = () => {
        const {
            selectedNeed,
            selectedNeedIndex
        } = this.state

        const { actions } = this.props

        actions.form.clearNeedFields(selectedNeedIndex).then(() => {
            actions.form.changeNeedField(selectedNeedIndex, selectedNeed.field, selectedNeed.value)

            selectedNeed.onReorderingAnchors(selectedNeedIndex, selectedNeed.field, selectedNeed.value)
        })

        this.setState({
            selectedNeed: null,
            selectedNeedIndex: null,
            isCancelChangeNeedDialogOpen: false
        })
    }

    onCloseChangeNeedDialog = () => {
        const {
            selectedNeed,
        } = this.state

        selectedNeed.onRestorePrevOption()

        this.setState({
            selectedNeed: null,
            selectedNeedIndex: null,
            isCancelChangeNeedDialogOpen: false
        })
    }

    onSaveSuccessDialogClose = () => {
        this.setState({
            isSaveSuccessDialogOpen: false,
        })
    }

    downloadPDF(blob, clientName, dateCompleted) {
        const brokenDate = format(dateCompleted, DATE_FORMAT).split('/')

        fileDownload(blob,
            `Client Service Plan for ${clientName} ${brokenDate[0]}-${brokenDate[1]}-${brokenDate[2]}.pdf`,
            'application/pdf',
            'a'
        )
    }

    onDownload = ({ id }) => {
        this.actions.download(
            this.clientId, id
        )
    }

    onViewDetails = servicePlan => {
        this.setState({
            isViewerOpen: true,
            selected: servicePlan,
        })
    }

    onViewArchivedDetails = servicePlan => {
        this.setState({
            selectedArchived: servicePlan,
            isArchiveViewerOpen: true,
        })
    }

    onCloseServicePlanViewer = () => {
        this.setState({
            selected: null,
            isViewerOpen: false
        })
    }

    onCloseArchivedServicePlanViewer = () => {
        this.setState({
            selectedArchived: null,
            isArchiveViewerOpen: false,
        })
    }

    onSort = (field, order) => {
        this.sort(field, order)
    }

    get actions() {
        return this.props.actions
    }

    get clientId() {
        return +this.props.match.params.clientId
    }

    get error() {
        return this.props.error
    }

    updateSideBar() {
        this.props.actions.sidebar.update({
            isHidden: false,
            items: getSideBarItems({
                clientId: this.clientId,
                ...pickAs(
                    this.props,
                    'eventCount',
                    'documentCount',
                    'assessmentCount',
                    { count: 'servicePlanCount' }
                )
            })
        })
    }

    update(isReload, page) {
        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = this.props

        if (isReload
            || shouldReload
            || (!isFetching && isEmpty(ds.data))) {
            const { field, order } = ds.sorting
            const { page: p, size } = ds.pagination

            this.actions.load({
                size,
                page: page || p,
                ...ds.filter.toJS(),
                clientId: this.clientId,
                sort: `${field},${order}`,
            })
        }
    }

    sort(field, order, shouldReload) {
        this.actions.sort(
            field, order, shouldReload
        )
    }

    refresh(page) {
        this.update(true, page || FIRST_PAGE)
    }

    isAnyInDevelopment() {
        return this.actions.isAnyInDevelopment(
            this.clientId
        )
    }

    render() {
        const {
            selected,
            selectedArchived,
            selectedNeed,
            isEditorOpen,
            isViewerOpen,
            isArchiveViewerOpen,
            isCancelDeleteGoalDialogOpen,
            isCancelDeleteNeedDialogOpen,
            isCancelChangeNeedDialogOpen,
            isCancelEditConfirmDialogOpen,
            isInDevelopmentErrorDialogOpen,
            isSaveSuccessDialogOpen,
        } = this.state

        const {
            user,
            canAdd,
            details,
            className,
            isFetching,
            dataSource: ds
        } = this.props

        const clientId = this.clientId
        const userId = user.id

        return (
            <DocumentTitle
                title="Simply Connect | Clients List | Client Record | Service Plans">
                <div className={cn('ServicePlans', className)}>
                    <LoadCanAddServicePlanAction
                        shouldPerform={() => !!userId}
                        params={{ userId }}
                    />
                    <LoadClientDetailsAction params={{ clientId }}/>
                    <LoadClientElementCountsAction
                        isMultiple
                        params={{ clientId, isFetching }}
                        onPerformed={this.onUpdateSideBar}
                        shouldPerform={prevParams => isFetching && !prevParams.isFetching}
                    />
                    <Breadcrumbs items={[
                        { title: 'Clients', href: '/clients', isEnabled: true },
                        {
                            title: details ? (details.firstName + ' ' + details.lastName) : '',
                            href: '/clients/' + clientId,
                        },
                        {
                            title: 'Service Plans',
                            href: `clients/${clientId || 1}/service-plans`,
                            isActive: true
                        }
                    ]}/>
                    <Table
                        hasHover
                        hasOptions
                        hasPagination
                        keyField='id'
                        title='Service Plans'
                        noDataText={ds.filter.searchText
                            ? 'No results.'
                            : 'No service plans.'
                        }
                        isLoading={isFetching}
                        className='ServicePlanList'
                        containerClass='ServicePlanListContainer'
                        data={ds.data}
                        pagination={ds.pagination}
                        columns={[
                            {
                                dataField: 'number',
                                text: '#',
                                headerStyle: {
                                    width: '84px',
                                },
                                formatter: (v, row, rowIndex) => (
                                    <span
                                        className="ServicePlanList-ServicePlanNumber"
                                        onClick={() => this.onViewDetails(row)}>
                                            {((ds.pagination.page - 1) * ds.pagination.size) + (rowIndex + 1)}
                                        </span>
                                ),
                            },
                            {
                                dataField: 'servicePlanStatus',
                                text: 'Status',
                                sort: true,
                                headerStyle: {
                                    width: '190px',
                                },
                                onSort: this.onSort,
                                formatter: (v, row) => (
                                    <>
                                        <span
                                            id={'service-plan' + row.id}
                                            style={{ backgroundColor: STATUS_COLORS[row.status.name] }}
                                            className="ServicePlanList-Status"
                                            onClick={() => this.onViewDetails(row)}>
                                                {row.status.title}
                                            </span>
                                        <Tooltip
                                            placement="top"
                                            target={'service-plan' + row.id}>
                                            View service plan
                                        </Tooltip>
                                    </>
                                ),
                            },
                            {
                                dataField: 'dateCreated',
                                text: 'Date Started',
                                sort: true,
                                align: 'right',
                                headerAlign: 'right',
                                headerStyle: {
                                    width: '166px',
                                },
                                onSort: this.onSort,
                                formatter: v => v && format(v, DATE_FORMAT)
                            },
                            {
                                dataField: 'dateCompleted',
                                text: 'Date Completed',
                                sort: true,
                                align: 'right',
                                headerAlign: 'right',
                                headerStyle: {
                                    width: '180px',
                                },
                                onSort: this.onSort,
                                formatter: v => v && format(v, DATE_FORMAT)
                            },
                            {
                                dataField: 'scoring.totalScore',
                                text: 'Scoring',
                                sort: true,
                                align: 'right',
                                headerAlign: 'right',
                                headerStyle: {
                                    width: '130px',
                                },
                                onSort: this.onSort,
                                formatter: (v, row) => row.scoring
                            },
                            {
                                dataField: 'employee.firstName',
                                text: 'Author',
                                sort: true,
                                headerStyle: {
                                    width: '190px',
                                },
                                onSort: this.onSort,
                                formatter: (v, row) => row.author
                            },
                            {
                                dataField: '',
                                text: '',
                                headerStyle: {
                                    width: '141px',
                                },
                                align: 'right',
                                formatter: (v, row) => {
                                    return (
                                        <Actions
                                            data={row}
                                            hasEditAction={row.canEdit}
                                            hasDownloadAction
                                            iconSize={ICON_SIZE}
                                            editHintMessage="Edit service plan"
                                            downloadHintMessage="Download pdf file"
                                            onEdit={this.onEdit}
                                            onDownload={this.onDownload}
                                        />
                                    )
                                }
                            }
                        ]}
                        renderCaption={title => {
                            return (
                                <div className='ServicePlanList-Caption'>
                                    <div className='flex-1'>
                                            <span className="ServicePlanList-TitleWrapper">
                                                <span className='ServicePlanList-Title'>
                                                    {title}
                                                </span>
                                                <span className="ServicePlanList-ClientName">
                                                     {details && (' / ' +
                                                         details.firstName + ' ' + details.lastName
                                                     )}
                                                </span>
                                            </span>
                                        {ds.pagination.totalCount ? (
                                            <Badge color='warning' className='ServicePlanList-ServicePlanCount'>
                                                {ds.pagination.totalCount}
                                            </Badge>
                                        ) : null}
                                        <ServicePlanFilter/>
                                    </div>
                                    <div className='flex-1 text-right'>
                                        {canAdd && (
                                            <Button
                                                color='success'
                                                className='AddServicePlanBtn'
                                                onClick={this.onAdd}>
                                                Add new plan
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )
                        }}
                        onRefresh={this.onRefresh}
                    />
                    {isEditorOpen && (
                        <ServicePlanEditor
                            isOpen
                            planId={selected && selected.id}
                            onClose={this.onCloseEditor}
                            onDeleteGoal={this.onDeleteGoal}
                            onDeleteNeed={this.onDeleteNeed}
                            onChangeNeed={this.onChangeNeed}
                            onSaveSuccess={this.onSaveSuccess}
                        />
                    )}
                    {isCancelEditConfirmDialogOpen && (
                        <ConfirmDialog
                            isOpen
                            icon={Warning}
                            confirmBtnText='OK'
                            title='The updates will not be saved'
                            onConfirm={this.onCloseEditor}
                            onCancel={this.onCloseCancelEditConfirmDialog}
                        />
                    )}
                    {isViewerOpen && (
                        <ServicePlanViewer
                            isOpen
                            clientId={clientId}
                            servicePlanId={selected && selected.id}
                            onViewDetails={this.onViewArchivedDetails}
                            onClose={this.onCloseServicePlanViewer}
                        />
                    )}
                    {isArchiveViewerOpen && (
                        <ServicePlanViewer
                            isOpen
                            isServicePlanArchived
                            clientId={clientId}
                            servicePlanId={selectedArchived && selectedArchived.id}
                            onClose={this.onCloseArchivedServicePlanViewer}
                        />
                    )}
                    {isCancelDeleteGoalDialogOpen && (
                        <ConfirmDialog
                            isOpen
                            icon={Warning}
                            confirmBtnText='Delete'
                            title="Goal with the corresponding fields will be deleted"
                            onConfirm={this.onConfirmDeleteGoalDialog}
                            onCancel={this.onCloseDeleteGoalDialog}
                        />
                    )}
                    {isCancelDeleteNeedDialogOpen && (
                        <ConfirmDialog
                            isOpen
                            icon={Warning}
                            confirmBtnText='Delete'
                            title="Need/Opportunity with the corresponding fields will be deleted"
                            onConfirm={this.onConfirmDeleteNeedDialog}
                            onCancel={this.onCloseDeleteNeedDialog}
                        />
                    )}
                    {isCancelChangeNeedDialogOpen && (
                        <ConfirmDialog
                            isOpen
                            icon={Warning}
                            confirmBtnText='OK'
                            title={selectedNeed.isEducationTask
                                ? 'Relevant Activation or Education Task will be deleted'
                                : 'Need/Opportunity with the related goals will be deleted'
                            }
                            onConfirm={this.onConfirmChangeNeedDialog}
                            onCancel={this.onCloseChangeNeedDialog}
                        />
                    )}
                    {isInDevelopmentErrorDialogOpen && (
                        <ErrorDialog
                            isOpen
                            text={`There is an active service plan.
                                You can not create a new one until the active plan is completed.
                                `}
                            buttons={[
                                {
                                    text: 'Close',
                                    onClick: () => {
                                        this.setState({
                                            isInDevelopmentErrorDialogOpen: false
                                        })
                                    }
                                }
                            ]}
                        />
                    )}
                </div>
            </DocumentTitle>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicePlans)