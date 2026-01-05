import React, {Component} from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'
import {map, range} from 'underscore'

import {ReactBootstrapSlider as Slider} from 'react-bootstrap-slider'

import './RangeSlider.scss'

export default class RangeSlider extends Component {

    state = {
        rangeList: []
    }

    static propTypes = {
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number,
        name: PropTypes.string,
        value: PropTypes.number,
        isDisabled: PropTypes.bool,
        className: PropTypes.string,
        onChange : PropTypes.func
    }

    static defaultProps = {
        min: 0,
        max: 5,
        step: 1,
        value: 0,
        onChange: function () {}
    }

    componentDidMount() {
        this.setState({
            rangeList: range(this.props.min, this.props.max + 1)
        })
    }

    updateRange = event => {
        const { value } = event.target
        this.props.onChange(value)
    }

    render() {
        const { rangeList } = this.state
        const {
            min,
            max,
            step,
            value,
            className,
            isDisabled
        } = this.props

        return (
            <div className={cn('RangeSlider', className)}>
                <Slider
                    max={max}
                    min={min}
                    step={step}
                    value={value}
                    disabled={isDisabled && 'disabled'}
                    change={this.updateRange}
                />
                <div className="RangeSlider-RangeContainer">
                    {map(rangeList, (value, i) => (
                        <span className="RangeSlider-Range" key={value + i}>
                            {value}
                        </span>
                    ))}
                </div>
            </div>
        )
    }
}

