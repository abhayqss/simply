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
    Rectangle,
    CartesianGrid,
    ComposedChart,
    ResponsiveContainer,
    BarChart as Chart,
} from 'recharts';

import './ClientServicesCostComposedChart.scss'

const COLORS = ['#b8bedd', '#efc3e6', '#f0e6ef'];

//TODO - load data from MockData
const data = [
    {
        date: '2016',
        residentialServicesCost: 1600,
        vocationalServicesCost: 2800,
        medicalServicesCost: 4500,
        events: 1800,
    },
    {
        date: '2017',
        residentialServicesCost: 500,
        vocationalServicesCost: 900,
        medicalServicesCost: 1500,
        events: 1500,
    },
    {
        date: '2018',
        residentialServicesCost: 800,
        vocationalServicesCost: 1300,
        medicalServicesCost: 2384,
        events: 2100
    },

]

export default class ClientServicesCostComposedChart extends Component {

    static propTypes = {}

    static defaultProps = {
        renderTitle: () => 'Services cost'
    }

    render () {
        const { className, renderTitle  } = this.props

        return (
            <div className={cn('ClientServicesCostComposedChart', className)}>
                <div className='ClientServicesCostComposedChart-Title Chart-Title'>
                    {renderTitle()}
                </div>
                <div className='ClientServicesCostComposedChart-Body'>
                    <ResponsiveContainer width='100%' minHeight={500}>
                        <ComposedChart
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
                                tickFormatter={v => `${v/1000}K`}>
                                <Label
                                    value='Cost, $'
                                    angle={-90}
                                    offset={50}
                                    style={{
                                        fontSize: 13,
                                        fontFamily: 'Open Sans Semibold'
                                    }}
                                />
                            </YAxis>
                            <YAxis
                                dataKey='events'
                                yAxisId={1}
                                width={150}
                                axisLine={false}
                                tickLine={false}
                                orientation='right'>
                                <Label
                                    value='Number of Events'
                                    angle={-90}
                                    style={{
                                        fontSize: 13,
                                        fontFamily: 'Open Sans Semibold'
                                    }}
                                />
                            </YAxis>
                            <Area
                                stackId='date'
                                name='Residential services'
                                dataKey="residentialServicesCost"
                                fill="#e9eda0"
                                stroke="#e9eda0"
                            />
                            <Area
                                stackId='date'
                                name='Vocational services'
                                dataKey="vocationalServicesCost"
                                fill="#b9bde3"
                                stroke="#b9bde3"
                            />
                            <Area
                                stackId='date'
                                name='Medical services'
                                dataKey="medicalServicesCost"
                                fill="#b8e986"
                                stroke="#b8e986"
                            />
                            <Line
                                stackId='date'
                                name='Events'
                                dataKey="events"
                                fill="#fc913a"
                                stroke="#fc913a"
                                legendType='square'
                                dot={({cx, cy}) => {
                                    return (
                                        <rect
                                            x={cx - 5}
                                            y={cy - 5}
                                            width={10}
                                            height={10}
                                            fill="#fc913a"
                                        />
                                    )
                                }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }
}