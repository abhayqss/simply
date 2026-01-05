import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
    omit,
    isEqual,
    isNumber
} from 'underscore'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Button } from 'reactstrap'

import Modal from 'components/Modal/Modal'

import './OrganizationEditor.scss'

import OrganizationForm from '../OrganizationForm/OrganizationForm'

import * as organizationFormActions from 'redux/organization/form/organizationFormActions'

import {
    isEmpty,
    omitDeep,
    isNotEmpty
} from 'lib/utils/Utils'

function mapStateToProps (state) {
    const { form, details } = state.organization

    return { form, details }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            form: bindActionCreators(organizationFormActions, dispatch)
        }
    }
}

class OrganizationEditor extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
        organizationId: PropTypes.number,

        onClose: PropTypes.func,
        onSaveSuccess: PropTypes.func
    }

    static defaultProps = {
        onClose: () => {
        },
        onSaveSuccess: () => {
        }
    }

    state = {
        tab: 0
    }

    onClose = () => {
        this.props.onClose(
            this.isFormChanged()
        )
    }

    onNext = () => {
        const { tab } = this.state

        if (tab === 0) {
            this.validateLegalInfo().then(success => {
                if (success) {
                    this.setState({ tab: tab + 1 })
                }
            })
        }
    }

    onBack = () => {
        this.setState(s => ({ tab: s.tab - 1 }))
    }

    onSave = () => {
        this.validateLegalInfo().then(success => {
            if (success) this.validateMarketplace().then(success => {
                if (success) {
                    this.save().then(({ success, data } = {}) => {
                        if (success) {
                            this.props.onSaveSuccess(data, !this.isEditMode())
                        }
                    })
                }
            })
        })
    }

    onChangeTab = tab => {
        if (tab === 1) {
            this.validateLegalInfo().then(success => {
                if (success) {
                    this.setState({ tab })
                }
            })
        }

        else this.setState({ tab })
    }

    isFormChanged () {
        const {
            details,
            form: { fields }
        } = this.props

        const excluded = [
            'types',
            'canEdit',
            'isValidOid',
            'logoDataUrl',
            'displayAddress',
            'shouldRemoveLogo',
            'insuranceNetworks'
        ]

        const filter = (v, k) => (
            k.includes('HasError')
            || k.includes('ErrorText')
            || excluded.includes(k)
        )

        if(this.isEditMode() && !details.data.marketplace) {
            excluded.push('marketplace')
        }

        return !isEqual(
            omitDeep(fields.toJS(), filter),
            omitDeep(
                this.isEditMode() ? details.data
                    : fields.clear().toJS(),
                filter
            )
        )
    }

    save () {
        const {
            fields
        } = this.props.form

        const filter = (v, k) => (
            k.includes('HasError') || k.includes('ErrorText')
        )

        return this
            .props
            .actions
            .form
            .submit({
                ...omitDeep(fields.toJS(), filter),
                logo: fields.logo,
                shouldRemoveLogo: this.isEditMode() && !(
                    fields.logo || fields.logoName
                )
            })
    }

    validateLegalInfo () {
        const {
            form,
            actions
        } = this.props

        return actions
            .form
            .validateLegalInfo(form.fields.toJS())
            .then(success => {
                if (this.isEditMode()) {
                    return success
                }

                const {
                    oid, name, companyId
                } = form.fields

                const data = omit(
                    { oid, name, companyId }, isEmpty
                )

                return isNotEmpty(data) ?
                    this.props
                        .actions
                        .form
                        .validateUniq(data)
                        .then(uniq => success && uniq)
                    : success
            })
    }

    validateMarketplace () {
        const { marketplace } = this.props.form.fields.toJS()
        return this.props.actions.form.validateMarketplace(marketplace)
    }

    isEditMode () {
        return isNumber(this.props.organizationId)
    }

    render () {
        const { tab } = this.state

        const {
            form,
            isOpen,
            organizationId
        } = this.props

        return (
            <Modal
                isOpen={isOpen}
                className='OrganizationEditor'
                onClose={this.onClose}
                isCloseBtnDisabled={form.isFetching}
                title={this.isEditMode() ? 'Edit organization details' : 'Create organization'}
                renderFooter={() => (
                    <>
                        {tab === 0 && (
                            <Button
                                outline
                                color='success'
                                onClick={this.onClose}>
                                Close
                            </Button>
                        )}
                        {tab > 0 && (
                            <Button
                                outline
                                color='success'
                                disabled={form.isFetching}
                                onClick={this.onBack}>
                                Back
                            </Button>
                        )}
                        {tab < 1 && (
                            <Button
                                color='success'
                                onClick={this.onNext}>
                                Next
                            </Button>
                        )}
                        {tab === 1 && (
                            <Button
                                color='success'
                                disabled={form.isFetching}
                                onClick={this.onSave}>
                                {this.isEditMode() ? 'Save' : 'Create'}
                            </Button>
                        )}
                    </>
                )}>
                <OrganizationForm
                    tab={tab}
                    organizationId={organizationId}
                    onChangeTab={this.onChangeTab}
                />
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationEditor)