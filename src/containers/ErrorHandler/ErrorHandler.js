import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ErrorViewer from 'components/ErrorViewer/ErrorViewer'
import { clear } from 'redux/error/errorActions'

function mapStateToProps(state) {
    return {
        error: state.error.error,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            clearError: bindActionCreators(clear, dispatch)
        }
    }
}

const propTypes = {
    error: PropTypes.shape({
        code: PropTypes.string,
        message: PropTypes.string,
        status: PropTypes.number,
        body: PropTypes.any,
        stack: PropTypes.string
    })
}

const defaultProps = {
    error: null
}

function ErrorHandler({ error, actions }) {
    return !!error && (
        <ErrorViewer
            isOpen
            error={error}
            onClose={actions.clearError}
        />
    )
}

ErrorHandler.propTypes = propTypes
ErrorHandler.defaultProps = defaultProps

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler)
