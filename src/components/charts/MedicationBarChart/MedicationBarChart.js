import React, { Component } from 'react'

import cn from 'classnames'
import { map } from "underscore"
import PropTypes from 'prop-types'

import {
    Bar,
    Cell,
    YAxis,
    Legend,
    BarChart,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

import './MedicationBarChart.scss'


const COLORS = ["#97e0ff", "#d9aee1", "#edf385"];

//TODO - load data from MockData
const data = [
    {
        name: 'Active',
        value: 6
    },
    {
        name: 'Completed',
        value: 9
    },
    {
        name: 'Other',
        value: 12
    },
]

export default class MedicationBarChart extends Component {

    static propTypes = {}

    static defaultProps = {
        renderTitle: () => 'Event Utilization'
    }

    render () {
        const { className, renderTitle } = this.props

        return (
            <div className={cn('MedicationBarChart', className)}>
                <div className='Chart-Title'>
                    {renderTitle()}
                </div>
                <ResponsiveContainer width='100%' minHeight={350}>
                    <BarChart
                        width={450}
                        height={350}
                        data={data}
                        barGap={0}
                        barCategoryGap={0}
                        maxBarSize={90}>
                        <CartesianGrid
                            stroke='#f1f1f1'
                            horizontal={true}
                            vertical={false}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                        />
                        <Legend
                            payload={map(data, (o, i) => ({
                                value: `${o.name} - ${o.value}`,
                                type: 'square',
                                color: COLORS[i % COLORS.length]
                            }))}
                            wrapperStyle={{
                                paddingTop: 32,
                                paddingLeft: 20
                            }}
                        />
                        <Bar dataKey='value'>
                            {map(data, (o, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        )
    }
}