import React, { Component } from 'react'

import {map} from 'underscore'
import PropTypes from 'prop-types'
import { Pie, PieChart, Cell, Legend } from 'recharts'

import './ServicePlanPieChart.scss'

const COLORS = ['#a6a3d2', '#97e0ff', '#edf385'];

export default class ServicePlanPieChart extends Component {

    static propTypes = {
        data: PropTypes.array
    }

    static defaultProps = {}

    render () {
        const { data } = this.props

        return (
            <div className='Chart ServicePlanPieChart'>
                <div className='Chart-Title'>Service Plan</div>
                <PieChart width={495} height={300}>
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