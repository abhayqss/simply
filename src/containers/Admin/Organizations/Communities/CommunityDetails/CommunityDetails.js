import React, { Component } from 'react'

import cn from 'classnames'
import { findWhere } from 'underscore'
import { Button, Row, Col } from 'reactstrap'
import DocumentTitle from 'react-document-title'

import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { bindActionCreators } from 'redux'

import Table from 'components/Table/Table'
import Loader from 'components/Loader/Loader'
import Detail from 'components/Detail/Detail'
import Actions from 'components/Table/Actions/Actions'
import SearchField from 'components/SearchField/SearchField'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import ErrorViewer from 'components/ErrorViewer/ErrorViewer'
import ConfirmDialog from 'components/dialogs/ConfirmDialog/ConfirmDialog'
import SuccessDialog from 'components/dialogs/SuccessDialog/SuccessDialog'

import './CommunityDetails.scss'

import * as sideBarActions from 'redux/sidebar/sideBarActions'
import * as communityLogoActions from 'redux/community/logo/communityLogoActions'
import * as communityFormActions from 'redux/community/form/communityFormActions'
import * as communityDetailsActions from 'redux/community/details/communityDetailsActions'
import * as careTeamMemberListActions from 'redux/care/team/member/list/careTeamMemberListActions'

import * as communityZoneCountActions from 'redux/community/zone/count/communityZoneCountActions'
import * as communityHandsetCountActions from 'redux/community/handset/count/communityHandsetCountActions'
import * as communityLocationCountActions from 'redux/community/location/count/communityLocationCountActions'
import * as communityDeviceTypeCountActions from 'redux/community/deviceType/count/communityDeviceTypeCountActions'

import { promise, isEmpty } from 'lib/utils/Utils'

import {
    PAGINATION,
    SYSTEM_ROLES,
    COMMUNITY_ITEMS,
    SERVER_ERROR_CODES
} from 'lib/Constants'

import { getSideBarItems } from '../SideBarItems'

import CommunityEditor from '../CommunityEditor/CommunityEditor'
import CareTeamMemberEditor from '../../../../Clients/Clients/CareTeam/CareTeamMemberEditor/CareTeamMemberEditor'

import { path } from 'lib/utils/ContextUtils'

import { ReactComponent as Warning } from 'images/alert-yellow.svg'

const { NOTIFY_USER } = SYSTEM_ROLES

const { FIRST_PAGE } = PAGINATION

const ICON_SIZE = 36

const {
    ADD_ZONE,
    ADD_HANDSET,
    ADD_LOCATION,
} = COMMUNITY_ITEMS

const OPTIONS = [
    { name: 'ADD_ZONE', text: 'Add Zone', value: 0 },
    { name: 'ADD_LOCATION', text: 'Add Location', value: 1 },
    { name: 'ADD_HANDSET', text: 'Add Handset', value: 2 },
]

function isIgnoredError (e = {}) {
    return e.code === SERVER_ERROR_CODES.ACCOUNT_INACTIVE
}

function mapStateToProps (state) {

    const {
        zone,
        handset,
        location,
        deviceType,

        details,
    } = state.community

    return {
        data: details.data,
        error: details.error,
        isFetching: details.isFetching,
        shouldReload: details.shouldReload,

        zone,
        handset,
        location,
        deviceType,

        auth: state.auth,
        care: state.care,
        sidebar: state.sidebar
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(communityDetailsActions, dispatch),

            logo: bindActionCreators(communityLogoActions, dispatch),
            form: bindActionCreators(communityFormActions, dispatch),

            handset: {
                count: bindActionCreators(communityHandsetCountActions, dispatch)
            },
            location: {
                count: bindActionCreators(communityLocationCountActions, dispatch)
            },
            zone: {
                count: bindActionCreators(communityZoneCountActions, dispatch)
            },
            deviceType: {
                count: bindActionCreators(communityDeviceTypeCountActions, dispatch)
            },
            care: {
                team: {
                    member: {
                        list: bindActionCreators(careTeamMemberListActions, dispatch),
                    }
                },
            },

            sidebar: bindActionCreators(sideBarActions, dispatch)
        }
    }
}

class CommunityDetails extends Component {

    state = {
        isEditorOpen: false,
        selectedOption: null,
        isSaveSuccessDialogOpen: false,
        isCancelEditConfirmDialogOpen: false,

        selectedMember: null,
        isCareTeamMemberEditorOpen: false,
    }

    componentDidMount () {
        this.refresh().then(() => {
            this.loadLogo()
        })

        this.refreshCareTeam()

        this.updateSideBar()

        this.loadZoneCount().then(() => {
            this.updateSideBar()
        })

        this.loadHandsetCount().then(() => {
            this.updateSideBar()
        })

        this.loadLocationCount().then(() => {
            this.updateSideBar()
        })

        this.loadDeviceTypeCount().then(() => {
            this.updateSideBar()
        })
    }

    componentDidUpdate () {
        const {
            care,
            sidebar,
            shouldReload
        } = this.props

        if (shouldReload) {
            this.refresh().then(() => {
                this.loadLogo()
            })
        }

        if (care.team.member.shouldReload) {
            this.refreshCareTeam()
        }

        if (!(sidebar.isHidden || this.isNotifyUser())) {
            this.updateSideBar({ isHidden: true })
        }
    }

    componentWillUnmount () {
        this.clear()
    }

    onChangeFilterField = (name, value) => {
        this.changeFilter({ [name]: value })
    }

    onEditCommunity = () => {
        this.setState({
            isEditorOpen: true,
        })
    }

    onCancelConfirmDialog = () => {
        this.setState({
            isCancelEditConfirmDialogOpen: false
        })
    }

    onCloseEditor = (shouldConfirm = false) => {
        this.setState({
            isEditorOpen: shouldConfirm,
            isSaveSuccessDialogOpen: false,
            isCancelEditConfirmDialogOpen: shouldConfirm
        })

        !shouldConfirm && this.props.actions.form.clear()
    }

    onSaveSuccess = (id) => {
        this.setState(s => ({
            selectedMember: { id },
            isEditorOpen: false,
            isSaveSuccessDialogOpen: true,
        }))
    }

    onSelectingOption = value => {
        this.setState({
            selectedOption: findWhere(OPTIONS, { value }),
        })
    }

    onAddCareTeamMember = () => {
        this.setState({
            isCareTeamMemberEditorOpen: true
        })
    }

    onEditCareTeamMember = careTeamMember => {
        this.setState({
            selectedMember: careTeamMember,
            isCareTeamMemberEditorOpen: true,
        })
    }

    onDeleteCareTeamMember = () => {
        alert('Coming Soon')
    }

    onCloseCareTeamMemberForm = () => {
        this.setState({
            selectedMember: null,
            isCareTeamMemberEditorOpen: false
        })
    }

    onVideoCallingCareTeamMember = () => {
        alert('Coming Soon')
    }

    onCareTeamRefresh = page => {
        this.refreshCareTeam(page)
    }

    onResetError = () => {
        this.props.actions.clearError()
    }

    getError () {
        return this.props.error
    }

    isNotifyUser () {
        const { data } = this.props.auth.login.user
        return data && data.roleName === NOTIFY_USER
    }

    updateSideBar (opts) {
        this
            .props
            .actions
            .sidebar
            .update({
                items: this.getSideBarItems(),
                ...opts
            })
    }

    loadLogo () {
        const {
            match,
            actions
        } = this.props

        actions
            .logo
            .download(
                +match.params.orgId,
                +match.params.commId,
            )
    }

    getSideBarItems () {
        const {
            match,
            zone,
            handset,
            location,
            deviceType,
        } = this.props

        const { orgId, commId } = match.params

        return getSideBarItems({
            orgId,
            commId,
            zoneCount: zone.count.value,
            handsetCount: handset.count.value,
            locationCount: location.count.value,
            deviceTypeCount: deviceType.count.value,
        })
    }

    update (isReload) {
        const { data } = this.props


        if (isReload || isEmpty(data)) {
            const { actions, match } = this.props
            const { orgId, commId } = match.params

            return actions.load(+orgId, +commId, true)
        }

        return promise()
    }

    updateCareTeam (isReload, page) {
        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = this.props.care.team.member.list

        if (isReload
            || shouldReload
            || (!isFetching && isEmpty(ds.data))) {

            const { actions, match } = this.props
            const { orgId, commId } = match.params

            const { page: p, size } = ds.pagination

            actions.care.team.member.list.load({
                orgId,
                size,
                page: page || p,
                ...ds.filter.toJS(),
                communityId: commId,
            })
        }
    }

    refresh () {
        return this.update(true)
    }

    refreshCareTeam (page) {
        this.updateCareTeam(true, page || FIRST_PAGE)
    }

    clear () {
        this
            .props
            .actions
            .clear()
    }

    changeFilter (changes, shouldReload) {
        const { actions } = this.props

        actions
            .care
            .team
            .member
            .list
            .changeFilter(changes, shouldReload)
    }

    isLoading () {
        const { isFetching, shouldReload } = this.props

        return isFetching || shouldReload
    }

    getURL (type) {
        const { orgId, commId } = this.props.match.params

        switch (type) {
            case ADD_ZONE:
                return path(`admin/organizations/${orgId}/communities/${commId}/zones`)
            case ADD_HANDSET:
                return path(`admin/organizations/${orgId}/communities/${commId}/handsets`)
            case ADD_LOCATION:
                return path(`admin/organizations/${orgId}/communities/${commId}/locations`)

            default:
                return ''
        }
    }

    loadHandsetCount () {
        return this.props.actions.handset.count.load()
    }

    loadLocationCount () {
        return this.props.actions.location.count.load()
    }

    loadZoneCount () {
        return this.props.actions.zone.count.load()
    }

    loadDeviceTypeCount () {
        return this.props.actions.deviceType.count.load()
    }

    render () {
        const {
            care,
            data,
            match,
            className,
        } = this.props;

        const {
            isEditorOpen,
            selectedOption,
            isCancelEditConfirmDialogOpen,
            isSaveSuccessDialogOpen,

            selectedMember,
            isCareTeamMemberEditorOpen
        } = this.state

        if (selectedOption) {
            return (
                <Redirect
                    push
                    to={{
                        state: { isEditorOpen: true },
                        pathname: this.getURL(selectedOption.name),
                    }}
                />
            )
        }

        const { orgId, commId } = match.params

        let content = null

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
            const careTeamMemberListDs = care.team.member.dataSource

            content = (
                <>
                    <Breadcrumbs items={[
                        { title: 'Organizations', href: '/admin/organizations', isEnabled: true },
                        { title: 'Organization details', href: '/admin/organizations/' + orgId },
                        {
                            title: 'Community details',
                            href: '/admin/organizations/' + orgId + '/communities',
                            isActive: true
                        }
                    ]}/>
                    <div className="CommunityDetails-Header">
                        <div className="CommunityDetails-Title">
                            <div
                                className="CommunityDetails-TitleWrapper"
                                title={data.name}>
                                {data.name}
                            </div>
                        </div>
                        <div>
                            {/*<MultiSelect
                                defaultText={'Add to community'}
                                isMultiple={false}
                                options={OPTIONS}
                                className={'CommunityDetails-AddToSelect'}
                                onChange={this.onSelectingOption}
                            />*/}
                            {data.canEdit && (
                                <Button
                                    color='success'
                                    className='CommunityDetails-EditBtn'
                                    onClick={this.onEditCommunity}>
                                    Edit details
                                </Button>
                            )}
                        </div>
                    </div>
                    <Detail
                        className="CommunityDetail"
                        titleClassName="CommunityDetail-Title"
                        valueClassName="CommunityDetail-Value"
                        title="Community Oid">
                        {data.oid}
                    </Detail>
                    <Detail
                        className="CommunityDetail"
                        titleClassName="CommunityDetail-Title"
                        valueClassName="CommunityDetail-Value"
                        title="Email">
                        {data.email}
                    </Detail>
                    <Detail
                        className="CommunityDetail"
                        titleClassName="CommunityDetail-Title"
                        valueClassName="CommunityDetail-Value"
                        title="Phone">
                        {data.phone}
                    </Detail>
                    <Detail
                        className="CommunityDetail"
                        titleClassName="CommunityDetail-Title"
                        valueClassName="CommunityDetail-Value"
                        title="Address">
                        {data.displayAddress}
                    </Detail>
                    <Detail
                        className="CommunityDetail"
                        titleClassName="CommunityDetail-Title"
                        valueClassName="CommunityDetail-Value"
                        title="Organization">
                        {data.organizationName}
                    </Detail>
                    {data.logoDataUrl && (
                        <Detail
                            className="CommunityDetail"
                            titleClassName="CommunityDetail-Title"
                            valueClassName="CommunityDetail-Value"
                            title="Logo">
                            <img
                                className="CommunityDetail-Logo"
                                src={data.logoDataUrl} alt=""
                            />
                        </Detail>
                    )}
                    <Detail
                        className="CommunityDetail"
                        titleClassName="CommunityDetail-Title"
                        valueClassName="CommunityDetail-Value"
                        title="Community clients participate in sharing data">
                        {data.isSharingData ? 'Yes' : 'No'}
                    </Detail>

                    {false && (
                        <Table
                            hasHover
                            hasOptions
                            hasPagination
                            keyField='id'
                            title='Care Team'
                            isLoading={care.team.member.isFetching}
                            className='CareTeamMemberList'
                            containerClass='CareTeamMemberListContainer'
                            data={careTeamMemberListDs.data}
                            pagination={careTeamMemberListDs.pagination}
                            columns={[
                                {
                                    dataField: 'member', text: 'Member', sort: true,
                                    formatter: (v, row) => {
                                        return (
                                            <Row>
                                                {/* <Col md={4}>
                                                <Image className="CareTeamMemberList-MemberAvatar" src={row.userAvatar} />
                                            </Col>*/}
                                                <Col md={8}>
                                                    <Row>
                                                    <span
                                                        className="CareTeamMemberList-MemberName">{row.employee.label}</span>
                                                    </Row>
                                                    <Row>
                                                    <span
                                                        className="CareTeamMemberList-MemberRelation">{row.role.label}</span>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        )
                                    }
                                },
                                { dataField: 'description', text: 'Description' },
                                {
                                    dataField: 'contacts', text: 'Contacts', sort: true,
                                    formatter: (v, row) => {
                                        return (
                                            <Row>
                                                <Col md={12}>
                                                    <Row>
                                                    <span
                                                        className="CareTeamMemberList-Label">{row.address.displayAddress}</span>
                                                    </Row>
                                                    <Row>
                                                        <span className="CareTeamMemberList-Label">{row.phone}</span>
                                                    </Row>
                                                    <Row>
                                                        <span className="CareTeamMemberList-Label">{row.email}</span>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        )
                                    }
                                },
                                {
                                    dataField: '', text: '', formatter: (v, row) => {
                                        return (
                                            <div className="CareTeamMemberList-Actions">
                                                <Actions
                                                    data={row}
                                                    hasEditAction={row.isEditable}
                                                    hasDeleteAction={row.isDeletable}
                                                    hasVideoCallAction={row.videoCall}
                                                    iconSize={ICON_SIZE}
                                                    onEdit={this.onEditCareTeamMember}
                                                    onDelete={this.onDeleteCareTeamMember}
                                                    onVideoCall={this.onVideoCallingCareTeamMember}

                                                />
                                            </div>
                                        )
                                    }
                                }
                            ]}
                            renderCaption={title => {
                                return (
                                    <div className='CareTeamMemberList-Caption'>
                                        <div className='flex-2'>
                                            <div className='CareTeamMemberList-Title Table-Title'>
                                                {title}
                                            </div>
                                            <div className='CommunityDetails-Filter'>
                                                <SearchField
                                                    name='name'
                                                    className='CommunityDetails-FilterField'
                                                    placeholder='Search by community name'
                                                    value={careTeamMemberListDs.filter.name}
                                                    onChange={this.onChangeFilterField}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex-4 text-right'>
                                            <Button
                                                color='success'
                                                className='AddCareMemberBtn'
                                                onClick={this.onAddCareTeamMember}>
                                                Add Member
                                            </Button>
                                        </div>
                                    </div>
                                )
                            }}
                            onRefresh={this.onCareTeamRefresh}
                        />
                    )}
                </>
            )
        }

        const error = this.getError()

        return (
            <DocumentTitle title="Simply Connect | Admin | Organizations | Organization Details | Community Details">
                <div className={cn('CommunityDetails', className)}>
                    {content}
                    {isEditorOpen && (
                        <CommunityEditor
                            isOpen={isEditorOpen}
                            communityId={+commId}
                            organizationId={+orgId}
                            onClose={this.onCloseEditor}
                            onSaveSuccess={this.onSaveSuccess}
                        />
                    )}
                    {isSaveSuccessDialogOpen && (
                        <SuccessDialog
                            isOpen={isSaveSuccessDialogOpen}
                            text="Community details have been updated."
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
                    {isCareTeamMemberEditorOpen && (
                        <CareTeamMemberEditor
                            isOpen={isCareTeamMemberEditorOpen}
                            careTeamMemberId={selectedMember && selectedMember.id}
                            onClose={this.onCloseCareTeamMemberForm}
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

export default connect(mapStateToProps, mapDispatchToProps)(CommunityDetails)