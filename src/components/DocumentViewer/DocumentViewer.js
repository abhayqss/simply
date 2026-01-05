import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'
import DocViewer from 'react-file-viewer'

import './DocumentViewer.scss'

export default class DocumentViewer extends Component {
    static propTypes = {
        type: PropTypes.string,
        path: PropTypes.string,
        className: PropTypes.string,
        renderCustomComponent: PropTypes.func
    }

    static defaultProps = {
        renderCustomComponent: function () {
            return (
                <h1>No Data</h1>
            )
        }
    }

    render() {
        const {
            type,
            path,
            className,
            renderCustomComponent,
        } = this.props

        return (
            <div className={cn('DocumentViewer', className)}>
                    <DocViewer
                        fileType={type}
                        filePath={path}
                        unsupportedComponent={renderCustomComponent}
                    />
            </div>
        )
    }
}