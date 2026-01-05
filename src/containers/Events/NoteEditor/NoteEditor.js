import React, {Component, Fragment} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
    map,
    pick,
    filter,
    isNull,
    isNumber,
} from 'underscore'

import {Button} from 'reactstrap'
import PropTypes from 'prop-types'

import {withRouter} from 'react-router'

import * as noteFormActions from 'redux/note/form/noteFormActions'

import Modal from 'components/Modal/Modal'

import NoteForm from '../NoteForm/NoteForm'

import './NoteEditor.scss'

const CM = "CM"
const ENCOUNTER = "ENCOUNTER"

function mapStateToProps (state) {
    return {
        form: {
            fields: state.note.form.fields
        },

        directory: state.directory
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            form: bindActionCreators(noteFormActions, dispatch)
        }
    }
}

class NoteEditor extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
        noteId: PropTypes.number,
        eventId: PropTypes.number,
        onClose: PropTypes.func
    }

    static defaultProps = {
        onClose: function () {}
    }

    onClose = () => {
        this.clear()

        this.props.onClose()
    }

    onSubmit = () => {
        const noteTypes = this.props.directory.note.type.list.dataSource.data

        const validationOptions = {
            encounter: map(filter(noteTypes, note =>
                !isNull(note.encounterCode)
                    ? note.encounterCode.includes(ENCOUNTER)
                    : false
            ), o => o.id),
            careManagement: map(filter(noteTypes, note =>
                !isNull(note.followUpCode)
                    ? note.followUpCode.includes(CM)
                    : false
            ), o => o.id),
        }

        this.validate(validationOptions).then(success => {
            if (success) {
                this.save()
            }
        })
    }

    save () {
        const { actions, form, match } = this.props

        let data = form.fields.toJS()

        const filter = (v, k) => !(
            k.includes('HasError') || k.includes('ErrorText')
        )

        const fields = pick(data, filter)

        actions
            .form
            .submit(fields, match.params.clientId)
            .then(({ success } = {}) => {
                if (success) {
                    this.onClose()

                    this.clear()
                }
            })
    }

    validate(options) {
        const data = this.props.form.fields.toJS()
        return this.props.actions.form.validate(data, options)
    }

    clear () {
        this.props.actions.form.clear()
    }

    isEditMode () {
        return isNumber(this.props.noteId)
    }

    render () {
        const { isOpen, noteId, eventId } = this.props

        return (
            <Modal
                isOpen={isOpen}
                onClose={this.onClose}
                className='NoteEditor'
                title={`${this.isEditMode() ? 'Edit' : 'Add'}  Note`}
                renderFooter={() => (
                    <>
                        <Button outline color='success' onClick={this.onClose}>Cancel</Button>
                        <Button color='success' onClick={this.onSubmit}>Submit</Button>
                    </>
                )}>
                <NoteForm
                    noteId={noteId}
                    eventId={eventId}
                    onSubmit={this.onSubmitForm}
                />
            </Modal>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteEditor))