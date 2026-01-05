import React, {Component} from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import './ErrorDialog.scss'

import Dialog from '../Dialog/Dialog'

import {ReactComponent as Danger} from 'images/alert-red.svg'

export default class ErrorDialog extends Component {

    static propTypes = {
        text: PropTypes.string,
        title: PropTypes.string,
        isOpen: PropTypes.bool,
        buttons: PropTypes.arrayOf(PropTypes.object),
        className: PropTypes.string,
        onClosed: PropTypes.func
    }

    render () {
        const {
            text,
            title,
            isOpen,
            buttons,
            onClosed,
            className
        } = this.props

        return (
            <Dialog
                text={text}
                title={title}
                icon={Danger}
                isOpen={isOpen}
                buttons={buttons}
                onClosed={onClosed}
                className={cn('ErrorDialog', className)}
            />
        )
    }
}