import React, {Component} from 'react'

import cn from 'classnames'
import {map} from 'underscore'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'

import {
    Progress, Row, Col, Button
} from 'reactstrap'

import {
    clientServicePlansHousingSummary,
    clientServicePlansEmploymentSummary,
    clientServicePlansSocialWellnessSummary,
    clientServicePlansMentalWellnessSummary,
    clientServicePlansPhysicalWellnessSummary,
} from 'lib/mock/MockData'

import { ReactComponent as Info } from 'images/info.svg'


import {PAGINATION} from 'lib/Constants'

import './ClientServicePlansSummary.scss'

const {FIRST_PAGE} = PAGINATION

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

function ServicePlanSummary ({ data }) {
    return (
        <div className="ServicePlanSummary">
            <div className={`ServicePlanSummary-Indicator ServicePlanSummary-Indicator_color_${data.indicator}`}/>
            <div className='flex-1'>
                <div className="d-flex justify-content-between">
                <span className="ServicePlanSummary-Title">
                    {data.name}
                </span>
                    <span className="ServicePlanSummary-Scoring">
                    <span className="ServicePlanSummary-ScoringValue">
                        {data.scoring + '/5'}
                    </span>
                    <Info className="ServicePlanSummary-ScoringInfoIcon"/>
                </span>
                </div>
                <div className="ServicePlanSummary-Need">
                    {data.need}
                </div>
                <div className="ServicePlanSummary-Goals">
                    {map(data.goals, o => (
                        <div className='ServicePlanSummary-Goal'>
                            <div className="d-flex justify-content-between">
                                <span className="ServicePlanSummary-GoalTitle">
                                    {o.name}
                                </span>
                                <span className="ServicePlanSummary-GoalProgressPercentage">
                                    {o.percentage + '%'}
                                </span>
                            </div>
                            <Progress value={o.percentage} className="ServicePlanSummary-GoalProgressBar" />
                        </div>
                    ))  }
                </div>
            </div>
        </div>
    )
}

class ClientServicePlansSummary extends Component {
    componentDidMount() {

    }

    componentDidUpdate() {

    }

    updateServicePlansSummary(isReload, page) {

    }

    refreshServicePlansSummary(page) {
        this.updateServicePlansSummary(true, page || FIRST_PAGE)
    }

    clear() {
        this.props.actions.list.clear()
    }

    onViewPlans = () => {
        alert('Coming soon')
    }

    render () {
        const { className } = this.props

        return (
            <div className={cn("ClientServicePlansSummary", className)}>
                <div className="ClientServicePlansSummary-Header">
                    <span className=" ClientServicePlansSummary-Title">
                        Plan
                    </span>
                    <Button
                        color="success"
                        className="ClientServicePlansSummary-ViewAllBtn"
                        onClick={this.onViewPlans}>
                        View all plans
                    </Button>
                </div>
                <div>
                    <Row style={{marginBottom: 30}}>
                        <Col md={6}>
                            <ServicePlanSummary data={clientServicePlansHousingSummary} />
                        </Col>
                        <Col md={6}>
                            <ServicePlanSummary data={clientServicePlansSocialWellnessSummary} />
                        </Col>
                    </Row>
                    <Row style={{marginBottom: 30}}>
                        <Col md={6}>
                            <ServicePlanSummary data={clientServicePlansEmploymentSummary} />
                        </Col>
                        <Col md={6}>
                            <ServicePlanSummary data={clientServicePlansMentalWellnessSummary} />
                        </Col>
                    </Row>
                    <Row style={{marginBottom: 30}}>
                        <Col md={6}>
                            <ServicePlanSummary data={clientServicePlansPhysicalWellnessSummary} />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientServicePlansSummary)