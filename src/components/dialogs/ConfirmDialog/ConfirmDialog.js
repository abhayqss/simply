import React, {Component} from 'react'

import PropTypes from 'prop-types'

import './ConfirmDialog.scss'

import Dialog from '../Dialog/Dialog'

export default class ConfirmDialog extends Component {

    static propTypes = {
        icon: PropTypes.object,
        text: PropTypes.string,
        isOpen: PropTypes.bool,
        title: PropTypes.string,
        renderIcon: PropTypes.func,
        className: PropTypes.string,

        confirmBtnText: PropTypes.string,

        onCancel: PropTypes.func,
        onConfirm: PropTypes.func
    }

    static defaultProps = {
        confirmBtnText: 'Confirm',
        onCancel: () => {},
        onConfirm: () => {}
    }

    onConfirm = () => {
        this.props.onConfirm()
    }

    onCancel = () => {
        this.props.onCancel()
    }

    render () {
        const {
            text,
            title,
            icon,
            isOpen,
            className,
            onCancel,
            onConfirm,
            renderIcon,
            confirmBtnText
        } = this.props

        return (
            <Dialog
                icon={icon}
                text={text}
                title={title}
                isOpen={isOpen}
                className={className}
                renderIcon={renderIcon}
                buttons={[
                    {
                        text: 'Cancel',
                        color: 'outline-success',
                        onClick: this.onCancel
                    },
                    {
                        text: confirmBtnText,
                        onClick: this.onConfirm
                    }
                ]}
            />
        )
    }
}