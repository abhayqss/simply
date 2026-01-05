import React, { Component, Fragment } from 'react'

import cn from 'classnames'

import {
    any,
    find,
    each,
    omit
} from 'underscore'

import { connect } from 'react-redux'
import { Image } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import {
    Badge,
    Button,
    Collapse,
    UncontrolledTooltip as Tooltip
} from 'reactstrap'

import DocumentTitle from 'react-document-title'

import Table from 'components/Table/Table'
import Avatar from 'components/Avatar/Avatar'
import Actions from 'components/Table/Actions/Actions'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import ErrorViewer from 'components/ErrorViewer/ErrorViewer'
import ConfirmDialog from 'components/dialogs/ConfirmDialog/ConfirmDialog'
import SuccessDialog from 'components/dialogs/SuccessDialog/SuccessDialog'

import './Contacts.scss'

import { getSideBarItems } from '../SideBarItems'

import ContactFilter from './ContactFilter/ContactFilter'
import ContactPrimaryFilter from './ContactPrimaryFilter/ContactPrimaryFilter'

import ContactEditor from './ContactEditor/ContactEditor'
import ContactViewer from './ContactViewer/ContactViewer'

import * as contactFormActions from 'redux/contact/form/contactFormActions'
import * as contactListActions from 'redux/contact/list/contactListActions'
import * as contactAvatarActions from 'redux/contact/avatar/contactAvatarActions'
import * as canAddContactActions from 'redux/contact/can/add/canAddContactActions'
import * as contactDetailsActions from 'redux/contact/details/contactDetailsActions'

import * as sideBarActions from 'redux/sidebar/sideBarActions'

import {
    promise,
    isEmpty,
    isNotEmpty
} from 'lib/utils/Utils'

import { path } from 'lib/utils/ContextUtils'
import { Response } from 'lib/utils/AjaxUtils'

import {
    PAGINATION,
    SERVER_ERROR_CODES,
    CONTACT_STATUS_TYPES
} from 'lib/Constants'

import { ReactComponent as Filter } from 'images/filters.svg'
import { ReactComponent as Warning } from 'images/alert-yellow.svg'

const { FIRST_PAGE } = PAGINATION

const { EXPIRED } = CONTACT_STATUS_TYPES

const ICON_SIZE = 36

const STATUS_COLORS = {
    [CONTACT_STATUS_TYPES.ACTIVE]: '#d5f3b8',
    [CONTACT_STATUS_TYPES.PENDING]: '#ffffff',
    [CONTACT_STATUS_TYPES.EXPIRED]: '#fde1d5',
    [CONTACT_STATUS_TYPES.INACTIVE]: '#e0e0e0',
}

function isIgnoredError (e = {}) {
    return e.code === SERVER_ERROR_CODES.ACCOUNT_INACTIVE
}

function mapStateToProps (state) {
    const {
        can,
        list,
        form,
        details,
        community
    } = state.contact

    return {
        error: list.error,
        isFetching: list.isFetching,
        dataSource: list.dataSource,
        shouldReload: list.shouldReload,

        can,
        form,
        details,
        community,

        auth: state.auth,

        directory: state.directory
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(contactListActions, dispatch),
            form: bindActionCreators(contactFormActions, dispatch),
            avatar: bindActionCreators(contactAvatarActions, dispatch),
            details: bindActionCreators(contactDetailsActions, dispatch),

            can: { add: bindActionCreators(canAddContactActions, dispatch) },

            sidebar: bindActionCreators(sideBarActions, dispatch)
        }
    }
}

class Contacts extends Component {
    membershipHintRef = React.createRef()

    state = {
        selected: null,

        isFilterOpen: false,
        isEditorOpen: false,
        shouldOpenDetails: false,
        isMembershipHintOpen: false,
        isSaveSuccessDialogOpen: false,
        isCancelEditConfirmDialogOpen: false
    }

    componentDidMount () {
        this.updateSideBar()

        document.addEventListener('mousedown', this.onMouseEvent);
    }

    componentDidUpdate (prevProps, prevState) {
        if (this.props.shouldReload) {
            this.refresh()
        }
    }

    componentWillUnmount () {
        document.removeEventListener('mousedown', this.onMouseEvent);
    }

    onMouseEvent = (e) => {
        const node = this.membershipHintRef.current

        if (!(node && node.contains(e.target))) {
            this.setState({ isMembershipHintOpen: false });
        }
    }

    onResetError = () => {
        const {
            can,
            form,
            details,
            clearError
        } = this.props.actions

        clearError()
        form.clearError()
        can.add.clearError()
        details.clearError()
    }

    onToggleFilter = () => {
        this.setState(s => ({
            isFilterOpen: !s.isFilterOpen
        }))
    }

    onSort = (field, order) => {
        this.props.actions.sort(field, order)
    }

    onRefresh = page => {
        this.refresh(page)
    }

    onAdd = () => {
        this.setState({
            selected: null,
            isEditorOpen: true
        })
    }

    onEdit = contact => {
        this.setState({
            selected: contact,
            isEditorOpen: true
        })
    }

    onDetails = id => {
        const { dataSource: ds } = this.props

        const contact = find(ds.data, o => o.id === id);

        this.setState({
            selected: contact,
            shouldOpenDetails: true,
        })
    }

    onCloseDetails = () => {
        this.setState({
            shouldOpenDetails: false,
        })
    }

    onToggleMemberShip = (contactId) => {
        this.setState(s => ({
            isMembershipHintOpen: !s.isMembershipHintOpen,
            selected: !(s.selected && s.selected.id === contactId) ? find(
                this.props.dataSource.data,
                o => o.id === contactId
            ) : s.selected
        }))
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
        this.refresh()

        this.loadDetails(id, false)
            .then(Response(({ data }) => {
                this.setState({
                    isEditorOpen: false,
                    isSaveSuccessDialogOpen: true,
                    selected: { ...data, isNew }
                })
            }))
    }

    onReInviteSuccess = () => {
        this.refresh()

        this.setState({
            isEditorOpen: false,
            isSaveSuccessDialogOpen: true
        })
    }

    onCloseSuccessDialog = () => {
        this.setState({
            shouldOpenDetails: true,
            isSaveSuccessDialogOpen: false
        })
    }

    getError () {
        const {
            can,
            form,
            error,
            details
        } = this.props

        return error
            || form.error
            || can.add.error
            || details.error
    }

    loadDetails (contactId, shouldNotSave) {
        return this.props
                   .actions
                   .details
                   .load(contactId, shouldNotSave)
    }

    refresh (page) {
        this.update(true, page || FIRST_PAGE)
    }

    update (isReload, page) {
        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = this.props

        if (isReload || shouldReload || (!isFetching && isEmpty(ds.data))) {
            const { actions } = this.props
            const { field, order } = ds.sorting
            const { page: p, size } = ds.pagination

            actions
                .load({
                    size,
                    page: page || p,
                    filter: omit(
                        ds.filter.toJS(),
                        v => isEmpty(v, { allowEmptyBool: false })
                    ),
                    sort: `${field},${order}`,
                })
                .then(Response(({ data }) => {
                    each(data, o => {
                        if (o.avatarId) {
                            this.loadAvatar(o.id, o.avatarId)
                        }
                    })
                }))
        }
    }

    clear () {
        this.props.actions.clear()
    }

    loadAvatar (contactId, avatarId) {
        this
            .props
            .actions
            .avatar
            .download({
                contactId,
                avatarId
            })
    }

    updateSideBar () {
        this.props
            .actions
            .sidebar
            .update({
                isHidden: false,
                items: getSideBarItems()
            })
    }

    render () {
        const {
            className,
            community,
            isFetching,
            dataSource: ds
        } = this.props

        const {
            selected,
            isEditorOpen,
            isFilterOpen,
            shouldOpenDetails,
            isMembershipHintOpen,
            isSaveSuccessDialogOpen,
            isCancelEditConfirmDialogOpen
        } = this.state

        const error = this.getError()

        return (
            <DocumentTitle title="Simply Connect | Admin | Contacts">
                <div className={cn('Contacts', className)}>
                    <Breadcrumbs
                        items={[
                            { title: 'Admin', href: '/admin/contacts' },
                            { title: 'Contacts', href: '/admin/contacts', isActive: true },
                        ]}
                    />
                    <ContactPrimaryFilter/>
                    <Table
                        hasHover
                        hasOptions
                        hasPagination
                        keyField="id"
                        title="Contacts"
                        noDataText="No Contacts"
                        isLoading={isFetching}
                        className="ContactList"
                        containerClass="ContactListContainer"
                        data={ds.data}
                        pagination={ds.pagination}
                        columns={[
                            {
                                dataField: 'firstName',
                                text: 'User',
                                sort: true,
                                headerStyle: {
                                    width: '200px',
                                },
                                style: (cell, row) => row.status.name === 'INACTIVE' && {
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
                                                        'ContactList-Avatar',
                                                        row.status.name === 'INACTIVE' && 'ContactList-Avatar_black-white'
                                                    )}
                                                />
                                            ) : (
                                                <Avatar
                                                    name={row.fullName}
                                                />
                                            )}
                                            <div
                                                id={`contact-${row.id}`}
                                                className={cn('ContactList-ContactName', row.avatarDataUrl && 'margin-left-10')}
                                                onClick={() => this.onDetails(row.id)}>
                                                {row.fullName}
                                            </div>
                                            <Tooltip
                                                placement="top"
                                                target={`contact-${row.id}`}>
                                                View contact details
                                            </Tooltip>
                                        </div>
                                    )
                                }
                            },
                            {
                                dataField: 'systemRoleTitle',
                                text: 'System Role',
                                sort: true,
                                headerStyle: {
                                    width: '135px',
                                },
                                onSort: this.onSort,
                                style: (cell, row) => row.status.name === 'INACTIVE' && {
                                    opacity: '0.5'
                                }
                            },
                            {
                                dataField: 'status',
                                text: 'Status',
                                sort: true,
                                headerStyle: {
                                    width: '85px'
                                },
                                textAlign: 'left',
                                headerAlign: 'left',
                                onSort: this.onSort,
                                style: (cell, row) => row.status.name === 'INACTIVE' && {
                                    opacity: '0.5'
                                },
                                formatter: (v, row) => (
                                    <span
                                        style={{
                                            backgroundColor: STATUS_COLORS[v.name] || null,
                                            ...v.name === CONTACT_STATUS_TYPES.PENDING ? {
                                                color: '#898989',
                                                border: '1px solid #bfbdbd'
                                            } : {}
                                        }}
                                        className="ContactList-Status">
                                           {v.title}
                                    </span>
                                ),
                            },
                            {
                                dataField: 'memberships',
                                text: 'Membership',
                                align: 'right',
                                headerAlign: 'right',
                                headerStyle: {
                                    width: '120px',
                                },
                                style: (cell, row) => row.status.name === 'INACTIVE' && {
                                    opacity: '0.5'
                                },
                                formatter: (v, row) => v.communities || v.clients ? (
                                    <div
                                        id={`contact-${row.id}-membership`}
                                        className="ContactList-MembershipLink"
                                        onClick={() => this.onToggleMemberShip(row.id)}>
                                        {v.clientCount + v.communityCount}
                                    </div>
                                ) : (
                                    <span className="ContactList-Membership">
                                            {v.clientCount + v.communityCount}
                                        </span>
                                )
                            },
                            {
                                dataField: 'login',
                                text: 'Login',
                                sort: true,
                                headerStyle: {
                                    width: '200px',
                                },
                                onSort: this.onSort,
                                style: (cell, row) => row.status.name === 'INACTIVE' && {
                                    opacity: '0.5'
                                }
                            },
                            {
                                dataField: 'phone',
                                text: 'Phone',
                                align: 'right',
                                headerAlign: 'right',
                                headerStyle: {
                                    width: '200px',
                                },
                                style: (cell, row) => row.status.name === 'INACTIVE' && {
                                    opacity: '0.5'
                                }
                            },
                            {
                                dataField: '',
                                text: '',
                                headerStyle: {
                                    width: '60px',
                                },
                                formatter: (v, row) => {
                                    return (
                                        <div className="ContactList-Actions">
                                            <Actions
                                                data={row}
                                                hasEditAction={row.canEdit}
                                                iconSize={ICON_SIZE}
                                                onEdit={this.onEdit}
                                                editHintMessage="Edit contact's details"
                                            />
                                        </div>
                                    )
                                }
                            }
                        ]}
                        renderCaption={title => {
                            return (
                                <>
                                    <div className="ContactList-Caption">
                                        <div className="flex-2">
                                            <div className="ContactList-Title Table-Title">
                                                {title}
                                                <Badge color="warning" className="ContactList-ContactCount">
                                                    {ds.pagination.totalCount}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="flex-4 text-right">
                                            <Filter
                                                className={cn(
                                                    'ContactFilter-Icon',
                                                    isFilterOpen
                                                        ? 'ContactFilter-Icon_rotated_90'
                                                        : 'ContactFilter-Icon_rotated_0',
                                                )}
                                                onClick={this.onToggleFilter}
                                            />
                                            {any(community.list.dataSource.data, o => o.canAddContact) && (
                                                <Button
                                                    color='success'
                                                    className="AddContactBtn"
                                                    onClick={this.onAdd}>
                                                    Create Contact
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                    <Collapse isOpen={isFilterOpen}>
                                        <ContactFilter/>
                                    </Collapse>
                                </>
                            )
                        }}
                        onRefresh={this.onRefresh}
                    />
                    {shouldOpenDetails && (
                        <ContactViewer
                            isOpen
                            contactId={selected && selected.id}
                            onClose={this.onCloseDetails}
                        />
                    )}
                    {isMembershipHintOpen && (
                        <Tooltip
                            isOpen
                            placement="right"
                            innerRef={this.membershipHintRef}
                            className='ContactMembershipHint'
                            innerClassName='ContactMembershipHint-Body'
                            target={`contact-${selected.id}-membership`}
                        >
                            {selected.memberships.communities && (
                                <Fragment>
                                    <span className="ContactMembership-Title">
                                        Communities
                                    </span>
                                    {selected.memberships.communities.map(o => (
                                        <Link
                                            key={o.id}
                                            className="ContactMembership-Community"
                                            to={path(`/admin/organizations/${ds.filter.organizationId}/communities/${o.id}` )}
                                        >
                                            {o.label}
                                        </Link>
                                    ))}
                                </Fragment>
                            )}
                            {selected.memberships.clients && (
                                <Fragment>
                                    <span className="ContactMembership-Title">
                                        Clients
                                    </span>
                                    {selected.memberships.clients.map(o => (
                                        <Link
                                            key={o.id}
                                            className="ContactMembership-Client"
                                            to={path(`/clients/${o.id}`)}
                                        >
                                           {o.label}
                                        </Link>
                                    ))}
                                </Fragment>
                            )}
                        </Tooltip>
                    )}
                    {isEditorOpen && (
                        <ContactEditor
                            isOpen
                            contactId={isNotEmpty(selected) && selected.id}
                            isExpiredContact={isNotEmpty(selected) && selected.status.name === EXPIRED}
                            onClose={this.onCloseEditor}
                            onSaveSuccess={this.onSaveSuccess}
                            onReInviteSuccess={this.onReInviteSuccess}
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
                            title={
                                selected.isNew ?
                                    'Contact has been created.'
                                    : selected.status.name === EXPIRED ?
                                    'A new invitation has been sent.'
                                    : 'Contact details have been updated.'
                            }
                            buttons={selected.isNew ?
                                [
                                    {
                                        text: 'View Details',
                                        className: 'min-width-120 margin-left-80',
                                        onClick: this.onCloseSuccessDialog
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
                                        onClick: () => {
                                            this.onCloseEditor()
                                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)
