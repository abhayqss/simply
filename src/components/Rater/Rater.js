import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'
import ReactRater from 'react-rater'

import './Rater.scss'

export default class Rater extends Component {

    static propTypes = {
        total: PropTypes.number,
        rating: PropTypes.number,
        className: PropTypes.string,
        interactive: PropTypes.bool,

        onRate: PropTypes.func,
        onRating: PropTypes.func,
        onCancelRate: PropTypes.func,
    }

    static defaultProps = {
        interactive: false
    }

    render () {
        const {
            className
        } = this.props

        return (
            <ReactRater
                {...this.props}
                className={cn('Rater react-rater', className)}
            />
        )
    }
}