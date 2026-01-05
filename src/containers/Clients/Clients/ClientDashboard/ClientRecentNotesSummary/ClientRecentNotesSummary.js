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

import * as dashboardNoteListActions from 'redux/dashboard/note/list/dashboardNoteListActions'

import {path} from 'lib/utils/ContextUtils'

import { notes } from 'lib/mock/MockData'
import { isEmpty, DateUtils as DU } from 'lib/utils/Utils'
import {PAGINATION, DASHBOARD_TYPES} from 'lib/Constants'

import './ClientRecentNotesSummary.scss'

const {FIRST_PAGE} = PAGINATION

const {
    RECENT_NOTE,
} = DASHBOARD_TYPES

const { format, formats } = DU

const TIME_FORMAT = formats.time
const DATE_FORMAT = formats.americanMediumDate

const EVENT_TYPE_BADGE_TYPES = ['success', 'warning', 'danger', 'default']

function mapStateToProps (state) {
    return {
        recentNote: state.dashboard.recentNote,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            recentNote: {
                list: bindActionCreators(dashboardNoteListActions, dispatch)
            },
        }
    }
}

function Card({ className, children, title, isFetching, onLoadMore }) {
    return (
        <ReactstrapCard className={className}>
            <span className="ClientRecentNotesSummary-CardTitle">
                {title}
            </span>
            {children}
            {!isFetching &&  (
                <div>
                    <Button
                        color='success'
                        className="ClientRecentNotesSummary-ViewMoreBtn"
                        onClick={onLoadMore}>
                        View More
                    </Button>
                </div>
            )}
        </ReactstrapCard>
    )
}

class ClientRecentNotesSummary extends Component {

    componentDidMount() {
        //this.refreshRecentNote()
    }

    componentDidUpdate() {
        const {
            shouldReload: recentNoteShouldReload
        } = this.props.recentNote.list

        if (recentNoteShouldReload)
            this.refreshRecentNote()
    }

    onViewMoreNotes () {

    }

    updateRecentNote(isReload, page) {
        const {
            recentNote
        } = this.props

        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = recentNote.list

        if (isReload || shouldReload || (!isFetching && isEmpty(ds.data))) {
            const { actions } = this.props
            const { page: p, size } = ds.pagination

            actions.recentNote.list.load({
                size,
                page: page || p,
                type: RECENT_NOTE
            })
        }
    }

    refreshRecentNote(page) {
        this.updateRecentNote(true, page || FIRST_PAGE)
    }

    clear() {
        this.props.actions.list.clear()
    }

    render () {
        const {
            className
        } = this.props

        return (
            <div className={cn('ClientRecentNotesSummary', className)}>
                <div className='ClientRecentNotesSummary-Title'>Recent Notes</div>
                <List className="ClientNoteList">
                    {map(notes, o => (
                        <div className='ClientNoteList-ItemWrapper'>
                            <ListItem className="ClientNoteList-Item ClientNote">
                                <div className='d-flex justify-content-between'>
                                    <div className='ClientNote-Text'>
                                        {o.text}
                                    </div>
                                    <div className='ClientNote-Date'>
                                        {format(o.date, DATE_FORMAT)}
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between margin-top-5'>
                                    <Badge
                                        className='ClientNote-EventType'
                                        color={EVENT_TYPE_BADGE_TYPES[o.eventTypeId]}>
                                        {o.eventType}
                                    </Badge>
                                    <div className='ClientNote-Time'>
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
                        className="ClientRecentNotesSummary-ViewMoreBtn"
                        onClick={() => {alert('Coming Soon')}}>
                        View more
                    </Button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientRecentNotesSummary)