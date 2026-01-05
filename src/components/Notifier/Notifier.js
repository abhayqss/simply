import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import './Notifier.scss'

import {ReactComponent as Bell} from 'images/bell.svg'

export default class Notifier extends Component {

    static propTypes = {
        isActive: PropTypes.bool,
        iconSize: PropTypes.number,
        className: PropTypes.string,

        onClick: PropTypes.func
    }

    static defaultProps = {
        iconSize: 33,
        isActive: false,
        onClick: function () {}
    }

    onClick = () => {
        this.props.onClick()
    }

    render () {
        const { isActive, className, iconSize } = this.props

        return (
            <div className={cn('Notifier', className)}>
                {isActive ? <div className='Notifier-Indicator'/> : null}
                <Bell className='Notifier-Icon' style={{height: iconSize}} />
            </div>
        )
    }
}