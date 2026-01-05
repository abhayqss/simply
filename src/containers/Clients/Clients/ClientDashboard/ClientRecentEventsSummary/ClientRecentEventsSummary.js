import React, {Component} from 'react'

import cn from 'classnames';
import {map} from 'underscore'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'

import {
    Badge,
    Button,
    ListGroup as List,
    Card as ReactstrapCard,
    ListGroupItem as ListItem,
} from 'reactstrap'

import Loader from 'components/Loader/Loader'

import * as dashboardEventListActions from 'redux/dashboard/event/list/dashboardEventListActions'

import {path} from 'lib/utils/ContextUtils'

import { events } from 'lib/mock/MockData'
import { isEmpty, DateUtils as DU } from 'lib/utils/Utils'
import {PAGINATION, DASHBOARD_TYPES} from 'lib/Constants'

import './ClientRecentEventsSummary.scss'

const {FIRST_PAGE} = PAGINATION

const {
    RECENT_EVENT,
} = DASHBOARD_TYPES

const { format, formats } = DU

const TIME_FORMAT = formats.time
const DATE_FORMAT = formats.americanMediumDate

const IR_STATUS_BADGE_TYPES = {
    'DRAFT': 'default',
    'SUBMITTED': 'danger'
}

const IR_STATUS_TITLES = {
    'DRAFT': 'Draft incident report',
    'SUBMITTED': 'Incident report submitted'
}

function mapStateToProps (state) {
    return {
        recentEvent: state.dashboard.recentEvent,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            recentEvent: {
                list: bindActionCreators(dashboardEventListActions, dispatch)
            },
        }
    }
}

class ClientRecentEventsSummary extends Component {

    componentDidMount() {
        //this.refreshRecentEvent()
    }

    componentDidUpdate() {
        const {
            shouldReload: recentEventShouldReload
        } = this.props.recentEvent.list

        if (recentEventShouldReload)
            this.refreshRecentEvent()
    }

    onViewMoreEvents () {

    }

    updateRecentEvent(isReload, page) {
        const {
            recentEvent
        } = this.props

        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = recentEvent.list

        if (isReload || shouldReload || (!isFetching && isEmpty(ds.data))) {
            const { actions } = this.props
            const { page: p, size } = ds.pagination

            actions.recentEvent.list.load({
                size,
                page: page || p,
                type: RECENT_EVENT
            })
        }
    }

    refreshRecentEvent(page) {
        this.updateRecentEvent(true, page || FIRST_PAGE)
    }

    clear() {
        this.props.actions.list.clear()
    }

    render () {
        const {
            className
        } = this.props

        return (
            <div className={cn('ClientRecentEventsSummary', className)}>
                <div className='ClientRecentEventsSummary-Title'>Recent Events</div>
                <List className="ClientEventList">
                    {map(events, o => (
                        <div className='ClientEventList-ItemWrapper'>
                            <ListItem className="ClientEventList-Item ClientEvent">
                                <div className='d-flex justify-content-between'>
                                    <div className='ClientEvent-Type'>
                                        {o.type}
                                    </div>
                                    <div className='ClientEvent-Date'>
                                        {format(o.date, DATE_FORMAT)}
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between margin-top-5'>
                                    <Badge
                                        className='ClientEvent-IrStatus'
                                        color={o.hasIr ? IR_STATUS_BADGE_TYPES[o.irStatus] : 'success'}>
                                        {o.hasIr ? IR_STATUS_TITLES[o.irStatus] : 'No incident report'}
                                    </Badge>
                                    <div className='ClientEvent-Time'>
                                        {format(o.date, TIME_FORMAT)}
                                    </div>
                                </div>
                            </ListItem>
                        </div>
                    ))}
                </List>
                <div className='text-right'>
                    <Button
                        color="success"
                        className="ClientRecentEventsSummary-ViewMoreBtn"
                        onClick={() => {alert('Coming Soon')}}>
                        View more
                    </Button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientRecentEventsSummary)