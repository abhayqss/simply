import React, {Component} from 'react'

import PropTypes from 'prop-types'
import { pick, isNumber } from 'underscore'

import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {bindActionCreators} from 'redux'

import {Button} from 'reactstrap'

import Modal from 'components/Modal/Modal'

import './CareTeamMemberEditor.scss'

import CareTeamMemberForm from '../CareTeamMemberForm/CareTeamMemberForm'

import * as careTeamMemberFormActions from 'redux/care/team/member/form/careTeamMemberFormActions'

function mapStateToProps (state) {
    return {
        form: {
            fields: state.care.team.member.form.fields
        }
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            form: bindActionCreators(careTeamMemberFormActions, dispatch)
        }
    }
}

class CareTeamMemberEditor extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
        memberId: PropTypes.number,

        onClose: PropTypes.func,
        onSaveSuccess: PropTypes.func
    }

    static defaultProps = {
        onClose: function () {},
        onSaveSuccess: function () {}
    }

    state = {
        isFormDataChanged: false
    }

    onClose = () => {
        this.props.onClose(
            this.state.isFormDataChanged
        )
    }

    onChangedFormData = () => {
        this.setState({ isFormDataChanged: true })
    }

    onNext = () => {
        alert('Coming Soon')
    }

    onSave = () => {
        this.validate().then(success => {
            if (success) {
                this.save().then(({ success, data } = {}) => {
                    if (success) {
                        this.props.onSaveSuccess(data, !this.isEditMode())
                        this.clear()
                    }
                })
            }
        })
    }

    validate() {
        const data = this.props.form.fields.toJS()
        return this.props.actions.form.validate(data)
    }

    isEditMode () {
        return isNumber(this.props.memberId)
    }

    save () {
        const {
            clientId,
            commId: communityId
        } = this.props.match.params

        this
            .props
            .actions
            .form
            .submit({
                clientId,
                communityId,
                ...pick(this.props.form.fields.toJS(), (v, k) => !(
                    k.includes('HasError') || k.includes('ErrorText')
                ))
            })
    }

    clear () {
        this.props.actions.form.clear()
    }

    render () {
        const { isOpen, memberId } = this.props

        return (
            <Modal isOpen={isOpen}
                   onClose={this.onClose}
                   className='CareTeamMemberEditor'
                   title={`${this.isEditMode() ? 'Edit' : 'Create'}  CareTeam`}
                   renderFooter={() => (
                       <>
                           <Button outline color='success' onClick={this.onClose}>Cancel</Button>
                           <Button color='success' onClick={this.onSave}>Save</Button>
                       </>
                   )}>
                <CareTeamMemberForm
                    memberId={memberId}
                    onSubmit={this.onSave}
                />
            </Modal>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CareTeamMemberEditor))