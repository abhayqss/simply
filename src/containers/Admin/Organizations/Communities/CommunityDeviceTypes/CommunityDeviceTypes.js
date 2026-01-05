import React, {Component} from 'react'

import cn from 'classnames'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {Badge} from 'reactstrap'

import * as sideBarActions from 'redux/sidebar/sideBarActions'
import * as communityZoneCountActions from 'redux/community/zone/count/communityZoneCountActions'
import * as communityHandsetCountActions from 'redux/community/handset/count/communityHandsetCountActions'
import * as communityLocationCountActions from 'redux/community/location/count/communityLocationCountActions'
import * as communityDeviceTypeListActions from 'redux/community/deviceType/list/communityDeviceTypeListActions'
import * as communityDeviceTypeCountActions from 'redux/community/deviceType/count/communityDeviceTypeCountActions'

import Table from 'components/Table/Table'
import Actions from 'components/Table/Actions/Actions'
import SearchField from 'components/SearchField/SearchField'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'

import {getSideBarItems} from '../SideBarItems'

import CommunityDeviceTypeModal from './CommunityDeviceTypeEditor/CommunityDeviceTypeEditor'

import {isEmpty} from 'lib/utils/Utils'
import {PAGINATION} from 'lib/Constants'

import './CommunityDeviceTypes.scss'

const {FIRST_PAGE} = PAGINATION

const ICON_SIZE = 36;

function mapStateToProps(state) {
    return {
        error: state.community.deviceType.list.error,
        isFetching: state.community.deviceType.list.isFetching,
        dataSource: state.community.deviceType.list.dataSource,
        shouldReload: state.community.deviceType.list.shouldReload,

        zoneCount: state.community.zone.count.value,
        handsetCount: state.community.handset.count.value,
        locationCount: state.community.location.count.value,
        deviceTypeCount: state.community.deviceType.count.value
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            sidebar: bindActionCreators(sideBarActions, dispatch),
            list: bindActionCreators(communityDeviceTypeListActions, dispatch),

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
            }
        },
    }
}

class CommunityDeviceTypes extends Component {
    state = {
        selected: null,
        isEditorOpen: false,
    }

    componentDidMount() {
        this.refresh()

        this.updateSideBar()

        this.loadHandsetCount()
        this.loadLocationCount()
        this.loadZoneCount()
        this.loadDeviceTypeCount()
    }

    componentDidUpdate(prevProps) {
        if (this.props.shouldReload) {
            this.refresh()
        }

        const {
            zoneCount,
            handsetCount,
            locationCount,
            deviceTypeCount,
        } = this.props

        if (zoneCount !== prevProps.zoneCount
            || handsetCount !== prevProps.handsetCount
            || locationCount !== prevProps.locationCount
            || deviceTypeCount !== prevProps.deviceTypeCount) {
            this.updateSideBar()
        }
    }

    onRefresh = page => {
        this.refresh(page)
    }

    onChangeFilterField = (name, value) => {
        this.changeFilter({ [name]: value })
    }

    onAddDeviceType = () => {
        alert('Coming soon!')
    }

    onEditDeviceType = communityDeviceTypes => {
        this.setState({
            isEditorOpen: true,
            selected: communityDeviceTypes
        })
    }

    onCloseForm = communityDeviceTypes => {
        this.setState({ isEditorOpen: false })
    }

    onDeleteDeviceType = communityDeviceTypes => {
        alert('Coming soon!')
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

            const { match, actions } = this.props

            const { orgId, commId } = match.params
            const { page: p, size } = ds.pagination

            actions.list.load({
                orgId,
                commId,
                size,
                page: page || p,
                ...ds.filter.toJS(),
            })
        }
    }

    refresh(page) {
        this.update(true, page || FIRST_PAGE)
    }

    clear() {
        this.props.actions.list.clear()
    }

    changeFilter(changes, shouldReload) {
        this
            .props
            .actions
            .list
            .changeFilter(changes, shouldReload)
    }

    loadCount() {
        this.props.actions.count.load()
    }

    getSideBarItems () {
        const {
            match,
            zoneCount,
            handsetCount,
            locationCount,
            deviceTypeCount
        } = this.props

        const { orgId, commId } = match.params

        return getSideBarItems({
            orgId,
            commId,
            zoneCount,
            handsetCount,
            locationCount,
            deviceTypeCount
        })
    }

    updateSideBar() {
        this
            .props
            .actions
            .sidebar
            .update({ items: this.getSideBarItems() })
    }

    loadHandsetCount () {
        this.props.actions.handset.count.load()
    }

    loadLocationCount () {
        this.props.actions.location.count.load()
    }

    loadZoneCount () {
        this.props.actions.zone.count.load()
    }

    loadDeviceTypeCount () {
        this.props.actions.deviceType.count.load()
    }

    render() {
        const {
            match,
            location,
            className,
            isFetching,
            dataSource: ds,
            deviceTypeCount,
        } = this.props

        const { orgId, commId } = match.params

        const { isEditorOpen, selected } = this.state

        return (
            <div className={cn('CommunityDeviceTypes', className)}>
                <Breadcrumbs
                    items={[
                        { title: 'Admin', href: '/admin' },
                        { title: 'Organizations', href: '/admin/organizations' },
                        {
                            title: 'Organization details',
                            href: `/admin/organizations/${orgId}`,
                        },
                        {
                            title: 'Community device types',
                            href: location.pathname,
                            isActive: true,
                        },
                    ]}
                />
                <Table
                    hasHover
                    hasOptions
                    hasPagination
                    keyField="id"
                    title="Device Types"
                    isLoading={isFetching}
                    className="DeviceTypesList"
                    containerClass="DeviceTypesListContainer"
                    data={ds.data}
                    pagination={ds.pagination}
                    columns={[
                        {
                            dataField: 'type',
                            text: 'Type',
                            sort: true,
                        },
                        {
                            dataField: 'workflow',
                            text: 'Workflow',
                            sort: true,
                        },
                        {
                            dataField: 'autoCloseInterval',
                            text: 'Auto Close Interval',
                            sort: true,
                        },

                        {
                            dataField: '',
                            text: '',
                            headerStyle: {
                                width: '150px',
                            },
                            align: 'right',
                            formatter: (v, row) => {
                                return (
                                    <Actions
                                        data={row}
                                        hasEditAction
                                        iconSize={ICON_SIZE}
                                        onEdit={this.onEditDeviceType}
                                    />
                                )
                            },
                        },
                    ]}
                    renderCaption={title => {
                        return (
                            <div className="DeviceTypesList-Caption">
                                <div className="flex-1">
                                    <div className="DeviceTypesList-Title Table-Title">
                                        {title}
                                        <Badge color="warning" className="DeviceTypesList-DeviceTypeCount">
                                            {deviceTypeCount}
                                        </Badge>
                                    </div>
                                    <div className="DeviceTypesList-Filter">
                                        <SearchField
                                            name="name"
                                            value={ds.filter.name}
                                            className="DeviceTypesList-FilterField"
                                            placeholder="Search by device type name"
                                            onChange={this.onChangeFilterField}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                    onRefresh={this.onRefresh}
                />
                 <CommunityDeviceTypeModal
                    isOpen={isEditorOpen}
                     communityDeviceTypeId={selected && selected.id}
                     onClose={this.onCloseForm}
                 />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityDeviceTypes)
