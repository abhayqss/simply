import React, { Component } from 'react'

import cn from 'classnames'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Badge, Button } from 'reactstrap'

import * as sideBarActions from 'redux/sidebar/sideBarActions'
import * as communityLocationListActions from 'redux/community/location/list/communityLocationListActions'
import * as communityHandsetCountActions from 'redux/community/handset/count/communityHandsetCountActions'
import * as communityLocationCountActions from 'redux/community/location/count/communityLocationCountActions'
import * as communityZoneCountActions from 'redux/community/zone/count/communityZoneCountActions'
import * as communityDeviceTypeCountActions from 'redux/community/deviceType/count/communityDeviceTypeCountActions'

import Table from 'components/Table/Table'
import Actions from 'components/Table/Actions/Actions'
import SearchField from 'components/SearchField/SearchField'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'

import { getSideBarItems } from '../SideBarItems'

import CommunityLocationModal from './CommunityLocationEditor/CommunityLocationEditor'

import { isEmpty } from 'lib/utils/Utils'
import { PAGINATION } from 'lib/Constants'

import './CommunityLocations.scss'

const { FIRST_PAGE } = PAGINATION

const ICON_SIZE = 36;

function mapStateToProps(state) {
    return {
        error: state.community.location.list.error,
        isFetching: state.community.location.list.isFetching,
        dataSource: state.community.location.list.dataSource,
        shouldReload: state.community.location.list.shouldReload,

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
            list: bindActionCreators(communityLocationListActions, dispatch),

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

class CommunityLocations extends Component {
    state = {
        selected: null,
        isEditorOpen: false,
    }

    componentDidMount() {
        const { state } = this.props.location

        this.refresh()

        this.updateSideBar()

        this.loadZoneCount()
        this.loadHandsetCount()
        this.loadLocationCount()
        this.loadDeviceTypeCount()

        if (state) {
            this.setState({isEditorOpen: state.isEditorOpen})
        }
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

    onAddLocation = () => {
        this.setState({ isEditorOpen: true })
    }

    onEditLocation = communityLocations => {
        this.setState({
            isEditorOpen: true,
            selected: communityLocations
        })
    }

    onCloseForm = communityLocations => {
        this.setState({ isEditorOpen: false })
    }

    onDeleteLocation = communityLocations => {
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
            locationCount,
            dataSource: ds
        } = this.props

        const { orgId, commId } = match.params

        const { isEditorOpen, selected } = this.state

        return (
            <div className={cn('CommunityLocations', className)}>
                <Breadcrumbs
                    items={[
                        { title: 'Admin', href: '/admin' },
                        { title: 'Organizations', href: '/admin/organizations' },
                        {
                            title: 'Organization details',
                            href: `/admin/organizations/${orgId}`,
                        },
                        {
                            title: 'Community locations',
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
                    title="Locations"
                    isLoading={isFetching}
                    className="LocationsList"
                    containerClass="LocationsListContainer"
                    data={ds.data}
                    pagination={ds.pagination}
                    columns={[
                        {
                            dataField: 'name',
                            text: 'Name',
                            sort: true,
                            headerStyle: {
                                width: '331px',
                            },
                        },
                        {
                            dataField: 'zone',
                            text: 'Zone',
                            sort: true,
                            headerStyle: {
                                width: '260px',
                            },
                        },
                        {
                            dataField: 'enabled',
                            text: 'Enabled',
                            sort: true,
                            headerStyle: {
                                width: '260px',
                            },
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
                                        hasDeleteAction
                                        iconSize={ICON_SIZE}
                                        onEdit={this.onEditLocation}
                                        onDelete={this.onDeleteLocation}
                                    />
                                )
                            },
                        },
                    ]}
                    renderCaption={title => {
                        return (
                            <div className="LocationsList-Caption">
                                <div className="flex-1">
                                    <div className="LocationsList-Title Table-Title">
                                        {title}
                                        <Badge color="warning" className="LocationsList-LocationCount">
                                            {locationCount}
                                        </Badge>
                                    </div>
                                    <div className="LocationsList-Filter">
                                        <SearchField
                                            name="name"
                                            value={ds.filter.name}
                                            className="LocationsList-FilterField"
                                            placeholder="Search by community location name"
                                            onChange={this.onChangeFilterField}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 text-right">
                                    <Button
                                        color="success"
                                        className="AddLocationBtn"
                                        onClick={this.onAddLocation}>
                                        Add Location
                                    </Button>
                                </div>
                            </div>
                        )
                    }}
                    onRefresh={this.onRefresh}
                />
                 <CommunityLocationModal
                 isOpen={isEditorOpen}
                 communityLocationId={selected && selected.id}
                 onClose={this.onCloseForm}
                 />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityLocations)
