import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { isEqual, isNumber, omit } from 'underscore'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Button } from 'reactstrap'

import Modal from 'components/Modal/Modal'

import './ContactEditor.scss'

import ContactForm from '../ContactForm/ContactForm'

import * as contactFormActions from 'redux/contact/form/contactFormActions'

import { omitDeep } from 'lib/utils/Utils'
import { Response } from 'lib/utils/AjaxUtils'

function mapStateToProps (state) {
    const { auth, contact } = state
    const { form, details } = contact

    return { auth, form, details }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            form: bindActionCreators(contactFormActions, dispatch)
        }
    }
}

class ContactEditor extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,

        contactId: PropTypes.number,
        isExpiredContact: PropTypes.bool,

        onClose: PropTypes.func,
        onSaveSuccess: PropTypes.func,
        onReInviteSuccess: PropTypes.func
    }

    static defaultProps = {
        onClose: () => {},
        onSaveSuccess: () => {},
        onReInviteSuccess: () => {}
    }

    onClose = () => {
        this.props.onClose(
            this.isFormChanged()
        )
    }

    onSubmit = () => {
        if (this.isExpiredContact()) {
            this.invite().then(Response(({ data }) => {
                    this.props.onReInviteSuccess(data)
                })
            )
        }

        else this.validate().then(success => {
            if (success) {
                this.save().then(Response(({ data }) => {
                    this.props.onSaveSuccess(data, !this.isEditMode())
                }))
            }
        })
    }

    isFormChanged () {
        const {
            auth,
            details,
            form: { fields }
        } = this.props

        const {
            organizationId
        } = auth.login.user.data

        const excluded = [
            'id',
            'state',
            'status',
            'avatar',
            'avatarId',
            'stateName',
            'stateAbbr',
            'avatarName',
            'middleName',
            'displayName',
            'professionals',
            'communityName',
            'displayAddress',
            'systemRoleName',
            'systemRoleTitle',
            'organizationName',
            'shouldRemoveAvatar',
            'secureMessagingEnabled',
            'isSecureMessagingEnabled'
        ]

        if (this.isEditMode() && !details.data.address) {
            excluded.push('address')
        }

        const filter = (v, k) => (
            k.includes('HasError')
            || k.includes('ErrorCode')
            || k.includes('ErrorText')
            || excluded.includes(k)
        )

        return !isEqual(
            omitDeep(fields.toJS(), filter),
            omitDeep(
                this.isEditMode() ? details.data : {
                    ...fields.clear().toJS(),
                    organizationId
                },
                filter
            )
        )
    }

    isExpiredContact () {
        return this.props.isExpiredContact
    }

    validate () {
        const data = this.getFormData()

        const excluded = this.isEditMode() ? [
            'login',
            'lastName',
            'firstName',
            'enableContact',
            'organizationId'
        ] : []

        return this.props.actions
                   .form
                   .validate(data, { excluded })
                   .then(success => {
                       if (this.isEditMode()) {
                           return success
                       }

                       const {
                           login,
                           organizationId
                       } = data

                       return login ?
                           this.props
                               .actions
                               .form
                               .validateUniq({ organizationId, ...{ login } })
                               .then(uniq => success && uniq)
                           : success
                   })
    }

    isEditMode () {
        return isNumber(this.props.contactId)
    }

    invite () {
        let {
            id
        } = this.getFormData()

        return this
            .props
            .actions
            .form
            .invite(id)
    }

    save () {
        const {
            actions,
            form: { fields }
        } = this.props

        let data = fields.toJS()

        const filter = (v, k) => (
            k.includes('HasError')
            || k.includes('ErrorCode')
            || k.includes('ErrorText')
        )

        return actions
            .form
            .submit({
                ...omitDeep(data, filter),
                avatar: fields.avatar,
                shouldRemoveAvatar: this.isEditMode() && !(
                    fields.avatar || fields.avatarName
                )
            })
    }

    getFormData () {
        return this.props.form.fields.toJS()
    }

    render () {
        const {
            form,
            isOpen,
            contactId,
            isExpiredContact
        } = this.props

        return (
            <Modal
                isOpen={isOpen}
                hasCloseBtn={false}
                onClose={this.onClose}
                className='ContactEditor'
                title={
                    this.isEditMode() ?
                        isExpiredContact ?
                            'Expired Contact'
                            : 'Edit contact details'
                        : 'Create Contact'
                }
                renderFooter={() => (
                    <>
                        <Button
                            outline
                            color='success'
                            disabled={form.isFetching}
                            onClick={this.onClose}>
                            Close
                        </Button>
                        <Button
                            color='success'
                            disabled={form.isFetching}
                            onClick={this.onSubmit}>
                            {this.isEditMode() ? (isExpiredContact ? 'Re-invite' : 'Save') : 'Send Invite'}
                        </Button>
                    </>
                )}>
                <ContactForm
                    contactId={contactId}
                    isExpiredContact={isExpiredContact}
                />
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactEditor)