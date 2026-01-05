import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import Logo from '../Logo/Logo'

import './Footer.scss'

export default class AssessmentPieChart extends Component {

    static propTypes = {
        hasLogo: PropTypes.bool,
        className: PropTypes.string,
        theme: PropTypes.oneOf(['black', 'gray'])
    }

    static defaultProps = {
        theme: 'black',
        hasLogo: true
    }

    render () {
        const { theme, hasLogo, className } = this.props

        return (
            <div className={cn('Footer', `Footer_theme_${theme}`, className)}>
                <div className='Footer-Content'>
                    {hasLogo ? <Logo isMonoColor iconSize={45}/> : <div/>}
                    <div className='Footer-Copyright'>© 2018 Simply Connect</div>
                </div>
            </div>
        )
    }
}