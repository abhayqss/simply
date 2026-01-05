import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'
import { Pie, PieChart, Cell, Legend } from 'recharts'

import './EncounterChart.scss'

const COLORS = ['#b9bde3', '#edf385'];


//TODO - load data from MockData
const data = [
    {name: 'Non face to face - 5', value: 250},
    {name: 'Face to face - 12', value: 100},
];

export default class EncounterChart extends Component {

    static propTypes = {}

    static defaultProps = {
        renderTitle: () => 'Encounters'
    }

    render () {
        const { className, renderTitle } = this.props

        return (
            <div className={cn('Chart EncounterChart', className)}>
                <div className='Chart-Title'>
                    {renderTitle()}
                </div>
                <PieChart width={500} height={300}>
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
                                <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                            ))
                        }
                    </Pie>
                </PieChart>
            </div>
        )
    }
}