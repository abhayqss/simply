import React, {Component} from 'react'

import cn from 'classnames'
import {map} from 'underscore'
import PropTypes from 'prop-types'

import { Modal, Button } from 'reactstrap'

import './Dialog.scss'

export default class Dialog extends Component {

    static propTypes = {
        type: PropTypes.string,
        text: PropTypes.string,
        title: PropTypes.string,
        icon: PropTypes.object,
        isOpen: PropTypes.bool,
        buttons: PropTypes.arrayOf(PropTypes.object),
        className: PropTypes.string,

        onClosed: PropTypes.func,
        renderIcon: PropTypes.func,
    }

    body = React.createRef()

    render () {

        const {
            text,
            title,
            isOpen,
            buttons,
            onClosed,
            className,
            renderIcon,
            icon: IconCmp
        } = this.props

        return (
            <Modal
                fade={false}
                centered={true}
                isOpen={isOpen}
                onClosed={onClosed}
                className={cn('Dialog', className)}>
                <div
                    ref={this.body}
                    className="modal-body Dialog-Body">
                    {IconCmp && (
                        <div className="d-flex justify-content-center margin-bottom-40">
                            {renderIcon ? renderIcon () : (
                                <IconCmp className="Dialog-Icon"/>
                            )}
                        </div>
                    )}
                    {title && (
                        <div className="Dialog-Title">
                            {title}
                        </div>
                    )}
                    {text ? (
                        <div className="Dialog-Text">
                            {text}
                        </div>
                    ) : this.props.children}
                    {buttons && (
                        <div className="d-flex margin-top-24 justify-content-center">
                            {map(buttons, btn => (
                                <Button
                                    key={btn.text.toLowerCase()}
                                    outline={btn.outline === true}
                                    color={btn.color || 'success'}
                                    className={btn.className}
                                    onClick={btn.onClick}>
                                    {btn.text}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </Modal>
        )
    }
}