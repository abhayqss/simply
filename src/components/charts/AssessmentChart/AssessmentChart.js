import React, { Component } from 'react'

import cn from 'classnames'
import {map} from 'underscore'
import PropTypes from 'prop-types'
import { Pie, PieChart, Cell, Legend } from 'recharts'

import './AssessmentChart.scss'

const COLORS = ['#fc913a', '#fffe6f', '#b8e986'];

export default class AssessmentChart extends Component {

    static propTypes = {
        data: PropTypes.array
    }

    static defaultProps = {
        renderTitle: () => 'Assessments'
    }

    render () {
        const { className, renderTitle, data } = this.props

        return (
            <div className={cn('Chart AssessmentChart', className)}>
                <div className='Chart-Title'>
                    {renderTitle()}
                </div>
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
                        data={map(data, ({ status, count}) => ({
                            name: status, value: count
                        }))}
                        cx={140}
                        cy={150}
                        outerRadius={140}
                        fill="#8884d8">
                        {
                            data.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                            ))
                        }
                    </Pie>
                </PieChart>
            </div>
        )
    }
}