import React from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import './Alert.scss'

import {ReactComponent as SuccessIcon} from 'images/success.svg'
import {ReactComponent as DangerIcon} from 'images/error.svg'
import {ReactComponent as WarningIcon} from 'images/warning-1.svg'

const ICONS = {
    success: SuccessIcon,
    danger: DangerIcon,
    warning: WarningIcon
}

const TYPE_TITLES = {
    success: 'Success',
    danger: 'Danger',
    warning: 'Warning'
}

function Alert(props) {
    const {
        type,
        text,
        title,
        isModal,
        className
    } = props

    const Icon = ICONS[type]
    const prefix = TYPE_TITLES[type]

    if (isModal) {
        return null
    }

    return (
        <div className={cn('Alert', prefix + 'Alert', className)}>
            <div className={`Alert-Indicator ${prefix}Alert-Indicator`}>
                <Icon className={`Alert-Icon ${prefix}Alert-Icon`}/>
            </div>
            <div className='Alert-Body'>
                <div className='Alert-Title'>{title}</div>
                <div className='Alert-Text'>{text}</div>
            </div>
        </div>
    )
}

Alert.propTypes = {
    isModal: PropTypes.bool,
    title: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.oneOf(['success', 'warning', 'danger'])
}

Alert.defaultProps = {
    isModal: false,
    isOpen: false,
    title: '',
    text: '',
    type: 'warning'
}

export default Alert;