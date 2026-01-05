import React, {Component} from 'react'

import cn from 'classnames'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {Badge, Button} from 'reactstrap'

import * as sideBarActions from 'redux/sidebar/sideBarActions'
import * as communityZoneCountActions from 'redux/community/zone/count/communityZoneCountActions'
import * as communityHandsetListActions from 'redux/community/handset/list/communityHandsetListActions'
import * as communityHandsetCountActions from 'redux/community/handset/count/communityHandsetCountActions'
import * as communityLocationCountActions from 'redux/community/location/count/communityLocationCountActions'
import * as communityDeviceTypeCountActions from 'redux/community/deviceType/count/communityDeviceTypeCountActions'

import Table from 'components/Table/Table'
import Actions from 'components/Table/Actions/Actions'
import SearchField from 'components/SearchField/SearchField'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'

import {getSideBarItems} from '../SideBarItems'

import CommunityHandsetModal from './CommunityHandsetEditor/CommunityHandsetEditor'

import {PAGINATION} from 'lib/Constants'
import {isEmpty, DateUtils} from 'lib/utils/Utils'

import './CommunityHandsets.scss'

const {FIRST_PAGE} = PAGINATION

const ICON_SIZE = 36;

function mapStateToProps (state) {
    return {
        error: state.community.handset.list.error,
        isFetching: state.community.handset.list.isFetching,
        dataSource: state.community.handset.list.dataSource,
        shouldReload: state.community.handset.list.shouldReload,

        count: state.community.handset.count.value,
        zoneCount: state.community.zone.count.value,
        locationCount: state.community.location.count.value,
        deviceTypeCount: state.community.deviceType.count.value
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            list: bindActionCreators(communityHandsetListActions, dispatch),
            count: bindActionCreators(communityHandsetCountActions, dispatch),
            sidebar: bindActionCreators(sideBarActions, dispatch),
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

class CommunityHandsets extends Component {

    state = {
        selected:null,
        isEditorOpen: false,
    }

    componentDidMount () {
        const { state } = this.props.location

        this.refresh()

        this.updateSideBar()

        this.loadCount()
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
            count,
            zoneCount,
            locationCount,
            deviceTypeCount,
        } = this.props

        if (count !== prevProps.count
            ||zoneCount !== prevProps.zoneCount
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

    onAddHandset = () => {
        this.setState({ isEditorOpen: true })
    }

    onEditHandset = communityHandsets => {
        this.setState({
            isEditorOpen: true,
            selected: communityHandsets
        })
    }

    onCloseForm = communityHandsets => {
        this.setState({ isEditorOpen: false })
    }

    onDeleteHandset = () => {
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

    loadCount () {
        this.props.actions.count.load()
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

    getSideBarItems () {
        const {
            match,
            count,
            zoneCount,
            locationCount,
            deviceTypeCount
        } = this.props

        const { orgId, commId } = match.params

        return getSideBarItems({
            orgId,
            commId,
            zoneCount,
            locationCount,
            deviceTypeCount,
            handsetCount: count,
        })
    }

    updateSideBar () {
        this
            .props
            .actions
            .sidebar
            .update({items: this.getSideBarItems()})
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
            count,
            isFetching,
            dataSource: ds
        } = this.props;

        const { isEditorOpen, selected } = this.state

        return (
            <div className={cn('CommunityHandsets', className)}>
                <Breadcrumbs items={[
                    {title: 'Admin', href: '/admin'},
                    {title: 'Organizations', href: '/admin/organizations'},
                    {title: 'Organization details', href: `/admin/organizations/${orgId}`},
                    {title: 'Community handsets', href: location.pathname, isActive: true},
                ]}/>
                <Table
                    hasHover
                    hasOptions
                    hasPagination
                    keyField='id'
                    title='Handsets'
                    isLoading={isFetching}
                    className='CommunityHandsetList'
                    containerClass='CommunityHandsetListContainer'
                    data={ds.data}
                    pagination={ds.pagination}
                    columns={[
                        {
                            dataField: 'name',
                            text: 'Name',
                            headerStyle: {
                                width: '150px',
                            }
                        },
                        {
                            dataField: 'displayName',
                            text: 'Display Name',                         
                            headerStyle: {
                                width: '150px',
                            }
                        },
                        {
                            dataField: 'handsetId',
                            text: 'Handset ID',
                            headerStyle: {
                                width: '300px',
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
                                        onEdit={this.onEditHandset}
                                        onDelete={this.onDeleteHandset}
                                    />
                                )
                            }
                        }
                    ]}
                    renderCaption={title => {
                        return (
                            <div className='CommunityHandsetList-Caption'>
                                <div className='flex-1'>
                                    <div className='CommunityHandsetList-Title Table-Title'>
                                        {title}
                                        <Badge color='warning' className='CommunityHandsetList-CommunityHandsetCount'>
                                            {count}
                                        </Badge>
                                    </div>
                                    <div className='CommunityHandsetList-Filter'>
                                        <SearchField
                                            name='name'
                                            value={ds.filter.name}
                                            className='CommunityHandsetList-FilterField'
                                            placeholder='Search by organization name'
                                            onChange={this.onChangeFilterField}
                                        />
                                    </div>
                                </div>
                                <div className='flex-1 text-right'>
                                    <Button
                                        color='success'
                                        className='AddCommunityHandsetBtn'
                                        onClick={this.onAddHandset}>
                                        Add Handset
                                    </Button>
                                </div>
                            </div>
                        )
                    }}
                    onRefresh={this.onRefresh}
                />
                <CommunityHandsetModal
                    isOpen={isEditorOpen}
                    communityHandsetId={selected && selected.id}
                    onClose={this.onCloseForm}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityHandsets)