import React, { Component } from 'react'

import cn from 'classnames'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Collapse } from 'reactstrap'

import DocumentTitle from 'react-document-title'

import Loader from 'components/Loader/Loader'
import ErrorViewer from 'components/ErrorViewer/ErrorViewer'

import './Reports.scss'

import ReportFilter from './ReportFilter/ReportFilter'

import * as reportDocumentActions from 'redux/report/document/reportDocumentActions'

import { SERVER_ERROR_CODES } from 'lib/Constants'

import { ReactComponent as Filter } from 'images/filters.svg'

function isIgnoredError (e = {}) {
    return e.code === SERVER_ERROR_CODES.ACCOUNT_INACTIVE
}

function mapStateToProps (state) {
    return {
        document: state.report.document
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            document: bindActionCreators(reportDocumentActions, dispatch)
        }
    }
}

class Reports extends Component {
    state = {
        isFilterOpen: true
    }

    onResetError = () => {
        this.props
            .actions
            .document
            .clearError()
    }

    onToggleFilter = () => {
        this.setState(s => ({
            isFilterOpen: !s.isFilterOpen
        }))
    }

    getError () {
        return this.props.document.error
    }

    render () {
        const {
            document
        } = this.props

        const {
            isFilterOpen
        } = this.state

        const error = this.getError()

        return (
            <DocumentTitle title="Simply Connect | Reports">
                <div className="Reports">
                    <div className="d-flex flex-row justify-content-between margin-top-30 margin-bottom-15">
                        <div className="Reports-Title">
                            Reports
                        </div>
                        <Filter
                            className={cn(
                                'ReportFilter-Icon',
                                isFilterOpen
                                    ? 'ReportFilter-Icon_rotated_90'
                                    : 'ReportFilter-Icon_rotated_0',
                            )}
                            onClick={this.onToggleFilter}
                        />
                    </div>
                    <Collapse isOpen={isFilterOpen}>
                        <ReportFilter/>
                    </Collapse>
                    {document.isFetching && <Loader/>}
                    {error && !isIgnoredError(error) && (
                        <ErrorViewer
                            isOpen
                            error={error}
                            onClose={this.onResetError}
                        />
                    )}
                </div>
            </DocumentTitle>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
