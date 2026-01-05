import React, {Component} from 'react'

import PropTypes from 'prop-types'

import {map} from 'underscore'

import {
    Bar,
    Cell,
    YAxis,
    Legend,
    CartesianGrid,
    BarChart as Chart,
} from 'recharts';

import './BarChart.scss'

export default class BarChart extends Component {

    static propTypes = {
        data: PropTypes.array,
        colors: PropTypes.array,

        dataKey: PropTypes.string,

        width: PropTypes.number,
        height: PropTypes.number,
        barSize: PropTypes.number,
        barCategoryGap: PropTypes.number,

        areBarsCenterAligned: PropTypes.bool,

        margin: PropTypes.object,
    }

    static defaultProps = {

    }

    render () {
        const {
            data,
            width,
            height,
            margin,
            colors,
            dataKey,
            barSize,
            barCategoryGap,
            areBarsCenterAligned
        } = this.props


        const updatedData = areBarsCenterAligned ? [{
            name: '', value: 0, amt: 0,
        }, ...data, {
            name: '', value: 0, amt: 0,
        }] : data

        return (
            <div className='BarChart'>
                <Chart
                    width={width}
                    height={height}
                    data={updatedData}
                    barSize={barSize}
                    barCategoryGap={barCategoryGap}
                    margin={margin}>
                        <CartesianGrid
                            horizontal={true}
                            vertical={false}
                        />
                        <YAxis axisLine={false} />
                        <Legend
                            payload={map(data,(o, i) => ({
                                value: `${o.name} : ${o.amt}`,
                                type: 'square',
                                color: colors[i % colors.length]
                            }))}
                        />
                        <Bar dataKey={dataKey}>
                            {updatedData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={areBarsCenterAligned ? colors[index - 1] : colors[index]}
                                />
                            ))}
                        </Bar>
                </Chart>
            </div>
        )
    }
}