import React, {Component} from 'react'

import cn from 'classnames'
import {map} from 'underscore'
import {Badge} from 'reactstrap'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link, withRouter} from 'react-router-dom'

import './Alerts.scss'

import Table from 'components/Table/Table'
import MultiSelect from 'components/MultiSelect/MultiSelect'

import * as tokenActions from 'redux/auth/token/tokenActions'
import * as loginActions from 'redux/auth/login/loginActions'
import * as activeAlertListActions from 'redux/notify/activeAlert/list/activeAlertListActions'
import * as systemAlertListActions from 'redux/notify/systemAlert/list/systemAlertListActions'
import * as communityTypeListActions from 'redux/directory/community/type/list/communityTypeListActions'
import * as organizationTypeListActions from 'redux/directory/organization/type/list/organizationTypeListActions'

import {ReactComponent as Oval} from 'images/oval.svg'

import {isEmpty} from 'lib/utils/Utils'
import {path} from 'lib/utils/ContextUtils'
import {PAGINATION, ALERT_TYPES, ALERT_STATUS_TYPES} from 'lib/Constants'

const {FIRST_PAGE} = PAGINATION

const {CLOSED, UNTAKEN} = ALERT_STATUS_TYPES
const {SYSTEM_ALERT, ACTIVE_ALERT} = ALERT_TYPES

function mapStateToProps (state) {
    return {
        auth: state.auth,
        notify: state.notify,

        directory: state.directory
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            activeAlert: {
                list: bindActionCreators(activeAlertListActions, dispatch),
            },
            systemAlert: {
                list: bindActionCreators(systemAlertListActions, dispatch),
            },

            directory: {
                community: {list: bindActionCreators(communityTypeListActions, dispatch)},
                organization: {list: bindActionCreators(organizationTypeListActions, dispatch)},
            },
            auth: {
                token: bindActionCreators(tokenActions, dispatch),
                login: bindActionCreators(loginActions, dispatch),
            },
        }
    }
}

class Alerts extends Component {

    componentDidMount () {
        this.refreshActive()
        this.refreshSystem()

        this.loadDirectoryData()
    }

    componentDidUpdate() {
        if (this.props.notify.activeAlert.list.shouldReload)
            this.refreshActive()

        if (this.props.notify.systemAlert.list.shouldReload)
            this.refreshSystem()
    }

    onRefreshActive = (page) => {
        this.refreshActive(page)
    }

    onRefreshSystem = (page) => {
        this.refreshSystem(page)
    }

    getStatusIndicator(status) {
        switch (status.name){
            case CLOSED: return (
                <Oval className="Alerts-OvalIcon" style={{fill: '#f33232'}}/>
            )
            case UNTAKEN: return (
                <Oval className="Alerts-OvalIcon" style={{fill: '#ffb602'}}/>
            )
            default : return ''
        }
    }

    refreshActive(page) {
        this.updateActive(true, page || FIRST_PAGE)
    }

    refreshSystem(page) {
        this.updateSystem(true, page || FIRST_PAGE)
    }

    clear () {
        this.props.actions.activeAlert.list.clear()
        this.props.actions.systemAlert.list.clear()
    }

    updateActive(isReload, page)  {
        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = this.props.notify.activeAlert.list

        if (isReload
            || shouldReload
            || (!isFetching && isEmpty(ds.data))) {

            const { actions } = this.props

            const { page: p, size } = ds.pagination

            actions.activeAlert.list.load({
                size,
                page: page || p,
                type: ACTIVE_ALERT
            })
        }
    }

    updateSystem(isReload, page)  {
        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = this.props.notify.systemAlert.list

        if (isReload
            || shouldReload
            || (!isFetching && isEmpty(ds.data))) {

            const { actions } = this.props

            const { page: p, size } = ds.pagination

            actions.systemAlert.list.load({
                size,
                page: page || p,
                type: SYSTEM_ALERT
            })
        }
    }

    loadDirectoryData() {
        const {community, organization} = this.props.actions.directory

        community.list.load()
        organization.list.load()
    }

    render () {
        const {
            notify,
            directory,
            className,
        } = this.props

        const activeAlertDs = notify.activeAlert.list.dataSource
        const systemAlertDs = notify.systemAlert.list.dataSource

        const {
            community, organization
        } = directory

        return (
            <div className={cn('Alerts', className)}>
                <div className="flex-4 text-left">
                    <MultiSelect
                        className="Alerts-OrganizationSelect"
                        options={map(organization.type.list.dataSource.data, ({id, name}) => ({
                            text: name, value: id
                        }))}
                        defaultText="Organization"
                        isMultiple={false}
                    />
                    <MultiSelect
                        className="Alerts-CommunitySelect"
                        options={map(community.type.list.dataSource.data, ({id, name}) => ({
                            text: name, value: id
                        }))}
                        defaultText="Community"
                        isMultiple={true}
                    />
                </div>
                <Table
                    hasPagination
                    isLoading={notify.activeAlert.list.isFetching}
                    keyField='id'
                    title='Active alerts'
                    className='ActiveAlertList'
                    containerClass='AlertListContainer'
                    data={activeAlertDs.data}
                    pagination={activeAlertDs.pagination}
                    columns={[
                        {dataField: 'timer', text: 'Timer', sort: false},
                        {
                            dataField: 'status',
                            text: 'Status',
                            sort: true,
                            headerStyle: {
                                width: '142px'
                            },
                            formatter: (v, row) => (
                                <div className="ActiveAlertList-Status">
                                    {this.getStatusIndicator(v)}
                                    <span className="ActiveAlertList-StatusTitle">{v.title}</span>
                                </div>
                            )
                        },
                        {dataField: 'location', text: 'Location', sort: true},
                        {dataField: 'near', text: 'Near', sort: true},
                        {dataField: 'deviceType', text: 'Device type', sort: true},
                        {dataField: 'client', text: 'Client', sort: true,
                            formatter: (v, row) => (
                                v ? (
                                    <Link
                                        className="Alerts-Resident"
                                        to={path("dashboard")}>
                                        {v}
                                    </Link>
                                ) : 'No clients'
                            )
                        },
                        {dataField: 'opened', text: 'Opened', sort: true},
                        {dataField: 'taken', text: 'Taken', sort: true},
                        {dataField: 'closed', text: 'Closed', sort: true},
                        {dataField: 'completed', text: 'Completed', sort: true}
                    ]}
                    renderCaption={title => (
                        <div className="Alerts-Caption">
                            <div className="flex-1">
                                <div className="Alerts-Title Table-Title">
                                    {title}
                                    <Badge color="warning" className="Alerts-ActiveAlertCount">
                                        {activeAlertDs.pagination.totalCount}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        )
                    }
                    onRefresh={this.onRefreshActive}
                />
                <Table
                    keyField='id'
                    title='System alerts'
                    isLoading={notify.systemAlert.list.isFetching}
                    className='SystemAlertList'
                    containerClass='AlertListContainer'
                    data={systemAlertDs.data}
                    pagination={systemAlertDs.pagination}
                    columns={[
                        {dataField: 'timer', text: 'Timer', sort: false},
                        {dataField: 'location', text: 'Location', sort: true},
                        {dataField: 'near', text: 'Near', sort: true },
                        {dataField: 'eventType', text: 'Event type', sort: true},
                        {dataField: 'deviceType', text: 'Device type', sort: true},
                        {dataField: 'client', text: 'Client', sort: true,
                            formatter: (v, row) => (
                                row.client ? (
                                    <Link
                                        className="Alerts-Resident"
                                        to={path("dashboard")}>
                                        {row.client}
                                    </Link>
                                ) : 'No clients'
                            )
                        },
                        {dataField: 'opened', text: 'Opened', sort: true,
                            headerStyle: {width: '122px'}
                        }
                    ]}
                    renderCaption={title => (
                        <div className="Alerts-Caption">
                            <div className="flex-1">
                                <div className="Alerts-Title Table-Title">
                                    {title}
                                    <Badge color="warning" className="Alerts-SystemAlertCount">
                                        {systemAlertDs.pagination.totalCount}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        )
                    }
                    onRefresh={this.onRefreshSystem}
                />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Alerts))