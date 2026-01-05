import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import PropTypes from 'prop-types'
import {pick, isNumber} from 'underscore'

import {Button} from 'reactstrap'

import * as eventFormActions from "redux/event/form/eventFormActions"

import Modal from 'components/Modal/Modal'

import EventForm from '../EventForm/EventForm'

import './EventEditor.scss'

function mapStateToProps (state) {
    return {
        form: {
            fields: state.event.form.fields
        }
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            form: bindActionCreators(eventFormActions, dispatch)
        }
    }
}

class EventEditor extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
        eventId: PropTypes.number,
        onClose: PropTypes.func
    }

    static defaultProps = {
        onClose: function () {}
    }

    onClose = () => {
        this.props.onClose()

        this.clear()
    }

    onSubmit = () => {
        this.validateForm().then(success => {
                if (success) {
                    this.save()
                    // this.props.form.onSubmit(data)
                }
        })
    }

    save () {
        let data = this.props.form.fields.toJS()

        const filter = (v, k) => !(
            k.includes('HasError') || k.includes('ErrorText')
        )

        const fields = pick(data, filter)

        this
            .props
            .actions
            .form
            .submit({
                ...fields,
                client: pick(fields.client, filter),
                eventDescription: pick(fields.eventDescription, filter),
                eventEssentials: pick(fields.eventEssentials, filter),
                registeredNurse: {
                    ...pick(fields.registeredNurse, filter),
                    address: pick(fields.registeredNurse.address, filter),
                },
                responsibleManager: pick(fields.responsibleManager, filter),
                treatmentDetails: {
                    ...pick(fields.treatmentDetails, filter),
                    treatingHospitalDetails: {
                        ...pick(fields.treatmentDetails.treatingHospitalDetails, filter),
                        address: pick(fields.treatmentDetails.treatingHospitalDetails.address, filter),
                    },
                    treatingPhysicianDetails: {
                        ...pick(fields.treatmentDetails.treatingPhysicianDetails, filter),
                        address: pick(fields.treatmentDetails.treatingPhysicianDetails.address, filter),
                    },
                },
            })
            .then(({ success } = {}) => {
                if (success) {
                    this.onClose()

                    this.clear()
                }
            })
    }

    validateForm() {
        const data = this.props.form.fields.toJS()
        return this.props.actions.form.validate(data)
    }

    isEditMode () {
        return isNumber(this.props.eventId)
    }

    clear () {
        this.props.actions.form.clear()
    }

    render () {
        const { isOpen, eventId } = this.props

        return (
            <Modal
                isOpen={isOpen}
                onClose={this.onClose}
                className='EventEditor'
                title={`${this.isEditMode() ? 'Edit' : 'Create'} Event`}
                renderFooter={() => (
                    <>
                        <Button outline color='success' onClick={this.onClose}>Cancel</Button>
                        <Button color='success' onClick={this.onSubmit}>Submit</Button>
                    </>
                )}>
                <EventForm
                    eventId={eventId}
                    onSubmit={this.onSubmit}
                />
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditor)