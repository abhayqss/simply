import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'
import ReactAvatar from 'react-avatar'

import './Avatar.scss'

export default class Avatar extends Component {
    static propTypes = {
        name: PropTypes.string,
        size: PropTypes.string,
        nameColor: PropTypes.string,
        className: PropTypes.string,
        backgroundColor: PropTypes.string,

        maxInitials: PropTypes.number,

        isRound: PropTypes.bool,
    }

    static defaultProps = {
        size: '50',
        nameColor: '#ffc107',
        backgroundColor: '#ffffff',

        maxInitials: 2,

        isRound: true
    }

    render() {
        const {
            name,
            size,
            isRound,
            nameColor,
            className,
            maxInitials,
            backgroundColor,
        } = this.props

        return (
            <ReactAvatar
                className={cn('Avatar', className)}
                name={name}
                size={size}
                round={isRound}
                fgColor={nameColor}
                maxInitials={maxInitials}
                color={backgroundColor}
            />
        )
    }
}