import React, { Component } from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {Button} from 'reactstrap'
import PropTypes from 'prop-types'
import {isNumber} from 'underscore'

import * as caseloadFormActions from "redux/client/caseload/form/caseloadFormActions"

import Modal from 'components/Modal/Modal'

import CaseloadForm from '../CaseloadForm/CaseloadForm'

import './CaseloadEditor.scss'

function mapStateToProps(state) {
    return {
        caseload: state.client.caseload
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            caseload: bindActionCreators(caseloadFormActions, dispatch)
        }
    }
}

class CaseloadEditor extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
        caseloadId: PropTypes.number,
        onClose: PropTypes.func
    }

    static defaultProps = {
        onClose: function () {}
    }

    onClose = () => {
        const {actions, onClose, caseload} = this.props

        if(!this.isEditMode()) {
            actions.caseload.removeCaseload(caseload.form.size - 1)
        }

        onClose()
    }

    onSave = () => {
        this.props.onClose()
/*        this.validateForm().then(success => {
            if (success) {
                this.props.onClose()
                const data = this.props.caseload.form.get(this.getCaseloadId()).fields.toJS()

                //this.props.form.onSubmit(data)
            }
        })*/
    }

    getCaseloadId () {
        const {caseloadId, caseload} = this.props

        return caseloadId === null ? caseload.form.size - 1 : caseloadId
    }

    validateForm() {
        const data = this.props.caseload.form.get(this.getCaseloadId()).fields.toJS()
        return this.props.actions.caseload.validateCaseloadForm(this.getCaseloadId(), data)
    }

    save () {
        let data = this.props.caseload.form.get(this.getCaseloadId()).fields.toJS()

        const filter = (v, k) => !(
            k.includes('HasError') || k.includes('ErrorText')
        )

      this
            .props
            .actions
            .form
            .submit()
    }

    isEditMode () {
        return isNumber(this.props.caseloadId)
    }

    render () {
        const { isOpen, caseloadId } = this.props

        return (
            <Modal isOpen={isOpen}
                   onClose={this.onClose}
                   className='CaseloadEditor'
                   title={`${this.isEditMode() ? 'Edit' : 'Create'} Caseload`}
                   renderFooter={() => (
                       <>
                           <Button outline color='success' onClick={this.onClose}>Close</Button>
                           <Button color='success' onClick={this.onSave}>Save</Button>
                       </>
                   )}>
                <CaseloadForm
                    caseloadId={caseloadId}
                    onSubmit={this.onSave}
                />
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseloadEditor)