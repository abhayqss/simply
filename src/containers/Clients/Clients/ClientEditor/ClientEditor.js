import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
    compact,
    isEqual,
    isNumber
} from 'underscore'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Button } from 'reactstrap'

import Modal from 'components/Modal/Modal'
import SwitchField from 'components/Form/SwitchField/SwitchField'

import './ClientEditor.scss'

import ClientForm from '../ClientForm/ClientForm'

import * as clientFormActions from 'redux/client/form/clientFormActions'

import { omitDeep } from 'lib/utils/Utils'
import { Response } from 'lib/utils/AjaxUtils'

function mapStateToProps (state) {
    const { auth, client } = state
    const { list, form, details } = client

    return { auth, list, form, details }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            form: bindActionCreators(clientFormActions, dispatch)
        }
    }
}

class ClientEditor extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
        clientId: PropTypes.number,

        onClose: PropTypes.func,
        onSaveSuccess: PropTypes.func,
    }

    static defaultProps = {
        onClose: function () {},
        onSaveSuccess: function () {}
    }

    onClose = () => {
        this.props.onClose(
            this.isFormChanged()
        )
    }

    onSubmit = () => {
        const save = () => {
            this.save().then(Response(
                this.onSubmitSuccess
            ))
        }

        if (this.isActiveClient) {
            this.validate().then(success => {
                success && save()
            })
        }

        else save()
    }

    onSubmitSuccess = ({ data }) => {
        this.props.onSaveSuccess(
            data, !this.isEditMode()
        )
    }

    onToggleActive = () => {
        this.changeFormField(
            'isActive', !this.isActiveClient
        )
    }

    onChangeFormField = (name, value) => {
        this.changeFormField(name, value)
    }

    get isActiveClient () {
        return this.props.form.fields.isActive
    }

    isFormChanged () {
        const {
            auth,
            list,
            details,
            form: { fields }
        } = this.props

        const {
            communityIds,
            organizationId
        } = list.dataSource.filter

        const excluded = [
            'id',
            'race',
            'state',
            'avatar',
            'active',
            'gender',
            'canEdit',
            'aliases',
            'hasEmail',
            'editable',
            'avatarId',
            'legacyId',
            'fullName',
            'telecoms',
            'religion',
            'riskScore',
            'community',
            'stateAbbr',
            'stateName',
            'identifier',
            'middleName',
            'hasNoEmail',
            'admitDates',
            'ethnicGroup',
            'nationality',
            'citizenship',
            'organization',
            'avatarDataUrl',
            'maritalStatus',
            'deathDateTime',
            'insurancePlan',
            'dischargeDates',
            'displayAddress',
            'primaryLanguage',
            'ssnLastFourDigits',
            'shouldRemoveAvatar',
            'isDataShareEnabled',
            'isDataShareEnabled',
            'patientAccountNumber',
            'veteransMilitaryStatus'
        ]

        if (this.isEditMode()) {
            excluded.push('communityId')
            excluded.push('organizationId')

            if (!details.data.address) {
                excluded.push('address')
            }
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
                    organizationId,
                    communityId: (
                        communityIds && communityIds.length === 1
                    ) ? communityIds[0] : null
                },
                filter
            )
        )
    }

    changeFormField (name, value) {
        this.props
            .actions
            .form
            .changeField(name, value)
    }

    validate () {
        const data = this.getFormData()

        let excluded = compact([
            data.hasNoEmail && 'email'
        ])

        if (this.isEditMode()) {
            excluded = [
                ...excluded,
                'ssn',
                'communityId',
                'organizationId'
            ]
        }

        return (
            this.props
                .actions
                .form
                .validate(
                    data, { excluded }
                )
        )
    }

    isEditMode () {
        return isNumber(
            this.props.clientId
        )
    }

    save () {
        const {
            actions,
            form: { fields }
        } = this.props

        let data = this.getFormData()

        const filter = (v, k) => (
            k.includes('HasError') || k.includes('ErrorText')
        )

        return actions
            .form
            .submit({
                ...omitDeep(data, filter),
                avatar: fields.avatar,
                email: data.hasNoEmail ? null : data.email,
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
            isOpen,
            clientId,
            form: {
                isValid,
                isFetching,
                fields: {
                    isActive,
                    isDataShareEnabled
                }
            }
        } = this.props

        return (
            <Modal
                isOpen={isOpen}
                onClose={this.onClose}
                className='ClientEditor'
                hasCloseBtn={this.isEditMode()}
                title={this.isEditMode() ? 'Edit client details' : 'Add new client'}
                renderHeaderButton={this.isEditMode() ? () => (
                    <Button
                        color='success'
                        disabled={isFetching}
                        onClick={this.onToggleActive}>
                        {isActive ? "Deactivate" : "Activate"}
                    </Button>
                ) : null}
                renderFooter={() => (
                    <div className="ClientEditor-Footer">
                        {/*<SwitchField
                            name='isDataShareEnabled'
                            isChecked={isDataShareEnabled}
                            onChange={this.onChangeFormField}
                            className="ClientEditor-SharingDataSwitcher"
                            label={'Client participates in sharing data'}
                        />*/}
                        <div/>
                        <div>
                            <Button
                                outline
                                color='success'
                                disabled={isFetching}
                                onClick={this.onClose}>
                                Cancel
                            </Button>
                            <Button
                                color='success'
                                disabled={!isValid || isFetching}
                                onClick={this.onSubmit}>
                                {this.isEditMode() ? 'Save' : 'Create'}
                            </Button>
                        </div>
                    </div>
                )}>
                <ClientForm clientId={clientId}/>
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientEditor)