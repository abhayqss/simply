import React, {Component} from 'react'

import {pick} from 'underscore'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {bindActionCreators} from 'redux'

import {Button} from 'reactstrap'
import PropTypes from 'prop-types'

import './DocumentEditor.scss'

import Modal from 'components/Modal/Modal'

import DocumentForm from '../DocumentForm/DocumentForm'

import * as documentFormActions from 'redux/client/document/form/clientDocumentFormActions'

const USER_ID = 1106

function mapStateToProps (state) {
    return {
        form:  state.client.document.form
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            form: bindActionCreators(documentFormActions, dispatch)
        }
    }
}

class DocumentEditor extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
        documentId: PropTypes.number,
        onClose: PropTypes.func
    }

    static defaultProps = {
        onClose: function () {}
    }

    onClose = () => {
        this.props.onClose()

        this.clear()
    }

    onNext = () => {
        alert('Coming Soon')
    }

    onUpload = () => {
        this.validate().then(success => {
            if (success) {
                this.upload()
            }
        })
    }

    upload () {
        const { form, match } = this.props

        let data = form.fields.toJS()

        const filter = (v, k) => !(
            k.includes('HasError') || k.includes('ErrorText')
        )

        const fields = pick(data, filter)

        this
            .props
            .actions
            .form
            .submit(fields, match.params.clientId, USER_ID)
            .then(({ success, data } = {}) => {
            if (success) {
                this.props.onClose(success, data)

                this.clear()
            }
        })
    }

    validate() {
        const data = this
            .props
            .form
            .fields
            .toJS()

        return this
            .props
            .actions
            .form
            .validate(data)
    }

    clear () {
        this.props.actions.form.clear()
    }
    
    render () {
        const { isOpen, documentId } = this.props

        return (
            <Modal
                isOpen={isOpen}
                onClose={this.onClose}
                className='DocumentEditor'
                title="Upload document"
                renderFooter={() => (
                    <>
                        <Button outline color='success' onClick={this.onClose}>Cancel</Button>
                        <Button color='success' onClick={this.onUpload}>Upload</Button>
                    </>
                )}>
                <DocumentForm
                    documentId={documentId}
                />
            </Modal>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentEditor))