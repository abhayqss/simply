import React, { Component } from 'react'

import cn from 'classnames'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { Badge, Button } from 'reactstrap'

import * as sideBarActions from 'redux/sidebar/sideBarActions'
import * as communityZoneListActions from 'redux/community/zone/list/communityZoneListActions'
import * as communityHandsetCountActions from 'redux/community/handset/count/communityHandsetCountActions'
import * as communityLocationCountActions from 'redux/community/location/count/communityLocationCountActions'
import * as communityZoneCountActions from 'redux/community/zone/count/communityZoneCountActions'
import * as communityDeviceTypeCountActions from 'redux/community/deviceType/count/communityDeviceTypeCountActions'

import Table from 'components/Table/Table'
import Actions from 'components/Table/Actions/Actions'
import SearchField from 'components/SearchField/SearchField'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'

import { getSideBarItems } from '../SideBarItems'

import CommunityZoneModal from './CommunityZoneEditor/CommunityZoneEditor'

import { PAGINATION } from 'lib/Constants'
import { isEmpty, DateUtils } from 'lib/utils/Utils'

import './CommunityZones.scss'

const { FIRST_PAGE } = PAGINATION

const { format, formats } = DateUtils

const DATE_FORMAT = formats.americanMediumDate

const ICON_SIZE = 36;

function mapStateToProps (state) {
    return {
        error: state.community.zone.list.error,
        isFetching: state.community.zone.list.isFetching,
        dataSource: state.community.zone.list.dataSource,
        shouldReload: state.community.zone.list.shouldReload,

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
            list: bindActionCreators(communityZoneListActions, dispatch),

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
        }
    }
}

class CommunityZones extends Component {

    state = {
        selected:null,
        isEditorOpen: false
    }

    componentDidMount () {
        const { state } = this.props.location

        this.refresh()

        this.updateSideBar()

        this.loadHandsetCount()
        this.loadLocationCount()
        this.loadZoneCount()
        this.loadDeviceTypeCount()

        if (state) {
            this.setState({isEditorOpen: state.isEditorOpen})
        }
    }

    componentDidUpdate (prevProps) {
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

    onRefresh = (page) => {
        this.refresh(page)
    }

    onChangeFilterField = (name, value) => {
        this.changeFilter({[name]: value})
    }

    onAddZone = () => {
        this.setState({ isEditorOpen: true })
    }

    onEditZone = communityZones => {
        this.setState({
            isEditorOpen: true,
            selected: communityZones
        })
    }

    onCloseForm = communityZones => {
        this.setState({ isEditorOpen: false })
    }

    onDeleteZone = () => {
        alert('Coming soon!')
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

    refresh (page) {
        this.update(true, page || FIRST_PAGE)
    }

    clear () {
        this.props.actions.list.clear()
    }

    changeFilter (changes, shouldReload) {
        this.props
            .actions
            .list
            .changeFilter(changes, shouldReload)
    }

    getSideBarItems () {
        const {
            match,
            zoneCount,
            handsetCount,
            locationCount,
            deviceTypeCount
        } = this.props

        const {
            orgId, commId
        } = match.params

        return getSideBarItems({
            orgId,
            commId,
            zoneCount,
            handsetCount,
            locationCount,
            deviceTypeCount
        })
    }

    updateSideBar () {
        this
            .props
            .actions
            .sidebar
            .update({items: this.getSideBarItems()})
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

    render () {
        const {
            match,
            location,
            className
        } = this.props;

        const {
            orgId, commId
        } = match.params

        const {
            zoneCount,
            isFetching,
            dataSource: ds
        } = this.props;

        const { isEditorOpen, selected } = this.state

        return (
            <div className={cn('CommunityZones', className)}>
                <Breadcrumbs items={[
                    {title: 'Admin', href: '/admin'},
                    {title: 'Organizations', href: '/admin/organizations'},
                    {title: 'Organization details', href: `/admin/organizations/${orgId}`},
                    {title: 'Community zones', href: location.pathname, isActive: true},
                ]}/>
                <Table
                    hasHover
                    hasOptions
                    hasPagination
                    keyField='id'
                    title='Zones'
                    isLoading={isFetching}
                    className='CommunityZoneList'
                    containerClass='CommunityZoneListContainer'
                    data={ds.data}
                    pagination={ds.pagination}
                    columns={[
                        {
                            dataField: 'name',
                            text: 'Name',
                            sorted: true,
                            headerStyle: {
                                width: '150px',
                            }
                        },
                        {
                            dataField: 'sound',
                            text: 'Sound',
                            sorted: true,
                            headerStyle: {
                                width: '150px',
                            }
                        },
                        {
                            dataField: 'soundCount',
                            text: 'Sound Count',
                            sorted: true,
                            headerStyle: {
                                width: '150px',
                            }
                        },
                        {
                            dataField: 'soundInterval',
                            text: 'Sound Interval',
                            headerStyle: {
                                width: '150px',
                            }
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
                                        onEdit={this.onEditZone}
                                        onDelete={this.onDeleteZone}
                                    />
                                )
                            }
                        }
                    ]}
                    renderCaption={title => {
                        return (
                            <div className='CommunityZoneList-Caption'>
                                <div className='flex-1'>
                                    <div className='CommunityZoneList-Title Table-Title'>
                                        {title}
                                        <Badge color='warning' className='CommunityZoneList-CommunityZoneCount'>
                                            {zoneCount}
                                        </Badge>
                                    </div>
                                    <div className='CommunityZoneList-Filter'>
                                        <SearchField
                                            name='name'
                                            value={ds.filter.name}
                                            className='CommunityZoneList-FilterField'
                                            placeholder='Search by organization name'
                                            onChange={this.onChangeFilterField}
                                        />
                                    </div>
                                </div>
                                <div className='flex-1 text-right'>
                                    <Button
                                        color='success'
                                        className='AddCommunityZoneBtn'
                                        onClick={this.onAddZone}>
                                        Add Zone
                                    </Button>
                                </div>
                            </div>
                        )
                    }}
                    onRefresh={this.onRefresh}
                />
                <CommunityZoneModal
                    isOpen={isEditorOpen}
                    communityZoneId={selected && selected.id}
                    onClose={this.onCloseForm}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityZones)