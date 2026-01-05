import React, { Component } from 'react'

import cn from 'classnames'

import {
    map,
    each,
    without,
    flatten
} from 'underscore'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, Redirect } from 'react-router-dom'

import { Image } from 'react-bootstrap'
import DocumentTitle from 'react-document-title'

import {
    Badge,
    Button,
    Collapse,
    UncontrolledTooltip as Tooltip
} from 'reactstrap'

import Table from 'components/Table/Table'
import Avatar from 'components/Avatar/Avatar'
import Actions from 'components/Table/Actions/Actions'
import ErrorViewer from 'components/ErrorViewer/ErrorViewer'
import ConfirmDialog from 'components/dialogs/ConfirmDialog/ConfirmDialog'
import SuccessDialog from 'components/dialogs/SuccessDialog/SuccessDialog'

import './Clients.scss'

import ClientFilter from './ClientFilter/ClientFilter'
import ClientEditor from './ClientEditor/ClientEditor'
import ClientMatches from './ClientMatches/ClientMatches'
import ClientPrimaryFilter from './ClientPrimaryFilter/ClientPrimaryFilter'

import * as sideBarActions from 'redux/sidebar/sideBarActions'
import * as clientListActions from 'redux/client/list/clientListActions'
import * as clientFormActions from 'redux/client/form/clientFormActions'
import * as clientCountActions from 'redux/client/count/clientCountActions'
import * as clientAvatarActions from 'redux/client/avatar/clientAvatarActions'
import * as clientDetailsActions from 'redux/client/details/clientDetailsActions'

import { path } from 'lib/utils/ContextUtils'
import { Response } from 'lib/utils/AjaxUtils'

import {
    isEmpty,
    DateUtils as DU
} from 'lib/utils/Utils'

import {
    PAGINATION,
    SERVER_ERROR_CODES
} from 'lib/Constants'

import { ReactComponent as Asset } from 'images/asset.svg'
import { ReactComponent as Delete } from 'images/delete.svg'
import { ReactComponent as Filter } from 'images/filters.svg'
import { ReactComponent as Warning } from 'images/alert-yellow.svg'

const { FIRST_PAGE } = PAGINATION

const { format, formats } = DU

const ACTION_ICON_SIZE = 36

const DATE_FORMAT = formats.americanMediumDate

const MODES = [
    { text: 'All Clients', value: 0, isSelected: true },
    { text: 'My Caseloads', value: 1 },
    { text: 'Unassigned', value: 2 }
]

function isIgnoredError (e = {}) {
    return e.code === SERVER_ERROR_CODES.ACCOUNT_INACTIVE
}

function mapStateToProps (state) {
    return {
        auth: state.auth,
        sidebar: state.sidebar,

        error: state.client.list.error,
        isFetching: state.client.list.isFetching,
        dataSource: state.client.list.dataSource,
        shouldReload: state.client.list.shouldReload,

        count: state.client.count,

        form: state.client.form,

        community: state.client.community,

        directory: state.directory
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(clientListActions, dispatch),

            form: bindActionCreators(clientFormActions, dispatch),

            count: bindActionCreators(clientCountActions, dispatch),

            sidebar: bindActionCreators(sideBarActions, dispatch),

            avatar: bindActionCreators(clientAvatarActions, dispatch),

            details: bindActionCreators(clientDetailsActions, dispatch)
        }
    }
}

class Clients extends Component {
    state = {
        selected: null,
        selectedOption: 0,
        isEditorOpen: false,
        shouldOpenDetails: false,
        isCaseloadEditorOpen: false,
        isFilterOpen: false,
        isSaveSuccessDialogOpen: false,
        isClientMatchesOpen: false,
        isCancelEditConfirmDialogOpen: false,
        shouldRedirectToCareTeam: false
    }

    componentDidMount () {
        this.updateSideBar()
    }

    componentDidUpdate (prevProps) {
        if (this.props.shouldReload) {
            this.refresh()
        }
    }

    onRefresh = page => {
        this.refresh(page)
    }

    onAdd = () => {
        this.setState({
            selected: null,
            isEditorOpen: true,
        })
    }

    onEdit = client => {
        this.setState({
            selected: client,
            isEditorOpen: true,
        })
    }

    onCloseCancelEditConfirmDialog = () => {
        this.setState({
            isCancelEditConfirmDialogOpen: false
        })
    }

    onCloseEditor = (shouldConfirm = false) => {
        this.setState(s => ({
            isEditorOpen: shouldConfirm,
            isSaveSuccessDialogOpen: false,
            isCancelEditConfirmDialogOpen: shouldConfirm,
            selected: shouldConfirm ? s.selected : null,
        }))
    }

    onSaveSuccess = (id, isNew) => {
        this.refresh(isNew ? FIRST_PAGE : (
            this.props.dataSource.pagination.page
        ))

        this.loadDetails(id, false)
            .then(Response(({ data }) => {
                this.setState({
                    isEditorOpen: false,
                    isSaveSuccessDialogOpen: true,
                    selected: { ...data, isNew }
                })
            }))
    }

    onCloseSaveSuccessDialog = (shouldOpenDetails = false) => {
        this.setState({
            shouldOpenDetails,
            isSaveSuccessDialogOpen: false
        })
    }

    onCloseClientMatches = () => {
        this.setState({
            selected: null,
            isClientMatchesOpen: false
        })
    }

    onClickFilter = () => {
        this.setState(s => ({ isFilterOpen: !s.isFilterOpen }))
    }

    onClearFilter = () => {
        this.actions.clearFilter()
    }

    onApplyFilter = () => {
        this.refresh()
    }

    onSort = (field, order) => {
        this.actions.sort(field, order)
    }

    onChangeMode = mode => {
        let options = map(MODES, o => (
            o.value === mode
                ? { ...o, isSelected: true }
                : { ...o, isSelected: false }
        ))

        this.setState({
            options,
            selectedOption: mode,
        })
    }

    onConfigureClient = client => {
        alert('Coming soon!')
    }

    onResetError = () => {
        this.actions.clearError()
        this.actions.form.clearError()
    }

    get actions () {
        return this.props.actions
    }

    get error () {
        const {
            error, form
        } = this.props

        return error || form.error
    }

    updateSideBar () {
        this.actions.sidebar.update({
            isHidden: true
        })
    }

    update (isReload, page) {
        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = this.props

        if (isReload || shouldReload || (!isFetching && isEmpty(ds.data))) {
            const { field, order } = ds.sorting
            const { page: p, size } = ds.pagination

            this.actions.load({
                size,
                page: page || p,
                filter: ds.filter.toJS(),
                sort: `${field},${order}`
            }).then(Response(({ data }) => {
                each(data, o => {
                    if (o.avatarId) {
                        this.loadAvatar(o.id, o.avatarId)
                    }
                })
            }))
        }
    }

    refresh (page) {
        this.update(true, page || FIRST_PAGE)
    }

    clear () {
        this.actions.clear()
    }

    changeFilter (changes, shouldReload) {
        this.actions.changeFilter(
            changes, shouldReload
        )
    }

    loadDetails (clientId, shouldNotSave) {
        return this.actions.details.load(
            clientId, shouldNotSave
        )
    }

    loadAvatar (clientId, avatarId) {
        this.actions.avatar.download({
            clientId, avatarId
        })
    }

    render () {
        const {
            className,
            isFetching,
            dataSource: ds
        } = this.props

        const {
            selected,
            isEditorOpen,
            isFilterOpen,

            shouldOpenDetails,
            shouldRedirectToCareTeam,

            isSaveSuccessDialogOpen,
            isCancelEditConfirmDialogOpen
        } = this.state

        if (shouldOpenDetails) {
            return (
                <Redirect to={path(`clients/${selected.id}`)}/>
            )
        }

        if (shouldRedirectToCareTeam) {
            return (
                <Redirect to={path(`clients/${selected.id}/care-team`)}/>
            )
        }

        return (
            <DocumentTitle title="Simply Connect | Clients">
                <div className={cn('Clients', className)}>
                    <ClientPrimaryFilter/>
                    <Table
                        hasHover
                        hasOptions
                        hasPagination
                        keyField="id"
                        title="Clients"
                        noDataText={isFilterOpen ? "No results." : "No records found"}
                        isLoading={isFetching}
                        className="ClientList"
                        containerClass="ClientListContainer"
                        data={ds.data}
                        expandRow={{
                            onlyOneExpanding: true,
                            showExpandColumn: true,
                            expandColumnPosition: 'right',
                            expandHeaderColumnRenderer: () => null,
                            parentClassName: "ClientList-ExpandableRow",
                            nonExpandable: without(
                                map(ds.data, o => isEmpty(o.merged) && o.id), false
                            ),
                            expandColumnRenderer: ({ expanded, rowKey, expandable }) => {
                                if (expandable) {
                                    return (
                                        <>
                                            {expanded ? (
                                                <Delete
                                                    id={"match-toggle-" + rowKey}
                                                    style={{ stroke: '#ffffff' }}
                                                    className="ClientList-ShowMatchesActionItem"
                                                />
                                            ) : (
                                                <Asset
                                                    id={"match-toggle-" + rowKey}
                                                    className="ClientList-ShowMatchesActionItem"
                                                />
                                            )}
                                            <Tooltip target={"match-toggle-" + rowKey}>
                                                {expanded ? 'Hide Matches' : 'Show Matches'}
                                            </Tooltip>
                                        </>
                                    )
                                }
                            },
                            renderer: row => (
                                <ClientMatches
                                    isOpen
                                    data={row.merged}
                                    onEdit={this.onEdit}
                                />
                            )
                        }}
                        pagination={ds.pagination}
                        columns={[
                            {
                                dataField: 'fullName',
                                text: 'Name',
                                sort: true,
                                headerAlign: 'center',
                                headerStyle: {
                                    width: '200px',
                                },
                                style: (cell, row) => !row.isActive && {
                                    opacity: '0.5'
                                },
                                onSort: this.onSort,
                                formatter: (v, row) => {
                                    return (
                                        <div className="d-flex align-items-center">
                                            {row.avatarDataUrl ? (
                                                <Image
                                                    src={row.avatarDataUrl}
                                                    className={cn(
                                                        'ClientList-ClientAvatar',
                                                        !row.isActive && 'ClientList-ClientAvatar_black-white'
                                                    )}
                                                />
                                            ) : (
                                                <Avatar
                                                    name={v}
                                                    {...!row.isActive && { nameColor: '#e0e0e0' }}
                                                />
                                            )}
                                            {row.canView ? (
                                                <>
                                                    <Link
                                                        id={`client-${row.id}`}
                                                        to={path(`/clients/${row.id}`)}
                                                        className={cn('ClientList-ClientName', row.avatarDataUrl && 'margin-left-10')}>
                                                        {v}
                                                    </Link>
                                                    <Tooltip
                                                        placement="top"
                                                        target={`client-${row.id}`}>
                                                        View client details
                                                    </Tooltip>
                                                </>
                                            ) : (
                                                <span
                                                    title={v}
                                                    id={`client-${row.id}`}
                                                    className='ClientList-ClientName'>
                                                    {v}
                                                </span>
                                            )}
                                        </div>
                                    )
                                }
                            },
                            {
                                dataField: 'gender',
                                text: 'Gender',
                                sort: true,
                                headerStyle: {
                                    width: '85px',
                                },
                                style: (cell, row) => !row.isActive && {
                                    opacity: '0.5'
                                },
                                onSort: this.onSort,
                            },
                            {
                                dataField: 'birthDate',
                                text: 'Date of Birth',
                                sort: true,
                                align: 'right',
                                headerAlign: 'right',
                                headerStyle: {
                                    width: '120px',
                                },
                                style: (cell, row) => !row.isActive && {
                                    opacity: '0.5'
                                },
                                onSort: this.onSort,
                            },
                            {
                                dataField: 'ssnLastFourDigits',
                                text: 'SSN',
                                headerAlign: 'right',
                                align: 'right',
                                headerStyle: {
                                    width: '130px',
                                },
                                style: (cell, row) => !row.isActive && {
                                    opacity: '0.5'
                                },
                                formatter: v => v && `###-##-${v}`
                            },
                            {
                                dataField: 'riskScore',
                                text: 'Risk score',
                                align: 'right',
                                headerAlign: 'right',
                                sort: true,
                                headerStyle: {
                                    width: '105px',
                                },
                                style: (cell, row) => !row.isActive && {
                                    opacity: '0.5'
                                },
                                onSort: this.onSort,
                            },
                            {
                                dataField: 'events',
                                text: 'Events',
                                align: 'right',
                                headerAlign: 'right',
                                sort: true,
                                headerStyle: {
                                    width: '80px',
                                },
                                style: (cell, row) => !row.isActive && {
                                    opacity: '0.5'
                                },
                                onSort: this.onSort,
                            },
                            {
                                dataField: 'community.name',
                                text: 'Community',
                                sort: true,
                                headerStyle: {
                                    width: '230px',
                                },
                                style: (cell, row) => !row.isActive && {
                                    opacity: '0.5'
                                },
                                onSort: this.onSort,
                                formatter: (v, row) => (
                                    <div className="ClientList-Community"
                                         title={row.community}>
                                        {row.community}
                                    </div>
                                )
                            },
                            {
                                dataField: 'createdDate',
                                text: 'Created',
                                sort: true,
                                align: 'right',
                                headerAlign: 'right',
                                headerStyle: {
                                    width: '90px',
                                },
                                style: (cell, row) => !row.isActive && {
                                    opacity: '0.5'
                                },
                                onSort: this.onSort,
                                formatter: v => v && format(v, DATE_FORMAT)
                            },
                            {
                                dataField: '',
                                text: '',
                                headerStyle: {
                                    width: '60px',
                                },
                                align: 'right',
                                formatter: (v, row) => {
                                    return (
                                        <Actions
                                            data={row}
                                            hasEditAction={row.canEdit}
                                            iconSize={ACTION_ICON_SIZE}
                                            editHintMessage="Edit client details"
                                            onEdit={this.onEdit}
                                        />
                                    )
                                }
                            }
                        ]}
                        renderCaption={title => {
                            return (
                                <>
                                    <div className="Clients-Caption">
                                        <div className="flex-2">
                                            <div className="Clients-Title Table-Title">
                                                {title}
                                                {(ds.pagination.totalCount > 0) && (
                                                    <Badge color="warning" className="Clients-Count">
                                                        {ds.pagination.totalCount}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-4 text-right">
                                            <Filter
                                                className={cn(
                                                    'ClientFilter-Icon',
                                                    isFilterOpen
                                                        ? 'ClientFilter-Icon_rotated_90'
                                                        : 'ClientFilter-Icon_rotated_0',
                                                )}
                                                onClick={this.onClickFilter}
                                            />
                                            <Button
                                                color='success'
                                                onClick={this.onAdd}>
                                                Add new client
                                            </Button>
                                        </div>
                                    </div>
                                    <Collapse isOpen={isFilterOpen}>
                                        <ClientFilter/>
                                    </Collapse>
                                </>
                            )
                        }}
                        onRefresh={this.onRefresh}
                    />
                    {isEditorOpen && (
                        <ClientEditor
                            isOpen
                            clientId={selected && selected.id}
                            onClose={this.onCloseEditor}
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
                    {isSaveSuccessDialogOpen && (
                        <SuccessDialog
                            isOpen
                            title={`The client record has been ${
                                selected.isNew ? 'created' : 'updated'}.`
                            }
                            buttons={[
                                {
                                    text: 'Close',
                                    color: 'outline-success',
                                    onClick: () => this.onCloseSaveSuccessDialog()
                                },
                                {
                                    text: 'View record',
                                    onClick: () => this.onCloseSaveSuccessDialog(true)
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

export default connect(mapStateToProps, mapDispatchToProps)(Clients)