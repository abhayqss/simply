import React, {Component} from 'react'

import cn from 'classnames'
import {map} from 'underscore'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'

import {
    Badge,
    Button,
    ListGroup as List,
    ListGroupItem as ListItem,
} from 'reactstrap'

import Tabs from 'components/Tabs/Tabs'
import TextField from "components/Form/TextField/TextField"

import {ReactComponent as Calendar} from 'images/calendar.svg'

import EncounterChart from 'components/charts/EncounterChart/EncounterChart'

import {clientEncounters} from 'lib/mock/MockData'

import {path} from 'lib/utils/ContextUtils'

import {PAGINATION} from 'lib/Constants'
import {DateUtils as DU} from 'lib/utils/Utils'

import './ClientEncountersSummary.scss'

const { format, formats } = DU

const TIME_FORMAT = formats.time
const DATE_FORMAT = formats.americanMediumDate

const {FIRST_PAGE} = PAGINATION

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {}
    }
}

class ClientEncountersSummary extends Component {

    state = {
        tab: 0
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    updateEncountersSummary(isReload, page) {

    }

    refreshEncountersSummary(page) {
        this.updateEncountersSummary(true, page || FIRST_PAGE)
    }

    onChangeTab = tab => {
        this.setState({tab})
    }

    clear() {
        this.props.actions.list.clear()
    }

    render() {
        const { tab } = this.state

        const { className } = this.props

        return (
            <div className={cn('ClientEncountersSummary', className)}>
                <div className='ClientEncountersSummary-Title'>
                    <div className="d-flex justify-content-between">
                        <div>
                            <span className='ClientEncountersSummary-TitleText'>Encounters</span>
                            <Badge color='warning' className='ClientEncountersSummary-EncounterCount'>
                                {15}
                            </Badge>
                        </div>
                        <div>
                            <div className='ClientEncounterChart-Control'>
                                <TextField
                                    value='09/01/2018 - 02/21/2019'
                                    renderIcon={() => (
                                        <Calendar
                                            className='ClientEncounterChart-EventDateRangeIcon'
                                        />
                                    )}
                                    className='ClientEncounterChart-EventDateRange'
                                />
                            </div>
                            <Button
                                color="success"
                                className="ClientEncounterSummary-ViewEventsBtn"
                                onClick={() => { alert('Coming soon') }}>
                                View all encounters
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="ClientEncountersSummary-Body">
                    <EncounterChart
                        className='flex-1 margin-right-35'
                        renderTitle={() => ''}
                    />
                    <div className="flex-1">
                        <Tabs
                            className='margin-bottom-25'
                            items={[
                                {title: 'Non face to face', isActive: tab === 0},
                                {title: 'Face to face', isActive: tab === 1},
                            ]}
                            onChange={this.onChangeTab}
                        />
                        <List className="ClientEncounterList">
                            {map(clientEncounters, (o, i) => (
                                <div>
                                    <ListItem
                                        style={(i % 2 === 0) ? {backgroundColor: '#f9f9f9'} : null}
                                        className="ClientEncounterList-Item ClientEncounter">
                                        <div className='d-flex justify-content-between'>
                                            <Link
                                                to={path('dashboard')}
                                                className='ClientEncounter-Type'>
                                                {o.name}
                                            </Link>
                                            <span className='ClientEncounter-Date'>
                                                {format(o.startDate, DATE_FORMAT)}
                                            </span>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <span>
                                                <span className="ClientEncounter-Status">{o.status}</span>
                                            </span>
                                            <span className="ClientEncounter-Time">
                                                {format(o.startDate, TIME_FORMAT)}
                                             </span>
                                        </div>
                                    </ListItem>
                                </div>
                            ))}
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientEncountersSummary)