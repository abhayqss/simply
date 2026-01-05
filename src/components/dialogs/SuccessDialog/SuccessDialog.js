import React, {Component} from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import './SuccessDialog.scss'

import Dialog from '../Dialog/Dialog'

import {ReactComponent as Success} from 'images/alert-green.svg'

export default class SuccessDialog extends Component {

    static propTypes = {
        text: PropTypes.string,
        title: PropTypes.string,
        isOpen: PropTypes.bool,
        buttons: PropTypes.arrayOf(PropTypes.object),
        className: PropTypes.string,
    }

    render () {
        const {
            text,
            title,
            isOpen,
            buttons,
            className,
        } = this.props

        return (
            <Dialog
                text={text}
                title={title}
                icon={Success}
                isOpen={isOpen}
                buttons={buttons}
                className={cn('SuccessDialog', className)}>
                {this.props.children}
            </Dialog>
        )
    }
}