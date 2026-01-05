import React from 'react'

import { any } from 'underscore'

import ErrorDialog from '../dialogs/ErrorDialog/ErrorDialog'

import { getTitleFromErrorCode } from 'lib/utils/Utils'

const ERROR_TEXT = 'Error!'

export default function errorDemonstrator (Component) {
    return class extends React.Component {

        errorLog = []
        
        state = {
            errorDialog: {
                title: '',
                text: '',
                isOpen: false,
                onClose: () => {}
            }
        }

        show = (e, onClose) => {
            if (e) {
                if (!any(this.errorLog, o => o.code === e.code)) {

                    this.setState({
                        errorDialog: {
                            isOpen: true,
                            text: e.message,
                            title: getTitleFromErrorCode(e.code),
                            onClose
                        }
                    })

                    this.errorLog.push(e)
                }
            }
        }

        render () {
            const {
                title,
                text,
                isOpen,
                onClose
            } = this.state.errorDialog
            
            return (
                <>
                    <Component
                        {...this.props}
                        showError={this.show}
                    />
                    {isOpen && (
                        <ErrorDialog
                            isOpen
                            title={ERROR_TEXT}
                            text={text}
                            buttons={[
                                {
                                    text: 'Close',
                                    onClick: () => {
                                        this.setState({
                                            errorDialog: {
                                                isOpen: false
                                            }
                                        })

                                        this.errorLog = []

                                        onClose && onClose()
                                    }
                                }
                            ]}
                        />
                    )}
                </>
            )
        }
    }
}