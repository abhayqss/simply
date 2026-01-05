import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import './Logo.scss'

import {ReactComponent as LogoImage} from 'images/simplyconnect-logo.svg'
import {ReactComponent as LogoMonoColorImage} from 'images/simplyconnect-logo-mono-color.svg'

export default class Logo extends Component {

    static propTypes = {
        isMonoColor: PropTypes.bool,
        iconSize: PropTypes.number,
        className: PropTypes.string,

        onClick: PropTypes.func
    }

    static defaultProps = {
        iconSize: 50,
        isMonoColor: false,
        onClick: function () {}
    }

    onClick = () => {
        this.props.onClick()
    }

    render () {
        const { isMonoColor, className, iconSize } = this.props

        return (
            <div className={cn('Logo', className)}>
                {isMonoColor ? (
                    <LogoMonoColorImage className='Logo-Icon' style={{height: iconSize}} />
                ) : (
                    <LogoImage className='Logo-Icon' style={{height: iconSize}} />
                )}
            </div>
        )
    }
}