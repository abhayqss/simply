import React, { Component } from 'react'

import cn from 'classnames'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, Redirect } from 'react-router-dom'

import DocumentTitle from 'react-document-title'

import {
    Badge,
    Button,
    UncontrolledTooltip as Tooltip
} from 'reactstrap'

import Table from 'components/Table/Table'
import Actions from 'components/Table/Actions/Actions'
import SearchField from 'components/SearchField/SearchField'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import ErrorViewer from 'components/ErrorViewer/ErrorViewer'
import ConfirmDialog from 'components/dialogs/ConfirmDialog/ConfirmDialog'
import SuccessDialog from 'components/dialogs/SuccessDialog/SuccessDialog'

import './Organizations.scss'

import { getSideBarItems } from '../SideBarItems'

import OrganizationEditor from './OrganizationEditor/OrganizationEditor'

import * as sideBarActions from 'redux/sidebar/sideBarActions'

import * as organizationFormActions from 'redux/organization/form/organizationFormActions'
import * as organizationListActions from 'redux/organization/list/organizationListActions'
import * as organizationCountActions from 'redux/organization/count/organizationCountActions'
import * as canAddOrganizationActions from 'redux/organization/can/add/canAddOrganizationActions'

import { PAGINATION, SERVER_ERROR_CODES } from 'lib/Constants'

import { path } from 'lib/utils/ContextUtils'
import { isEmpty, DateUtils } from 'lib/utils/Utils'

import { ReactComponent as Warning } from 'images/alert-yellow.svg'

const { FIRST_PAGE } = PAGINATION

const { format, formats } = DateUtils

const ICON_SIZE = 36;
const DATE_FORMAT = formats.americanMediumDate

function isIgnoredError (e = {}) {
    return e.code === SERVER_ERROR_CODES.ACCOUNT_INACTIVE
}

function mapStateToProps (state) {
    const {
        can,
        list,
        form,
        count
    } = state.organization

    return {
        error: list.error,
        isFetching: list.isFetching,
        dataSource: list.dataSource,
        shouldReload: list.shouldReload,

        can,
        form,
        count,

        auth: state.auth
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(organizationListActions, dispatch),
            form: bindActionCreators(organizationFormActions, dispatch),
            count: bindActionCreators(organizationCountActions, dispatch),
            can: {
                add: bindActionCreators(canAddOrganizationActions, dispatch)
            },

            sidebar: bindActionCreators(sideBarActions, dispatch)
        }
    }
}

class Organizations extends Component {

    state = {
        selected: null,

        shouldOpenDetails: false,

        isEditorOpen: false,
        isSaveSuccessDialogOpen: false,
        isCancelEditConfirmDialogOpen: false
    }

    componentDidMount () {
        this.refresh()

        this.canAdd()
        this.loadCount()

        this.updateSideBar()
    }

    componentDidUpdate () {
        if (this.props.shouldReload) {
            this.refresh()
        }
    }

    onRefresh = (page) => {
        this.refresh(page)
    }

    onChangeFilterField = (name, value) => {
        this.changeFilterField(name, value)
    }

    onClearSearchField = () => {
        this.clearFilter()
    }

    onAdd = () => {
        this.setState({ isEditorOpen: true })
    }

    onEdit = (organization) => {
        this.setState({
            isEditorOpen: true,
            selected: organization
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
    }

    onSaveSuccess = (id, isNew) => {
        this.refresh()

        this.setState(s => ({
            isEditorOpen: false,
            isSaveSuccessDialogOpen: true,
            selected: isNew ? { id, isNew } : s.selected
        }))
    }

    onDetails = () => {
        this.setState({
            shouldOpenDetails: true,
            isSaveSuccessDialogOpen: false
        })
    }

    onConfigureOrganization = (organization) => {
        alert('Coming soon!')
    }

    onSort = (field, order) => {
        this.sort(field, order)
    }

    onResetError = () => {
        const {
            actions
        } = this.props

        actions.clearError()
        actions.form.clearError()
    }

    getError () {
        const {
            error, form
        } = this.props

        return error || form.error
    }

    clearFilter () {
        this.props.actions.clearFilter()
    }

    sort (field, order) {
        this
            .props
            .actions
            .sort(field, order)
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

            const { actions } = this.props
            const { field, order } = ds.sorting

            const { page: p, size, } = ds.pagination

            actions.load({
                size,
                page: page || p,
                ...ds.filter.toJS(),
                sort: `${field},${order}`,
            })
        }
    }

    refresh (page) {
        this.update(true, page || FIRST_PAGE)
    }

    clear () {
        this.props.actions.clear()
    }

    changeFilterField (name, value, shouldReload) {
        this.props
            .actions
            .changeFilterField(name, value, shouldReload)
    }

    loadCount () {
        this.props.actions.count.load()
    }

    canAdd () {
        this.props
            .actions
            .can
            .add
            .load()
    }

    updateSideBar () {
        this
            .props
            .actions
            .sidebar
            .update({
                isHidden: false,
                items: getSideBarItems()
            })
    }

    render () {
        const {
            className
        } = this.props;

        const {
            selected,

            shouldOpenDetails,

            isEditorOpen,
            isSaveSuccessDialogOpen,
            isCancelEditConfirmDialogOpen
        } = this.state;

        const {
            can,
            count,
            isFetching,
            dataSource: ds
        } = this.props

        if (shouldOpenDetails) {
            return (
                <Redirect push to={path(`admin/organizations/${selected.id}`)}/>
            )
        }

        const error = this.getError()

        return (
            <DocumentTitle
                title="Simply Connect | Admin | Organizations">
                <div className={cn('Organizations', className)}>
                    <Breadcrumbs items={[
                        { title: 'Admin', href: '/admin/organizations' },
                        { title: 'Organizations', href: '/admin/organizations', isActive: true },
                    ]}/>
                    <Table
                        hasHover
                        hasOptions
                        hasPagination
                        keyField='id'
                        noDataText="No results"
                        title='Organizations List'
                        isLoading={isFetching}
                        className='OrganizationList'
                        containerClass='OrganizationListContainer'
                        data={ds.data}
                        pagination={ds.pagination}
                        columns={[
                            {
                                dataField: 'name',
                                text: 'Name',
                                sort: true,
                                headerStyle: {
                                    width: '250px',
                                },
                                onSort: this.onSort,
                                formatter: (v, row) => {
                                    return (
                                        <>
                                            <div
                                                title={v}
                                                id={'org-' + row.id}
                                                className='text-trim'>
                                                <Link
                                                    to={path(`/admin/organizations/${row.id}`)}
                                                    className='OrganizationList-OrganizationName'>
                                                    {v}
                                                </Link>
                                            </div>
                                            <Tooltip
                                                placement="top"
                                                target={'org-' + row.id}>
                                                View organization details
                                            </Tooltip>
                                        </>
                                    )
                                }
                            },
                            {
                                dataField: 'communityCount',
                                text: 'Communities',
                                sort: true,
                                align: 'right',
                                headerAlign: 'right',
                                headerStyle: {
                                    width: '100px',
                                },
                                onSort: this.onSort,
                            },
                            /*{
                                dataField: 'affiliatedOrganizationsCount',
                                text: 'Affiliated Organizations',
                                sort: true,
                                align: 'right',
                                headerAlign: 'right',
                                headerStyle: {
                                    width: '230px',
                                },
                                onSort: this.onSort,
                            },*/
                            {
                                dataField: 'createdAutomatically',
                                text: 'Created Automatically',
                                sort: true,
                                headerStyle: {
                                    width: '150px',
                                },
                                onSort: this.onSort,
                                formatter: v => v ? 'Yes' : 'No'
                            },
                            {
                                dataField: 'lastModified',
                                text: 'Modified On',
                                sort: true,
                                align: 'right',
                                headerAlign: 'right',
                                headerStyle: {
                                    width: '150px',
                                },
                                onSort: this.onSort,
                                formatter: v => v && format(v, DATE_FORMAT)
                            },
                            {
                                dataField: '',
                                text: '',
                                headerStyle: {
                                    width: '150px',
                                },
                                align: 'right',
                                formatter: (v, row) => (
                                    <Actions
                                        data={row}
                                        hasEditAction={row.canEdit}
                                        hasConfigureAction={row.hasPasswordConfiguration}
                                        iconSize={ICON_SIZE}
                                        configureHintMessage="Configure password"
                                        editHintMessage="Edit organization details"
                                        onEdit={this.onEdit}
                                        onConfigure={this.onConfigureOrganization}
                                    />
                                )
                            }
                        ]}
                        defaultSorted={[{
                            dataField: 'name',
                            order: 'asc'
                        }]}
                        renderCaption={title => {
                            return (
                                <div className='OrganizationList-Caption'>
                                    <div className='flex-1'>
                                        <div className='OrganizationList-Title Table-Title'>
                                            {title}
                                            <Badge
                                                color='warning'
                                                className='OrganizationList-OrganizationCount'>
                                                {ds.pagination.totalCount}
                                            </Badge>
                                        </div>
                                        <div className='OrganizationList-Filter'>
                                            <SearchField
                                                name='name'
                                                value={ds.filter.name}
                                                className='OrganizationList-FilterField'
                                                placeholder='Search by organization name'
                                                onClear={this.onClearSearchField}
                                                onChange={this.onChangeFilterField}
                                            />
                                        </div>
                                    </div>
                                    {can.add.value && (
                                        <div className='flex-1 text-right'>
                                            <Button
                                                color='success'
                                                className='AddOrganizationBtn'
                                                onClick={this.onAdd}>
                                                Add organization
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )
                        }}
                        onRefresh={this.onRefresh}
                    />
                    {isEditorOpen && (
                        <OrganizationEditor
                            isOpen={isEditorOpen}
                            organizationId={selected && selected.id}
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
                            className={className}
                            title={`Organization ${selected.isNew ? 'has been created' : 'details have been updated'}.`}
                            buttons={selected.isNew ?
                                [
                                    {
                                        text: 'View Details',
                                        className: 'min-width-120 margin-left-80',
                                        onClick: this.onDetails
                                    },
                                    {
                                        text: 'Close',
                                        color: 'success',
                                        className: 'min-width-120 margin-right-80',
                                        onClick: () => {
                                            this.onCloseEditor()
                                        }
                                    }
                                ] : [
                                    {
                                        text: 'OK',
                                        color: 'success',
                                        onClick: this.onDetails
                                    }
                                ]
                            }
                        />
                    )}
                    {error && !isIgnoredError(error) && (
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

export default connect(mapStateToProps, mapDispatchToProps)(Organizations)