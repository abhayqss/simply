import React, { Component } from 'react'

import cn from 'classnames'
import { isNumber } from 'underscore'

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
import Loader from 'components/Loader/Loader'
import Detail from 'components/Detail/Detail'
import Actions from 'components/Table/Actions/Actions'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import ErrorViewer from 'components/ErrorViewer/ErrorViewer'
import ConfirmDialog from 'components/dialogs/ConfirmDialog/ConfirmDialog'
import SuccessDialog from 'components/dialogs/SuccessDialog/SuccessDialog'

import './OrganizationDetails.scss'

import OrganizationEditor from '../OrganizationEditor/OrganizationEditor'
import CommunityEditor from '../Communities/CommunityEditor/CommunityEditor'

import { getSideBarItems } from '../../SideBarItems'

import * as sideBarActions from "redux/sidebar/sideBarActions"
import * as communityListActions from 'redux/community/list/communityListActions'
import * as communityFormActions from 'redux/community/form/communityFormActions'
import * as communityCountActions from 'redux/community/count/communityCountActions'
import * as canAddCommunityActions from 'redux/community/can/add/canAddCommunityActions'
import * as organizationLogoActions from 'redux/organization/logo/organizationLogoActions'
import * as organizationFormActions from 'redux/organization/form/organizationFormActions'
import * as organizationDetailsActions from 'redux/organization/details/organizationDetailsActions'

import { PAGINATION, SERVER_ERROR_CODES } from 'lib/Constants'

import { path } from 'lib/utils/ContextUtils'
import { promise, isEmpty, DateUtils } from 'lib/utils/Utils'

import { ReactComponent as Warning } from 'images/alert-yellow.svg'

const { FIRST_PAGE } = PAGINATION

const { format, formats } = DateUtils

const ICON_SIZE = 36;
const DATE_FORMAT = formats.americanMediumDate

function isIgnoredError (e = {}) {
    return e.code === SERVER_ERROR_CODES.ACCOUNT_INACTIVE
}

function mapStateToProps (state) {
    return {
        data: state.organization.details.data,
        error: state.organization.details.error,
        isFetching: state.organization.details.isFetching,
        shouldReload: state.organization.details.shouldReload,

        community: state.community
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            form: bindActionCreators(organizationFormActions, dispatch),
            logo: bindActionCreators(organizationLogoActions, dispatch),
            details: bindActionCreators(organizationDetailsActions, dispatch),

            community: {
                list: bindActionCreators(communityListActions, dispatch),
                form: bindActionCreators(communityFormActions, dispatch),
                count: bindActionCreators(communityCountActions, dispatch),
                can: {
                    add: bindActionCreators(canAddCommunityActions, dispatch)
                }
            },

            sidebar: bindActionCreators(sideBarActions, dispatch)
        }
    }
}

class OrganizationDetails extends Component {

    state = {
        shouldOpenCommunityDetails: false,

        isEditorOpen: false,
        isSaveSuccessDialogOpen: false,
        isCancelEditConfirmDialogOpen: false,

        selectedCommunity: null,
        isCommunityEditorOpen: false,
        isSaveCommunitySuccessDialogOpen: false,
        isCancelEditCommunityConfirmDialogOpen: false
    }

    componentDidMount () {
        this.refresh().then(() => {
            this.loadLogo()
        })

        this.canAddCommunity()

        this.updateSideBar()

        this.loadCommunityCount()
        this.refreshCommunityList()
    }

    componentDidUpdate () {
        const {
            community,
            shouldReload
        } = this.props

        if (shouldReload) {
            this.refresh().then(() => {
                this.loadLogo()
            })
        }

        if (community.list.shouldReload) {
            this.refreshCommunityList()
        }
    }

    onRefresh = (page) => {
        this.refreshCommunityList(page)
    }

    onEdit = () => {
        this.setState({ isEditorOpen: true })
    }

    onEditCommunity = community => {
        this.setState({
            selectedCommunity: community,
            isCommunityEditorOpen: true
        })
    }

    onAddCommunity = () => {
        this.setState({ isCommunityEditorOpen: true })
    }

    onCancelConfirmDialog = () => {
        this.setState({
            isCancelEditConfirmDialogOpen: false
        })
    }

    onCommunityCancelConfirmDialog = () => {
        this.setState({
            isCancelEditCommunityConfirmDialogOpen: false
        })
    }

    onCloseEditor = (shouldConfirm = false) => {
        this.setState({
            isEditorOpen: shouldConfirm,
            isSaveSuccessDialogOpen: false,
            isCancelEditConfirmDialogOpen: shouldConfirm
        })
    }

    onCloseCommunityEditor = (shouldConfirm = false) => {
        this.setState(s => ({
            isCommunityEditorOpen: shouldConfirm,
            isSaveCommunitySuccessDialogOpen: false,
            isCancelEditCommunityConfirmDialogOpen: shouldConfirm,
            selectedCommunity: shouldConfirm ? s.selectedCommunity : null
        }))
    }

    onCloseCommunitySuccessDialog = () => {
        this.setState({
            isSaveCommunitySuccessDialogOpen: false,
        })
    }

    onCommunityDetails = () => {
        this.setState({
            shouldOpenCommunityDetails: true,
        })
    }

    onSaveSuccess = () => {
        this.setState({
            isEditorOpen: false,
            isSaveSuccessDialogOpen: true
        })
    }

    onSaveCommunitySuccess = (id, isNew) => {
        this.refreshCommunityList()
        
        this.setState(s => ({            
            isCommunityEditorOpen: false,
            isSaveCommunitySuccessDialogOpen: true,
            selectedCommunity: isNew ? { id, isNew } : s.selectedCommunity
        }))
    }

    onSort = (field, order) => {
        this.props.actions.community.list.sort(field, order)
    }

    onResetError = () => {
        const {
            details, community
        } = this.props.actions

        details.clearError()
        community.form.clearError()
    }

    loadLogo () {
        const {
            match,
            actions
        } = this.props

        actions
            .logo
            .download(
                +match.params.orgId
            )
    }

    canAddCommunity () {
        const {
            match,
            actions
        } = this.props

        return actions
            .community
            .can
            .add
            .load(+match.params.orgId)
    }

    refresh () {
        return this.update(true)
    }

    refreshCommunityList (page) {
        this.updateCommunityList(true, page || FIRST_PAGE)
    }

    update (isReload) {
        if (isReload) {
            const {
                match,
                actions
            } = this.props

            return actions
                .details
                .load(
                    +match.params.orgId,
                    true
                )
        }

        return promise()
    }

    updateCommunityList (isReload, page) {
        const {
            match,
            actions,
            community: { list }
        } = this.props

        const { pagination, sorting, filter } = list.dataSource

        const { orgId } = match.params

        if (isReload) {

            const { field, order } = sorting
            const { page: p, size } = pagination

            actions.community.list.load({
                orgId,
                size,
                page: page || p,
                ...filter.toJS(),
                sort: `${field},${order}`,
            })
        }
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

    isLoading () {
        const { isFetching, shouldReload } = this.props

        return isFetching || shouldReload
    }

    clear () {
        this.props.actions.details.clear()
    }

    clearCommunityList () {
        this.props.actions.community.list.clear()
    }

    getError () {
        const {
            error, community
        } = this.props

        return error || community.form.error
    }

    loadCommunityCount () {
        const {
            match, actions
        } = this.props

        actions
            .community
            .count
            .load(+match.params.orgId)
    }

    render () {
        const {
            data,
            match,
            className,
            community: {
                can,
                count,
                list: {
                    isFetching,
                    dataSource: ds
                }
            },
        } = this.props;

        const { orgId } = match.params

        const {
            shouldOpenCommunityDetails,

            isEditorOpen,
            isSaveSuccessDialogOpen,
            isCancelEditConfirmDialogOpen,

            selectedCommunity,
            isCommunityEditorOpen,
            isSaveCommunitySuccessDialogOpen,
            isCancelEditCommunityConfirmDialogOpen
        } = this.state;

        let content = null

        if (shouldOpenCommunityDetails) {
            return (
                <Redirect push to={path(`admin/organizations/${orgId}/communities/${selectedCommunity.id}`)}/>
            )
        }

        if (this.isLoading()) {
            content = (
                <Loader/>
            )
        }

        else if (isEmpty(data)) {
            content = (
                <h4>No Data</h4>
            )
        }

        else {
            content = (
                <>
                    <Breadcrumbs items={[
                        { title: 'Organizations', href: '/admin/organizations', isEnabled: true },
                        { title: 'Organization details', href: '/admin/organizations/' + orgId, isActive: true },
                    ]}/>
                    <div className="OrganizationDetails-Header">
                        <div className="OrganizationDetails-Title">
                            <div className="OrganizationDetails-TitleWrapper"
                                 title={data.name}>
                                {data.name}
                            </div>
                        </div>
                        <div>
                            {/*<Button
                               className="OrganizationDetails-ConfigurePasswordButton btn-default">
                               Configure Password
                           </Button>*/}
                            {data.canEdit && (
                                <Button
                                    color='success'
                                    className='OrganizationDetails-EditButton'
                                    onClick={this.onEdit}>
                                    Edit details
                                </Button>
                            )}
                        </div>
                    </div>
                    <Detail
                        className="OrganizationDetail"
                        titleClassName="OrganizationDetail-Title"
                        valueClassName="OrganizationDetail-Value"
                        title="Organization OID">
                        {data.oid}
                    </Detail>
                    <Detail
                        className="OrganizationDetail"
                        titleClassName="OrganizationDetail-Title"
                        valueClassName="OrganizationDetail-Value"
                        title="Company Code">
                        {data.companyId}
                    </Detail>
                    <Detail
                        className="OrganizationDetail"
                        titleClassName="OrganizationDetail-Title"
                        valueClassName="OrganizationDetail-Value"
                        title="Email">
                        {data.email}
                    </Detail>
                    <Detail
                        className="OrganizationDetail"
                        titleClassName="OrganizationDetail-Title"
                        valueClassName="OrganizationDetail-Value"
                        title="Phone number">
                        {data.phone}
                    </Detail>
                    <Detail
                        className="OrganizationDetail"
                        titleClassName="OrganizationDetail-Title"
                        valueClassName="OrganizationDetail-Value"
                        title="Address">
                        {data.displayAddress}
                    </Detail>
                    {data.logoDataUrl && (
                        <Detail
                            className="OrganizationDetail"
                            titleClassName="OrganizationDetail-Title"
                            valueClassName="OrganizationDetail-Value"
                            title="Logo">
                            <img
                                className="OrganizationDetail-Logo"
                                src={data.logoDataUrl} alt=""
                            />
                        </Detail>
                    )}
                    <Table
                        hasHover
                        hasOptions
                        hasPagination
                        keyField='id'
                        title='Communities'
                        isLoading={isFetching}
                        className='CommunityList'
                        containerClass='CommunityListContainer'
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
                                    return row.canView ? (
                                        <>
                                            <div id={'comm' + row.id} title={v} className='text-trim'>
                                                <Link
                                                    to={path(`/admin/organizations/${orgId}/communities/${row.id}`)}
                                                    className='CommunityList-CommunityName'>
                                                    {v}
                                                </Link>
                                            </div>
                                            <Tooltip
                                                placement="top"
                                                target={'comm' + row.id}>
                                                View community details
                                            </Tooltip>
                                        </>
                                    ) : (
                                        <span title={v}
                                             id={'comm' + row.id}
                                             className='CommunityList-CommunityName'>
                                            {v}
                                        </span>
                                    )
                                }
                            },
                            {
                                dataField: 'oid',
                                text: 'Community OID',
                                sort: true,
                                headerStyle: {
                                    width: '150px',
                                },
                                onSort: this.onSort,
                            },
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
                                formatter: (v, row) => {
                                    return (
                                        <Actions
                                            data={row}
                                            hasEditAction={row.canEdit}
                                            iconSize={ICON_SIZE}
                                            className='CommunityList-Actions'
                                            editHintMessage="Edit community details"
                                            onEdit={this.onEditCommunity}
                                        />
                                    )
                                }
                            }
                        ]}
                        defaultSorted={[{
                            dataField: 'name',
                            order: 'asc'
                        }
                        ]}
                        renderCaption={title => {
                            return (
                                <div className='CommunityList-Caption'>
                                    <div className='flex-1'>
                                        <div className='CommunityList-Title Table-Title'>
                                            {title}
                                            {!!count.value && (
                                                <Badge color='warning' className='CommunityList-CommunityCount'>
                                                    {count.value}
                                                </Badge>
                                            )}
                                        </div>

                                    </div>
                                    {can.add.value && (
                                        <div className='flex-1 text-right'>
                                            <Button
                                                color='success'
                                                className='AddCommunityBtn'
                                                onClick={this.onAddCommunity}>
                                                Add community
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )
                        }}
                        onRefresh={this.onRefresh}
                    />
                </>
            )
        }

        const error = this.getError()

        return (
            <DocumentTitle
                title={isCommunityEditorOpen
                    ? isNumber(selectedCommunity && selectedCommunity.id)
                        ? "Simply Connect | Admin | Organizations | Organization Details | Edit Community Details"
                        : "Simply Connect | Admin | Organizations | Organization Details | Create Community"
                    : "Simply Connect | Admin | Organizations | Organization Details"
                }>
                <div className={cn('OrganizationDetails', className)}>
                    {content}
                    {isEditorOpen && (
                        <OrganizationEditor
                            isOpen
                            organizationId={+orgId}
                            onClose={this.onCloseEditor}
                            onSaveSuccess={this.onSaveSuccess}
                        />
                    )}
                    {isSaveSuccessDialogOpen && (
                        <SuccessDialog
                            isOpen
                            title="Organization details have been updated."
                            className={className}
                            buttons={[{
                                text: 'OK',
                                color: 'success',
                                onClick: () => { this.onCloseEditor() }
                            }]}
                        />
                    )}
                    {isCancelEditConfirmDialogOpen && (
                        <ConfirmDialog
                            isOpen
                            icon={Warning}
                            confirmBtnText='OK'
                            title='The updates will not be saved'
                            onConfirm={this.onCloseEditor}
                            onCancel={this.onCancelConfirmDialog}
                        />
                    )}
                    {isCommunityEditorOpen && (
                        <CommunityEditor
                            isOpen
                            communityId={selectedCommunity && selectedCommunity.id}
                            organizationId={+orgId}
                            onClose={this.onCloseCommunityEditor}
                            onSaveSuccess={this.onSaveCommunitySuccess}
                        />
                    )}
                    {isSaveCommunitySuccessDialogOpen && (
                        <SuccessDialog
                            isOpen
                            type="success"
                            buttons={selectedCommunity.isNew ?
                                [
                                    {
                                        text: 'View Details',
                                        className: 'margin-left-80',
                                        onClick: this.onCommunityDetails
                                    },
                                    {
                                        text: 'Close',
                                        color: 'success',
                                        className: 'margin-right-80',
                                        onClick: () => { this.onCloseCommunityEditor() }
                                    }
                                ]
                                : [
                                    {
                                        text: 'Ok',
                                        color: 'success',
                                        onClick: this.onCommunityDetails
                                    }
                                ]
                            }
                            title={`Community ${selectedCommunity.isNew ? 'has been created' : 'details have been updated'}.`}
                            onClose={this.onCloseCommunitySuccessDialog}
                            onViewDetail={this.onCommunityDetails}
                        />
                    )}
                    {isCancelEditCommunityConfirmDialogOpen && (
                        <ConfirmDialog
                            isOpen
                            icon={Warning}
                            confirmBtnText='OK'
                            title='The updates will not be saved'
                            onConfirm={this.onCloseCommunityEditor}
                            onCancel={this.onCommunityCancelConfirmDialog}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationDetails)