import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import {
    Bar,
    Cell,
    XAxis,
    YAxis,
    Area,
    Line,
    Text,
    Label,
    Legend,
    BarChart,
    Rectangle,
    CartesianGrid,
    ComposedChart,
    ResponsiveContainer,
    BarChart as Chart,
} from 'recharts';

import './ClientEventUtilizationChart.scss'

const COLORS = ['#b8bedd', '#efc3e6', '#f0e6ef'];

//TODO - load data from MockData
const data = [
    {
        date: 'Sep, 2018',
        emergency: 4,
        medicationAlertsAndReactions: 0,
        behaviorMentalHealth: 13,
        abuseSafety: 4,
        changingHealthConditions: 0,
        generalLifeAssessment: 5
    },
    {
        date: 'Oct, 2018',
        emergency: 2,
        medicationAlertsAndReactions: 5,
        behaviorMentalHealth: 8,
        abuseSafety: 2,
        changingHealthConditions: 5,
        generalLifeAssessment: 0
    },
    {
        date: 'Nov, 2018',
        emergency: 0,
        medicationAlertsAndReactions: 3,
        behaviorMentalHealth: 0,
        abuseSafety: 8,
        changingHealthConditions: 0,
        generalLifeAssessment: 2
    },
    {
        date: 'Dec, 2018',
        emergency: 5,
        medicationAlertsAndReactions: 3,
        behaviorMentalHealth: 4,
        abuseSafety: 3,
        changingHealthConditions: 7,
        generalLifeAssessment: 3
    },
    {
        date: 'Jan, 2019',
        emergency: 2,
        medicationAlertsAndReactions: 3,
        behaviorMentalHealth: 4,
        abuseSafety: 2,
        changingHealthConditions: 10,
        generalLifeAssessment: 1
    },
    {
        date: 'Feb, 2019',
        emergency: 0,
        medicationAlertsAndReactions: 2,
        behaviorMentalHealth: 6,
        abuseSafety: 0,
        changingHealthConditions: 3,
        generalLifeAssessment: 6
    }
]

export default class ClientEventUtilizationChart extends Component {

    static propTypes = {}

    static defaultProps = {
        renderTitle: () => 'Event Utilization'
    }

    render () {
        const { className, renderTitle } = this.props

        return (
            <div className={cn('ClientEventUtilizationChart', className)}>
                <div className='ClientEventUtilizationChart-Title Chart-Title'>
                    {renderTitle()}
                </div>
                <div className='ClientEventUtilizationChart-Body'>
                    <ResponsiveContainer width='100%' minHeight={500}>
                        <BarChart
                            data={data}
                            colors={COLORS}
                            dataKey={"value"}
                            areBarsCenterAligned={true}>
                            <Legend
                                align='left'
                                iconType='square'
                                iconSize={20}
                                wrapperStyle={{
                                    paddingTop: 32,
                                    paddingLeft: 20
                                }}
                            />
                            <CartesianGrid
                                stroke='#f1f1f1'
                                horizontal={true}
                                vertical={false}
                            />
                            <XAxis
                                dy={12}
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                yAxisId={0}
                                width={100}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Bar
                                stackId='date'
                                name='Emergency'
                                dataKey="emergency"
                                fill="#fc913a"
                            />
                            <Bar
                                stackId='date'
                                name='Medications Alerts & Reactions'
                                dataKey="medicationAlertsAndReactions"
                                fill="#b8e986"
                            />
                            <Bar
                                stackId='date'
                                name='Behavior / Mental Health'
                                dataKey="behaviorMentalHealth"
                                fill="#97e0ff"
                            />
                            <Bar
                                stackId='date'
                                name='Abuse / Safety'
                                dataKey="abuseSafety"
                                fill="#b9bde3"
                            />
                            <Bar
                                stackId='date'
                                name='Changing Health Conditions'
                                dataKey="changingHealthConditions"
                                fill="#fffe6f"
                            />
                            <Bar
                                stackId='date'
                                name='General / Life / Assessment'
                                dataKey="generalLifeAssessment"
                                fill="#d9aee1"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }
}