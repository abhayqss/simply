import React, {Component} from 'react'

import {map} from 'underscore'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'

import {
    Badge,
    ListGroup as List,
    ListGroupItem as ListItem,
} from 'reactstrap'

import Tabs from 'components/Tabs/Tabs'
import ProblemsBarChart from 'components/charts/ProblemsBarChart/ProblemsBarChart'

import {clientProblemsSummary} from 'lib/mock/MockData'

import {path} from 'lib/utils/ContextUtils'

import {DateUtils as DU} from "lib/utils/Utils"
import {PAGINATION} from 'lib/Constants'

import './ClientProblemsSummary.scss'

const {FIRST_PAGE} = PAGINATION

const {format, formats} = DU

const TIME_FORMAT = formats.time
const DATE_FORMAT = formats.americanMediumDate

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

class ClientProblemsSummary extends Component {

    state = {
        tab: 0
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    updateProblemsSummary(isReload, page) {

    }

    refreshProblemsSummary(page) {
        this.updateProblemsSummary(true, page || FIRST_PAGE)
    }

    onChangeTab = tab => {
        this.setState({tab})
    }

    clear() {
        this.props.actions.list.clear()
    }

    render () {
        const { tab } = this.state

        return (
            <div className="ClientProblemsSummary">
                <div className='ClientProblemsSummary-Title'>
                    <span className='ClientProblemsSummary-TitleText'>Problems</span>
                    <Badge color='warning' className='ClientProblemsSummary-ProblemsCount'>
                        {23}
                    </Badge>
                </div>
                <div className="ClientProblemsSummary-Body">
                    <ProblemsBarChart
                        className='flex-1 margin-right-35'
                        renderTitle={() => ''}
                    />
                    <div className="flex-1">
                        <Tabs
                            className='margin-bottom-25'
                            items={[
                                {title: 'Active', isActive: tab === 0},
                                {title: 'Resolved', isActive: tab === 1},
                                {title: 'Other', isActive: tab === 2},
                            ]}
                            onChange={this.onChangeTab}
                        />
                        <List className="ClientProblemList">
                            {map(clientProblemsSummary, (o, i) => (
                                <ListItem
                                    className="ClientProblemList-Item"
                                    style={(i % 2 === 0) ? {backgroundColor: '#f9f9f9'} : null}>
                                    <div className="ClientProblemsSummary-TextWrapper">
                                        <Link
                                            to={path('dashboard')}
                                            className='ClientProblemsSummary-Link'>
                                            {o.name}
                                        </Link>
                                        <span className="ClientProblemsSummary-ClientProblem">
                                            {o.desc}
                                        </span>
                                    </div>
                                    <span className="ClientProblemsSummary-CardDateTime">
                                        {`${o.date} ${o.time}`}
                                    </span>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientProblemsSummary)