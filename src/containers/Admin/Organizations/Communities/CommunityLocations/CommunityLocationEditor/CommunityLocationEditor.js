import React, { Component, Fragment } from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import PropTypes from 'prop-types'

import { Button } from 'reactstrap'

import _ from 'underscore'

import * as communityLocationFormActions from 'redux/community/location/form/communityLocationFormActions'

import Modal from 'components/Modal/Modal'

import CommunityLocationForm from '../CommunityLocationForm/CommunityLocationForm'

import './CommunityLocationEditor.scss'

function mapStateToProps (state) {
    return {
        form: {
            fields: state.community.location.form.fields
        }
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            form: bindActionCreators(communityLocationFormActions, dispatch)
        }
    }
}

class CommunityLocationModal extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
        communityLocationId: PropTypes.number,
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
        const { isOpen, communityLocationId } = this.props

        return (
            <Modal isOpen={isOpen}
                   onClose={this.onClose}
                   className='CommunityLocationModal'
                   title={`${this.isEditMode() ? 'Edit a' : 'Add a New'} Location`}
                   renderFooter={() => (
                       <>
                       <Button outline color='success' onClick={this.onClose}>Cancel</Button>
                       <Button color='success' onClick={this.onSubmitForm}>Submit</Button>
                       </>
                   )}>
                <CommunityLocationForm
                    communityLocationId={communityLocationId}
                    onSubmit={this.onSubmitForm}
                />
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityLocationModal)