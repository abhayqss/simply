import React, {Component} from 'react'

import cn from 'classnames'
import {map} from 'underscore'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'

import { Button } from 'reactstrap'

import Table from 'components/Table/Table'

import * as appointmentListActions from 'redux/dashboard/appointment/list/appointmentListActions'

import {isEmpty , DateUtils} from 'lib/utils/Utils'
import {PAGINATION, DASHBOARD_TYPES} from 'lib/Constants'

import './ClientUpcomingAppointments.scss'

const {FIRST_PAGE} = PAGINATION
const {
    APPOINTMENT,
} = DASHBOARD_TYPES

const {format, formats} = DateUtils

const DATE_FORMAT = formats.americanMediumDate

const APPOINTMENT_TYPE_COLORS = {
    CHECK_UP: '#fff1ca',
    ROUTINE_APPOINTMENT: '#d5f3b8',
    EMERGENCY_APPOINTMENT: '#fde1d5',
}

function mapStateToProps (state) {
    return {
        appointment: state.dashboard.appointment,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            appointment: {
                list: bindActionCreators(appointmentListActions, dispatch)
            },
        }
    }
}

class ClientUpcomingAppointments extends Component {

    componentDidMount() {
        this.refreshAppointment()
        }

    componentDidUpdate() {
        const {
            shouldReload: appointmentShouldReload
        } = this.props.appointment.list
    
        if (appointmentShouldReload)
            this.refreshAppointment()
    }

    updateAppointment(isReload, page) {
        const {
            appointment
        } = this.props

        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = appointment.list

        if (isReload || shouldReload || (!isFetching && isEmpty(ds.data))) {
            const { actions } = this.props
            const { page: p, size } = ds.pagination

            actions.appointment.list.load({
                size,
                page: page || p,
                type: APPOINTMENT
            })
        }
    }

    refreshAppointment(page) {
        this.updateAppointment(true, page || FIRST_PAGE)
    }

    clear() {
        this.props.actions.list.clear()
    }

    render () {
        const {
            className,
            appointment,
        } = this.props

        const { isFetching, dataSource } = appointment.list

        return (
            <div className={cn('ClientUpcomingAppointments', className)}>
                <Table
                    keyField='id'
                    title='Upcoming appointments'
                    isLoading={isFetching}
                    className='ClientUpcomingAppointmentList'
                    containerClass='ClientUpcomingAppointmentListContainer'
                     data={dataSource.data}
                            pagination={dataSource.pagination}
                    columns={[
                            {
                                headerStyle: {
                                    width: '85px',
                                },
                                formatter: (v, row, rowIndex) => {
                                    return (
                                        <div className="position-relative text-right">
                                            <span
                                                className="ClientUpcomingAppointments-NumberSequence">
                                                {rowIndex + 1}
                                            </span>
                                            <div
                                                style={{fontSize: 18}}>
                                                {`${row.appointment.date} ${row.appointment.month}` }
                                            </div>
                                            <span
                                                style={{fontSize: 13}}>
                                                {row.appointment.time}
                                            </span>
                                        </div>
                                    )
                                },
                            },
                            {
                                dataField: 'type',
                                text: 'Type',
                                headerStyle: {
                                    width: '115px',
                                },
                                formatter: (v, row) => {
                                    return (
                                        <span
                                            style={{backgroundColor: APPOINTMENT_TYPE_COLORS[row.appointment.type]}}
                                            className="ClientUpcomingAppointments-Status">
                                            {row.appointment.name}
                                        </span>
                                    )
                                },
                            },
                            {
                                dataField: 'location',
                                text: 'Location',
                                headerStyle: {
                                    width: '101px',
                                },
                                formatter: (v, row) => {
                                    return (
                                        <>
                                            <span
                                                className='ClientUpcomingAppointments-Location'>
                                                {row.location}
                                            </span>
                                        </>
                                    )
                                },
                            },
                            {
                                dataField: 'community',
                                text: 'Community',
                                headerStyle: {
                                    width: '107px',
                                },
                            },
                            {
                                dataField: 'provider',
                                text: 'Provider',
                                headerStyle: {
                                    width: '100px',
                                },
                                style: {color: '#33333'},
                            },
                            {
                                dataField: 'status',
                                text: 'Status',
                                headerStyle: {
                                    width: '96px',
                                },
                                style: {color: '#33333'},
                            },
                        ]}
                    renderCaption={title => {
                        return (
                            <div className='d-flex margin-bottom-15'>
                                <div className='ClientUpcomingAppointmentList-Title Table-Title'>
                                    <span>{title}</span>
                                </div>
                                <div className='flex-1 text-right'>
                                    <Button
                                        color='success'
                                        className='ClientUpcomingAppointments-ViewAllBtn'
                                        onClick={() => { alert('Coming soon') }}>
                                        View all appointments
                                    </Button>
                                </div>
                            </div>
                        )
                    }}
                    />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientUpcomingAppointments)