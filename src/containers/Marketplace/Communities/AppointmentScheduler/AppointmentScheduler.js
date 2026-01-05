import React, {Component} from 'react'

import { any, omit } from 'underscore'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import PropTypes from 'prop-types'

import {Button} from 'reactstrap'

import './AppointmentScheduler.scss'

import Modal from 'components/Modal/Modal'

import AppointmentForm from '../AppointmentForm/AppointmentForm'

import * as marketplaceCommunityAppointmentFormActions from 'redux/marketplace/community/appointment/form/marketplaceCommunityAppointmentFormActions'

import { isEmpty, isNotEmpty } from 'lib/utils/Utils'

const SUBMIT_EXCLUDED_FORM_FIELDS = ['id', 'organization', 'community']

function mapStateToProps (state) {
    return {
        form: {
            fields: state.marketplace.community.appointment.form.fields
        }
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            form: bindActionCreators(marketplaceCommunityAppointmentFormActions, dispatch)
        }
    }
}

class AppointmentScheduler extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
        onClose: PropTypes.func,
        onScheduleSuccess: PropTypes.func
    }

    static defaultProps = {
        onClose: () => {},
        onScheduleSuccess: () => {}
    }

    state = {
        count: 0
    }

    onClose = () => {
        this.props.onClose(
            this.isFormChanged()
        )
    }

    onRequest = () => {
        this.setState(s => (
            { count: s.count + 1 }
        ))

        this.validateForm().then(success => {
            if (success) {
                const {
                    form,
                    actions,
                    communityId,
                    onScheduleSuccess
                } = this.props

                const data = omit(form.fields.toJS(), (v, k) => {
                    return (
                        k.includes('Error')
                        || SUBMIT_EXCLUDED_FORM_FIELDS.includes(k)
                        || isEmpty(v)
                    )
                })

                actions
                    .form
                    .appointment(communityId, data)
                    .then(({ success } = {}) => {
                        if (success) {
                            this.clearForm()
                            onScheduleSuccess()
                        }
                    })
            }
        })
    }

    validateForm () {
        const {
            form, actions
        } = this.props

        const data = form.fields.toJS()
        return actions.form.validate(data)
    }
    
    clearForm () {
        return this.props.actions.form.clear()
    }

    isFormChanged () {
        return any(this.props.form.fields.toJS(), (v, k) => {
            return (
                !(k.includes('Error') || SUBMIT_EXCLUDED_FORM_FIELDS.includes(k))
                && isNotEmpty(v)
            )
        })
    }

    render () {
        const {
            isOpen,
            communityId,
            communityName,
            primaryFocusIds,
            organizationName,
            treatmentServiceIds
        } = this.props

        return (
            <Modal
                isOpen={isOpen}
                onClose={this.onClose}
                className='AppointmentScheduler'
                title={'Request an Appointment'}
                renderFooter={() => (
                    <>
                        <Button outline color='success' onClick={this.onClose}>Cancel</Button>
                        <Button color='success' onClick={this.onRequest}>Submit</Button>
                    </>
                )}>
                <AppointmentForm
                    communityId={communityId}
                    communityName={communityName}
                    submitCount={this.state.count}
                    primaryFocusIds={primaryFocusIds}
                    treatmentServiceIds={treatmentServiceIds}
                    organizationName={organizationName}
                />
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentScheduler)