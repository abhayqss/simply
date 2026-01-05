import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'
import { Pie, PieChart, Cell, Legend } from 'recharts'

import './ClientAssessmentsSummaryPieChart.scss'

const COLORS = ["#FAD52E", "#B9E887", "#D9DBD6",];


//TODO - load data from MockData
const data = [
    {name: 'In process', value: 1},
    {name: 'Completed', value: 12},
    {name: 'Inactive', value: 1}
];

export default class ClientAssessmentsSummaryPieChart extends Component {

    static propTypes = {}

    static defaultProps = {}

    render () {
        return (
            <div className='Chart ClientAssessmentsSummaryPieChart'>
                <div className='Chart-Title'>Assessments(14)</div>
                <PieChart width={450} height={300}>
                    <Legend
                        align='right'
                        layout='vertical'
                        verticalAlign='middle'
                        iconType='square'
                        iconSize={20}
                    />
                    <Pie
                        dataKey='value'
                        data={data}
                        cx={140}
                        cy={150}
                        outerRadius={140}
                        fill="#8884d8">
                        {
                            data.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index]}/>
                            ))
                        }
                    </Pie>
                </PieChart>
            </div>
        )
    }
}