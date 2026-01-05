import React, { Component } from 'react'

import PropTypes from 'prop-types'

import ErrorDialog from '../dialogs/ErrorDialog/ErrorDialog'

export default class ErrorViewer extends Component {
    static propTypes = {
        error: PropTypes.object,
        
        isOpen: PropTypes.bool,

        onClose: PropTypes.func,
        onClosed: PropTypes.func
    }

    static defaultProps = {
        error: null,

        onClose: () => {},
        onClosed: () => {}
    }

    onClose = () => {
        this.props.onClose(
            this.props.error
        )
    }


    onClosed = () => {
        this.props.onClosed(
            this.props.error
        )
    }

    render () {
        const {
            error,
            isOpen
        } = this.props

        return (
            <ErrorDialog
                isOpen={isOpen}
                text={error ? error.message : null}
                onClosed={this.onClosed}
                buttons={[
                    {
                        text: 'Close',
                        onClick: this.onClose
                    }
                ]}
            />
        )
    }
}