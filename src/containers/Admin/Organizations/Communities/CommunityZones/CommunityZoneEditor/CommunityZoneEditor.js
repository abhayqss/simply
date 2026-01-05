import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PropTypes from 'prop-types'

import { Button } from 'reactstrap'

import _ from 'underscore'

import * as communityZoneFormActions from 'redux/community/zone/form/communityZoneFormActions'

import Modal from 'components/Modal/Modal'

import CommunityZoneForm from '../CommunityZoneForm/CommunityZoneForm'

import './CommunityZoneEditor.scss'

function mapStateToProps (state) {
    return {
        form: {
            fields: state.community.zone.form.fields
        }
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            form: bindActionCreators(communityZoneFormActions, dispatch)
        }
    }
}

class CommunityZoneModal extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
        communityZoneId: PropTypes.number,
        onClose: PropTypes.func
    }

    static defaultProps = {
        onClose: function () {
        }
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

    validateForm () {
        const data = this.props.form.fields.toJS()
        return this.props.actions.form.validate(data)
    }

    isEditMode () {
        return _.isNumber(this.props.communityId)
    }

    render () {
        const { isOpen, communityZoneId } = this.props

        return (
            <Modal isOpen={isOpen}
                   onClose={this.onClose}
                   className='CommunityZoneModal'
                   title={`${this.isEditMode() ? 'Edit' : 'Add'} a Zone`}
                   renderFooter={() => (
                       <>
                           <Button outline color='success' onClick={this.onClose}>Cancel</Button>
                           <Button color='success' onClick={this.onSubmitForm}>Submit</Button>
                       </>
                   )}>
                <CommunityZoneForm
                    communityZoneId={communityZoneId}
                    onSubmit={this.onSubmitForm}
                />
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityZoneModal)