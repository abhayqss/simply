import React, { Component, Fragment } from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import PropTypes from 'prop-types'

import { Button } from 'reactstrap'

import * as communityDeviceTypeFormActions from 'redux/community/deviceType/form/communityDeviceTypeFormActions'

import Modal from 'components/Modal/Modal'

import CommunityDeviceTypeForm from '../CommunityDeviceTypeForm/CommunityDeviceTypeForm'

import './CommunityDeviceTypeEditor.scss'

function mapStateToProps (state) {
    return {
        form: {
            fields: state.community.deviceType.form.fields
        }
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            form: bindActionCreators(communityDeviceTypeFormActions, dispatch)
        }
    }
}

 class CommunityDeviceTypeModal extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
        communityDeviceTypeId: PropTypes.number,
        onClose: PropTypes.func
    }

    static defaultProps = {
        onClose: function () {}
    }

    onClose = () => {
        this.props.onClose()
    }

    onNext = () => {
        alert('Coming Soon')
    }

    onSubmitForm = () => {
        this.validateForm().then(success => {
            if (success) {
                const data = this.props.form.fields.toJS()

                //this.props.form.onSubmit(data)
            }
        })
    }

    validateForm() {
        const data = this.props.form.fields.toJS()
        return this.props.actions.form.validate(data)
    }

    render () {
        const { isOpen, communityDeviceTypeId } = this.props

        return (
            <Modal isOpen={isOpen}
                   onClose={this.onClose}
                   className='CommunityDeviceTypeModal'
                   title={'Edit Device Details'}
                   renderFooter={() => (
                       <>
                       <Button outline color='success' onClick={this.onClose}>Cancel</Button>
                       <Button color='success' onClick={this.onSubmitForm}>Save</Button>
                       </>
                   )}>
                <CommunityDeviceTypeForm
                    communityDeviceTypeId={communityDeviceTypeId}
                    onSubmit={this.onSubmitForm}
                />
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityDeviceTypeModal)