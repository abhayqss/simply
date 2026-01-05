import React, { Component } from 'react'

import { compact } from 'underscore'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DocumentTitle from 'react-document-title'

import { Badge, Button, UncontrolledTooltip as Tooltip } from 'reactstrap'

import './Assessments.scss'

import Table from 'components/Table/Table'
import Actions from 'components/Table/Actions/Actions'
import SearchField from 'components/SearchField/SearchField'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import ErrorViewer from 'components/ErrorViewer/ErrorViewer'
import SuccessDialog from 'components/dialogs/SuccessDialog/SuccessDialog'
import ConfirmDialog from 'components/dialogs/ConfirmDialog/ConfirmDialog'

import LoadClientDetailsAction from 'actions/clients/LoadClientDetailsAction'
import LoadAssessmentTypesAction from 'actions/directory/LoadAssessmentTypesAction'
import LoadClientElementCountsAction from 'actions/clients/LoadClientElementCountsAction'

import * as sideBarActions from 'redux/sidebar/sideBarActions'
import * as assessmentListActions from 'redux/client/assessment/list/assessmentListActions'

import AssessmentViewer from './AssessmentViewer/AssessmentViewer'
import AssessmentEditor from '../../Clients/Assessments/AssessmentEditor/AssessmentEditor'

import {
    PAGINATION,
    ASSESSMENT_TYPES,
    SERVER_ERROR_CODES
} from 'lib/Constants'

import { isEmpty, DateUtils } from 'lib/utils/Utils'

import { ReactComponent as Warning } from 'images/alert-yellow.svg'

import { getSideBarItems } from '../../SideBarItems'

const { FIRST_PAGE } = PAGINATION

const { format, formats } = DateUtils

const ICON_SIZE = 36;
const DEFAULT_TITLE_WIDTH = 200
const DATE_FORMAT = formats.americanMediumDate

const { GAD7, PHQ9, COMPREHENSIVE } = ASSESSMENT_TYPES

const STATUS_COLORS = {
    INACTIVE: '#e0e0e0',
    COMPLETED: '#d1ebfe',
    IN_PROCESS: '#d5f3b8'
}

function isIgnoredError (e = {}) {
    return e.code === SERVER_ERROR_CODES.ACCOUNT_INACTIVE
}

function mapStateToProps (state) {
    const {
        document,
        assessment,
        servicePlan,
    } = state.client

    return {
        error: assessment.list.error,
        isFetching: assessment.list.isFetching,
        dataSource: assessment.list.dataSource,
        shouldReload: assessment.list.shouldReload,

        client: state.client,

        count: assessment.count.value,
        documentCount: document.count.value,
        servicePlanCount: servicePlan.count.value,
        eventCount: state.event.note.composed.count.value,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(assessmentListActions, dispatch),
            sidebar: bindActionCreators(sideBarActions, dispatch)
        }
    }
}

class Assessments extends Component {

    state = {
        selected: null,
        selectedArchived: null,

        isEditorOpen: false,
        isViewerOpen: false,
        isArchiveViewerOpen: false,

        isSaveSuccessDialogOpen: false,
        isChangeActivitySuccessDialogOpen: false,

        isEditCancelConfirmDialogOpen: false,
        isCompleteSuccessDialogOpen: false,

        titleWidth: DEFAULT_TITLE_WIDTH
    }

    title = React.createRef()

    componentDidMount () {
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
                .replace('assessments', {})
        }
    }

    componentDidUpdate () {
        const {
            shouldReload
        } = this.props

        if (shouldReload) this.refresh()

        const {
            offsetWidth: titleWidth = DEFAULT_TITLE_WIDTH
        } = this.title.current || {}

        if (this.state.titleWidth !== titleWidth) {
            this.setState({ titleWidth })
        }
    }

    onResetError = () => {
        this.actions.clearError()
    }

    onRefresh = (page) => {
        this.refresh(page)
    }

    onSort = (field, order) => {
        this.sort(field, order)
    }

    onChangeFilterField = (name, value) => {
        this.changeFilter({ [name]: value })
    }

    onAdd = () => {
        this.setState({ isEditorOpen: true })
    }

    onEdit = (assessment) => {
        this.setState({
            isEditorOpen: true,
            selected: assessment
        })
    }

    onView = (assessment) => {
        this.setState({
            selected: assessment,
            isViewerOpen: true,
        })
    }

    onViewArchived = (assessment) => {
        this.setState({
            selectedArchived: assessment,
            isArchiveViewerOpen: true,
        })
    }

    onCloseEditor = (shouldConfirm = false) => {
        this.setState({
            isEditorOpen: shouldConfirm,
            isCompleteSuccessDialogOpen: false,
            isEditCancelConfirmDialogOpen: shouldConfirm
        })

        if (!shouldConfirm) {
            this.setState({ selected: null })
        }
    }

    onCloseEditCancelConfirmDialog = () => {
        this.setState({
            isEditCancelConfirmDialogOpen: false
        })
    }

    onCloseViewer = () => {
        this.setState({
            selected: null,
            isViewerOpen: false
        })
    }

    onCloseArchiveViewer = () => {
        this.setState({
            selectedArchived: null,
            isArchiveViewerOpen: false
        })
    }

    onSaveSuccess = (data, shouldClose) => {
        this.refresh().then(() => {
            this.setState({ selected: data })
        })

        shouldClose && this.setState({
            isEditorOpen: false,
            isSaveSuccessDialogOpen: true
        })
    }

    onCompleteSuccess = (data) => {
        this.refresh().then(() => {
            this.setState({ selected: data })
        })

        this.setState({
            isEditorOpen: false,
            isCompleteSuccessDialogOpen: true
        })
    }

    onChangeActivitySuccess = (data, isInactive) => {
        this.refresh().then(() => {
            this.setState({
                selected: { ...data, isInactive },
                isChangeActivitySuccessDialogOpen: true
            })
        })

        this.setState({ isEditorOpen: false })
    }

    onCompleteSave = () => {
        this.setState({
            selected: null,
            isSaveSuccessDialogOpen: false,
            isCompleteSuccessDialogOpen: false,
            isChangeActivitySuccessDialogOpen: false
        })
    }

    onBackToEditor = () => {
        this.setState({
            isEditorOpen: true,
            isSaveSuccessDialogOpen: false,
            isCompleteSuccessDialogOpen: false
        })
    }

    onUpdateSideBar = () => {
        this.updateSideBar()
    }

    get actions () {
        return this.props.actions
    }

    get clientId () {
        return +this.props.match.params.clientId
    }

    get error () {
        return this.props.error
    }

    update (isReload, page) {
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

            return this.actions.load({
                size,
                page: page || p,
                ...ds.filter.toJS(),
                clientId: this.clientId,
                ...field && {sort: `${field},${order}`}
            })
        }
    }

    sort (field, order) {
        this.actions.sort(field, order)
    }

    refresh (page) {
        return this.update(true, page || FIRST_PAGE)
    }

    clear () {
        this.actions.clear()
    }

    changeFilter (changes, shouldReload) {
        this.actions.changeFilter(
            changes, shouldReload
        )
    }

    updateSideBar () {
        this.actions.sidebar.update({
            isHidden: false,
            items: this.getSideBarItems()
        })
    }

    getSideBarItems () {
        const {
            match,
            count,
            eventCount,
            documentCount,
            servicePlanCount,
        } = this.props

        const { clientId } = match.params

        return getSideBarItems({
            clientId,
            eventCount,
            documentCount,
            servicePlanCount,
            assessmentCount: count,
        })
    }

    render () {
        const {
            client,
            isFetching,
            dataSource: ds
        } = this.props

        const {
            selected,
            selectedArchived,

            titleWidth,

            isEditorOpen,
            isViewerOpen,
            isArchiveViewerOpen,

            isSaveSuccessDialogOpen,
            isChangeActivitySuccessDialogOpen,

            isEditCancelConfirmDialogOpen,
            isCompleteSuccessDialogOpen
        } = this.state;

        const {
            fullName
        } = client.details.data || {}

        const clientId = this.clientId

        return (
            <DocumentTitle
                title={`Simply Connect | Clients | ${fullName} | Assessments`}>
                <div className="Assessments">
                    <LoadClientDetailsAction params={{ clientId }} />
                    <LoadAssessmentTypesAction
                        params={{ clientId, types: [GAD7, PHQ9, COMPREHENSIVE] }}
                    />
                    <LoadClientElementCountsAction
                        isMultiple
                        params={{ clientId, isFetching }}
                        onPerformed={this.onUpdateSideBar}
                        shouldPerform={prevParams => isFetching && !prevParams.isFetching}
                    />
                    <Breadcrumbs items={compact([
                        { title: 'Clients', href: '/clients', isEnabled: true },
                        client.details.data && { title: `${fullName}`, href: `/clients/${clientId || 1}` },
                        client.details.data && {
                            title: 'Assessments',
                            href: `/clients/${clientId || 1}/assessments`,
                            isActive: true
                        }
                    ])}/>
                    <Table
                        hasHover
                        hasOptions
                        hasPagination
                        keyField='id'
                        title='Assessments'
                        isLoading={isFetching}
                        className='AssessmentList'
                        containerClass='AssessmentListContainer'
                        data={ds.data}
                        pagination={ds.pagination}
                        columns={[
                            {
                                dataField: 'typeTitle',
                                text: 'Assessment',
                                sort: true,
                                headerStyle: {
                                    width: '265px'
                                },
                                onSort: this.onSort,
                                formatter: (v, row) => {
                                    return (
                                        <>
                                            <span
                                                id={`assessment-${row.id}`}
                                                className='AssessmentList-AssessmentName'
                                                onClick={() => this.onView(row)}>
                                                {v}
                                            </span>
                                            <Tooltip
                                                className='AssessmentList-Tooltip'
                                                placement="top"
                                                target={`assessment-${row.id}`}>
                                                View assessment
                                            </Tooltip>
                                        </>
                                    )
                                }
                            },
                            {
                                dataField: 'status',
                                text: 'Status',
                                sort: true,
                                align: 'left',
                                headerAlign: 'left',
                                headerStyle: {
                                    width: '100px',
                                },
                                onSort: this.onSort,
                                formatter: (v, row) => {
                                    return (
                                        <span
                                            style={{ backgroundColor: STATUS_COLORS[row.status.name] }}
                                            className='AssessmentList-AssessmentStatus'>
                                       {row.status.title}
                                    </span>
                                    )
                                }
                            },
                            {
                                dataField: 'dateStarted',
                                text: 'Date Started',
                                sort: true,
                                align: 'right',
                                headerAlign: 'right',
                                headerStyle: {
                                    width: '135px',
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
                                    width: '149px',
                                },
                                onSort: this.onSort,
                                formatter: v => v && format(v, DATE_FORMAT)
                            },
                            {
                                dataField: 'author',
                                text: 'Author',
                                sort: true,
                                align: 'left',
                                headerAlign: 'left',
                                onSort: this.onSort,
                                headerStyle: {
                                    width: '200px',
                                }
                            },
                            {
                                dataField: '',
                                text: '',
                                headerStyle: {
                                    width: '80px',
                                },
                                align: 'right',
                                formatter: (v, row) => {
                                    return (
                                        <Actions
                                            data={row}
                                            hasEditAction
                                            iconSize={ICON_SIZE}
                                            editHintMessage="Edit assessment"
                                            onEdit={this.onEdit}
                                        />
                                    )
                                }
                            }
                        ]}
                        noDataText="No assessments"
                        renderCaption={title => {
                            return (
                                <div className='AssessmentList-Caption'>
                                    <div className='flex-1'>
                                        <div ref={this.title} className='AssessmentList-Title Table-Title'>
                                            <div>
                                                <span>{title}</span><span
                                                className='AssessmentList-ClientName'> / {fullName}</span>
                                            </div>
                                            {(ds.pagination.totalCount > 0) && (
                                                <Badge
                                                    color="warning"
                                                    style={{ left: titleWidth + 8 }}
                                                    className="Assessments-Count">
                                                    {ds.pagination.totalCount}
                                                </Badge>
                                            )}
                                        </div>
                                        <div className='AssessmentList-Filter'>
                                            <SearchField
                                                name='name'
                                                value={ds.filter.name}
                                                className='AssessmentList-FilterField'
                                                placeholder='Search'
                                                onChange={this.onChangeFilterField}
                                                onClear={this.onChangeFilterField}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex-1 text-right'>
                                        <Button
                                            color='success'
                                            className='AddAssessmentBtn'
                                            title="Add new assessment"
                                            onClick={this.onAdd}>
                                            Add new assessment
                                        </Button>
                                    </div>
                                </div>
                            )
                        }}
                        onRefresh={this.onRefresh}
                    />
                    {isViewerOpen && (
                        <AssessmentViewer
                            isOpen
                            assessmentId={selected && selected.id}
                            assessmentTypeId={selected && selected.typeId}
                            onView={this.onViewArchived}
                            onClose={this.onCloseViewer}
                        />
                    )}
                    {isArchiveViewerOpen && (
                        <AssessmentViewer
                            isOpen
                            isAssessmentArchived
                            assessmentId={selectedArchived && selectedArchived.id}
                            assessmentTypeId={selectedArchived && selectedArchived.typeId}
                            onClose={this.onCloseArchiveViewer}
                        />
                    )}
                    {isEditorOpen && (
                        <AssessmentEditor
                            isOpen
                            assessmentId={selected && selected.id}
                            onClose={this.onCloseEditor}
                            onSaveSuccess={this.onSaveSuccess}
                            onCompleteSuccess={this.onCompleteSuccess}
                            onChangeActivitySuccess={this.onChangeActivitySuccess}
                        />
                    )}
                    {isEditCancelConfirmDialogOpen && (
                        <ConfirmDialog
                            isOpen
                            icon={Warning}
                            confirmBtnText='OK'
                            title='The updates will not be saved'
                            onConfirm={this.onCloseEditor}
                            onCancel={this.onCloseEditCancelConfirmDialog}
                        />
                    )}
                    {isCompleteSuccessDialogOpen && (
                        <SuccessDialog
                            isOpen
                            title="The assessment has been completed."
                            buttons={[
                                {
                                    outline: true,
                                    text: 'Close',
                                    className: 'min-width-170',
                                    onClick: this.onCompleteSave
                                },
                                {
                                    text: 'Back to assessment',
                                    className: 'min-width-170',
                                    onClick: this.onBackToEditor
                                }
                            ]}
                        />
                    )}
                    {isSaveSuccessDialogOpen && selected && (
                        selected.typeName === COMPREHENSIVE ? (
                            <SuccessDialog
                                isOpen
                                title="The updates have been saved"
                                buttons={[
                                    {
                                        outline: true,
                                        text: 'Close',
                                        className: 'min-width-170',
                                        onClick: this.onCompleteSave
                                    },
                                    {
                                        text: 'Back to assessment',
                                        className: 'min-width-170',
                                        onClick: this.onBackToEditor
                                    }
                                ]}
                            />
                        ) : (
                            <SuccessDialog
                                isOpen
                                title="The assessment has been completed"
                                buttons={[
                                    {
                                        text: 'OK',
                                        onClick: this.onCompleteSave
                                    }
                                ]}
                            />
                        )
                    )}
                    {isChangeActivitySuccessDialogOpen && selected && (
                        <SuccessDialog
                            isOpen
                            title={selected.isInactive ?
                                'The assessment has been marked as inactive'
                                : 'The assessment is in process'}
                            buttons={[
                                {
                                    text: 'Ok',
                                    onClick: this.onCompleteSave
                                }
                            ]}
                        />
                    )}
                    {this.error && !isIgnoredError(this.error) && (
                        <ErrorViewer
                            isOpen
                            error={this.error}
                            onClose={this.onResetError}
                        />
                    )}
                </div>
            </DocumentTitle>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assessments)