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

import TextField from "components/Form/TextField/TextField"
import ActionButtonList from "components/ActionButtonList/ActionButtonList"
import ClientEventUtilizationChart from 'components/charts/ClientEventUtilizationChart/ClientEventUtilizationChart'

import {ReactComponent as Calendar} from 'images/calendar.svg'

import {path} from 'lib/utils/ContextUtils'

import {PAGINATION} from 'lib/Constants'

import './ClientEventUtilizationSummary.scss'

const {FIRST_PAGE} = PAGINATION

const OPTIONS = [
    {name: 'MONTH_VIEW', text: 'Month view', value: 0},
    {name: 'WEEK_VIEW', text: 'Week view', value: 0},
    {name: 'YEAR_VIEW', text: 'Year view', value: 0}
]

function mapStateToProps (state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {

        }
    }
}

class ClientEventUtilizationSummary extends Component {

    state = {
        tab: 0
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    updateMedicationsSummary(isReload, page) {

    }

    refreshMedicationsSummary(page) {
        this.updateMedicationsSummary(true, page || FIRST_PAGE)
    }

    onChangeTab = tab => {
        this.setState({tab})
    }

    clear() {
        this.props.actions.list.clear()
    }

    render () {
        const { className } = this.props

        return (
            <div className={cn('ClientEventUtilizationSummary', className)}>
                <ClientEventUtilizationChart
                    renderTitle={() => (
                        <div className='d-flex justify-content-between'>
                            <div>
                                <span className='ClientEventUtilizationChart-TitleText'>Event Utilization</span>
                                <Badge color='warning' className='ClientEventUtilizationSummary-EventCount'>
                                    {24}
                                </Badge>
                            </div>
                            <div>
                                <div className='ClientEventUtilizationChart-Control'>
                                    <ActionButtonList
                                        defaultText={'Month view'}
                                        options={OPTIONS}
                                        className='ClientEventUtilizationChart-ViewMode'
                                    />
                                    <TextField
                                        value='09/01/2018 - 02/21/2019'
                                        renderIcon={() => (
                                            <Calendar
                                                className='ClientEventUtilizationChart-EventDateRangeIcon'
                                            />
                                        )}
                                        className='ClientEventUtilizationChart-EventDateRange'
                                    />
                                </div>
                                <Button
                                    color="success"
                                    className="ClientEventUtilizationSummary-ViewEventsBtn"
                                    onClick={() => { alert('Coming soon') }}>
                                    View all events
                                </Button>
                            </div>
                        </div>
                    )}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientEventUtilizationSummary)