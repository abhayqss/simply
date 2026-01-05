import React, { Component, Fragment } from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import PropTypes from 'prop-types'

import { Button } from 'reactstrap'

import _ from 'underscore'

import * as communityHandsetFormActions from 'redux/community/handset/form/communityHandsetFormActions'

import Modal from 'components/Modal/Modal'

import CommunityHandsetForm from '../CommunityHandsetForm/CommunityHandsetForm'

import './CommunityHandsetEditor.scss'

function mapStateToProps (state) {
    return {
        form: {
            fields: state.community.handset.form.fields
        }
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            form: bindActionCreators(communityHandsetFormActions, dispatch)
        }
    }
}

class CommunityHandsetModal extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
        communityHandsetId: PropTypes.number,
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

    isEditMode () {
        return _.isNumber(this.props.communityId)
    }

    render () {
        const { isOpen, communityHandsetId } = this.props

        return (
            <Modal isOpen={isOpen}
                   onClose={this.onClose}
                   className='CommunityHandsetModal'
                   title={`${this.isEditMode() ? 'Edit' : 'Add'} a Handset`}
                   renderFooter={() => (
                       <>
                       <Button outline color='success' onClick={this.onClose}>Cancel</Button>
                       <Button color='success' onClick={this.onSubmitForm}>Submit</Button>
                       </>
                   )}>
                <CommunityHandsetForm
                    communityHandsetId={communityHandsetId}
                    onSubmit={this.onSubmitForm}
                />
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityHandsetModal)