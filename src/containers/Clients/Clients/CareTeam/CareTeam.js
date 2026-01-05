import React, {Component} from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'

import {Image} from 'react-bootstrap'
import {Button, Col, Row} from 'reactstrap'

import './CareTeam.scss'

import Table from 'components/Table/Table'
import Actions from 'components/Table/Actions/Actions'
import SearchField from 'components/SearchField/SearchField'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'

import CareTeamMemberEditor from '../CareTeam/CareTeamMemberEditor/CareTeamMemberEditor'

import {getSideBarItems} from '../../SideBarItems'

import * as sideBarActions from 'redux/sidebar/sideBarActions'
import * as clientDetailsActions from 'redux/client/details/clientDetailsActions'
import * as careTeamMemberListActions from 'redux/care/team/member/list/careTeamMemberListActions'

import {isEmpty} from 'lib/utils/Utils'
import {path} from 'lib/utils/ContextUtils'
import {PAGINATION,} from 'lib/Constants'

const {FIRST_PAGE} = PAGINATION

const ICON_SIZE = 36

function mapStateToProps(state) {
    const { list } = state.care.team.member

    return {
        error: list.error,
        isFetching: list.isFetching,
        dataSource: list.dataSource,
        shouldReload: list.shouldReload,

        client: state.client,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            ...bindActionCreators(careTeamMemberListActions, dispatch),

            sidebar: bindActionCreators(sideBarActions, dispatch),
            list: bindActionCreators(careTeamMemberListActions, dispatch),

            client: {
                details: bindActionCreators(clientDetailsActions, dispatch),
            },
        },
    }
}

class CareTeam extends Component {

    detailPopupRef = null

    state = {
        selected: null,
        isEditorOpen: false,
    }

    static propTypes = {
        clientId: PropTypes.string,
    }

    componentDidMount() {
        this.refresh()
        this.refreshClientDetails()

        this.updateSideBar()
    }

    componentDidUpdate() {
        if (this.props.client.details.shouldReload) {
            this.refreshClientDetails()
        }

        if (this.props.shouldReload) {
            this.refresh()
        }
    }

    onChangeFilterField = (name, value) => {
        this.changeCareTeamFilter({ [name]: value })
    }

    onAdd = () => {
        this.setState({
            isEditorOpen: true
        })
    }

    onEdit = (o) => {
        this.setState({
            selected: o,
            isEditorOpen: true
        })
    }

    onDelete() {
        alert('Coming Soon')
    }

    onCloseEditor = () => {
        this.setState({
            selected: null,
            isEditorOpen: false
        })
    }

    onVideoCall() {
        alert('Coming Soon')
    }

    onRefresh = page => {
        this.refresh(page)
    }

    refreshClientDetails() {
        this.updateClientDetails(true)
    }

    getSideBarItems() {
        const {
            match,
            eventCount,
            documentCount,
            assessmentCount,
            servicePlanCount,
        } = this.props

        const { clientId } = match.params

        return getSideBarItems({
            clientId,
            eventCount,
            documentCount,
            assessmentCount,
            servicePlanCount,
        })
    }

    updateClientDetails(isReload) {
        const { client } = this.props

        if (isReload || isEmpty(client.details.data)) {
            const { actions, match } = this.props

            actions.client.details.load(match.params.clientId)
        }
    }

    updateSideBar() {
        this.props.actions.sidebar.update({ items: this.getSideBarItems() })
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

            const { actions, match } = this.props
            const { clientId } = match.params

            const { page: p, size } = ds.pagination

            actions.list.load({
                clientId,
                size,
                page: page || p,
                ...ds.filter.toJS(),
            })
        }
    }

    refresh (page) {
        this.update(true, page || FIRST_PAGE)
    }

    clear() {
        this.props.actions.list.clear()
    }

    changeCareTeamFilter(changes, shouldReload) {
        const { actions } = this.props

        actions.list.changeFilter(changes, shouldReload)
    }

    isLoading() {
        const { isFetching, shouldReload } = this.props.client.details

        return isFetching || shouldReload
    }

    render() {
        const {
            selected,
            isEditorOpen
        } = this.state

        const { client, match, className, dataSource: ds } = this.props

        const { data } = client.details

        const clientId = match.params.clientId

        return (
            <div className={cn('CareTeam', className)}>
                <Breadcrumbs
                    className='CareTeam-Breadcrumbs'
                    items={[
                        { title: 'Clients', href: '/clients' },
                        {
                            title: data && data.fullName || 'Denise Weber',
                            href: '/clients/' + clientId,
                        },
                        {
                            title: 'Care Team',
                            href: '/clients/' + clientId,
                            isActive: true,
                        },
                    ]}
                />
                <Table
                    hasHover
                    hasOptions
                    hasPagination
                    isLoading={this.props.isFetching}
                    keyField="id"
                    title="Care Team"
                    className="CareTeamMemberList"
                    containerClass="CareTeamMemberListContainer"
                    data={ds.data}
                    pagination={ds.pagination}
                    columns={[
                        {
                            dataField: 'member',
                            text: 'Member',
                            sort: true,
                            headerStyle:{
                                width: '258px'
                            },
                            formatter: (v, row) => {
                                return (
                                    <Row>
                                        <Col md={4}>
                                            <Image
                                                className="CareTeamMemberList-Image"
                                                src={row.userAvatar}
                                            />
                                        </Col>
                                        <Col md={8}>
                                            <Row>
                                                <span className="CareTeamMemberList-MemberName">
                                                    {row.employee.label}
                                                </span>
                                            </Row>
                                            <Row>
                                                <span className="CareTeamMemberList-MemberRelation">
                                                    {row.role.label}
                                                </span>
                                            </Row>
                                        </Col>
                                    </Row>
                                )
                            },
                        },
                        {
                            dataField: 'organizationName',
                            text: 'Organization',
                            sort: true,
                            formatter: (v, row) => {
                                return (
                                    <Link
                                        to={path(`/admin/organizations/${row.organizationId}`)}
                                        className='CareTeamMemberList-Organization'>
                                        {v}
                                    </Link>

                                )
                            },
                        },
                        {
                            dataField: 'communityName',
                            text: 'Community',
                            sort: true,
                            formatter: (v, row) => {
                                return (
                                    <Link
                                        to={path(`/admin/organizations/${row.organizationId}/communities/${row.communityId}`)}
                                        className='CareTeamMemberList-Community'>
                                        {v}
                                    </Link>
                                )
                            },
                        },
                        {
                            dataField: 'contacts',
                            text: 'Contacts',
                            sort: true,
                            style: { color: '#333333' },
                            formatter: (v, row) => {
                                return (
                                    <Row>
                                        <Col md={12}>
                                            <Row>
                                                <span className="CareTeamMemberList-Label">
                                                    {row.phone}
                                                </span>
                                            </Row>
                                            <Row>
                                                <span className="CareTeamMemberList-Label">
                                                    {row.email}
                                                </span>
                                            </Row>
                                        </Col>
                                    </Row>
                                )
                            },
                        },
                        {
                            dataField: '',
                            text: '',
                            formatter: (v, row) => {
                                return (
                                    <div className="CareTeamMemberList-Actions">
                                        <Actions
                                            data={row}
                                            iconSize={ICON_SIZE}
                                            hasEditAction={row.isEditable || true}
                                            hasDeleteAction={row.isDeletable}
                                            hasVideoCallAction={row.videoCall}
                                            onEdit={this.onEdit}
                                            onDelete={this.onDelete}
                                            onVideoCall={this.onVideoCall}
                                        />
                                    </div>
                                )
                            },
                        },
                    ]}
                    renderCaption={title => {
                        return (
                            <div className="CareTeamMemberList-Caption">
                                <div className="flex-2">
                                    <div className="CareTeamMemberList-Title Table-Title">
                                        {title}
                                    </div>
                                    <div className="CareTeamMemberList-Filter">
                                        <SearchField
                                            name="name"
                                            value={ds.filter.name}
                                            className="CareTeamMemberList-FilterField"
                                            placeholder="Search by community name"
                                            onChange={this.onChangeFilterField}
                                        />
                                    </div>
                                </div>
                                <div className="flex-4 text-right">
                                    <Button
                                        color='success'
                                        className="AddCareMemberBtn"
                                        onClick={this.onAdd}>
                                        Add Member
                                    </Button>
                                </div>
                            </div>
                        )
                    }}
                    onRefresh={this.onRefresh}
                />
                <CareTeamMemberEditor
                    isOpen={isEditorOpen}
                    memberId={selected && selected.id}
                    onClose={this.onCloseEditor}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CareTeam)
