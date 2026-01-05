import React, {Component} from 'react'

import cn from 'classnames'
import {map} from 'underscore'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'

import {
    Badge,
    ListGroup as List,
    ListGroupItem as ListItem,
} from 'reactstrap'

import AssessmentChart from 'components/charts/AssessmentChart/AssessmentChart'

import {clientAssessments} from 'lib/mock/MockData'

import {path} from 'lib/utils/ContextUtils'

import {PAGINATION} from 'lib/Constants'

import './ClientAssessmentsSummary.scss'

const {FIRST_PAGE} = PAGINATION

function getPointsBadgeType (points) {
    if (points < 4) return 'success'
    if (points < 10) return 'warning'
    if (points > 9) return 'danger'
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {}
    }
}

class ClientAssessmentsSummary extends Component {
    componentDidMount() {

    }

    componentDidUpdate() {

    }

    updateAssessmentsSummary(isReload, page) {

    }

    refreshAssessmentsSummary(page) {
        this.updateAssessmentsSummary(true, page || FIRST_PAGE)
    }

    clear() {
        this.props.actions.list.clear()
    }

    render() {
        const { className } = this.props

        return (
            <div className={cn('ClientAssessmentsSummary', className)}>
                <div className='ClientAssessmentsSummary-Title'>
                    <span className='ClientAssessmentsSummary-TitleText'>Assessments</span>
                    <Badge color='warning' className='ClientAssessmentsSummary-AssessmentCount'>
                        {15}
                    </Badge>
                </div>
                <div className="ClientAssessmentsSummary-Body">
                    <AssessmentChart
                        className='flex-1'
                        renderTitle={() => ''}
                    />
                    <List className="ClientAssessmentList">
                        {map(clientAssessments, (o, i) => (
                            <div>
                                <ListItem
                                    style={(i % 2 === 0) ? {backgroundColor: '#f9f9f9'} : null}
                                    className="ClientAssessmentList-Item ClientAssessment">
                                    <div className='d-flex justify-content-between'>
                                        <Link
                                            to={path('dashboard')}
                                            className='ClientAssessment-Type'>
                                            {o.name}
                                        </Link>
                                        <span className='ClientAssessment-Date'>
                                            {o.date}
                                        </span>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                    <span>
                                        <span className="ClientAssessment-Status">{o.status}</span>
                                        <Badge
                                            color={getPointsBadgeType(o.points)}
                                            className="ClientAssessment-Points">
                                            {o.points} points
                                        </Badge>
                                    </span>
                                        <span className="ClientAssessment-Time">
                                        {o.time}
                                    </span>
                                    </div>
                                </ListItem>
                            </div>
                        ))}
                    </List>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientAssessmentsSummary)