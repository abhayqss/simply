import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
    omit,
    isEqual,
    isNumber
} from 'underscore'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'

import { Button } from 'reactstrap'

import Modal from 'components/Modal/Modal'

import './CommunityEditor.scss'

import CommunityForm from '../CommunityForm/CommunityForm'

import * as communityFormActions from 'redux/community/form/communityFormActions'

import {
    isEmpty,
    omitDeep,
    isNotEmpty
} from 'lib/utils/Utils'

function mapStateToProps (state) {
    const { form, details } = state.community

    return {
        form,
        details,
        organization: state.organization
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            form: bindActionCreators(communityFormActions, dispatch)
        }
    }
}

class CommunityEditor extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
        communityId: PropTypes.number,
        organizationId: PropTypes.number,
        onClose: PropTypes.func,
        onSaveSuccess: PropTypes.func
    }

    static defaultProps = {
        onClose: function () {
        },
        onSaveSuccess: function () {
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
            organization,
            form: { fields }
        } = this.props

        let excluded = [
            'types',
            'canEdit',
            'location',
            'logoDataUrl',
            'shouldRemoveLogo',
            'organizationId',
            'displayAddress',
            'organizationName',
            'insuranceNetworks'
        ]

        const filter = (v, k) => (
            k.includes('HasError')
            || k.includes('ErrorText')
            || excluded.includes(k)
        )

        if (this.isEditMode()) {
            if(!details.data.marketplace) {
                excluded.push('marketplace')
            }

            return !isEqual(
                omitDeep(fields.toJS(), filter),
                omitDeep(details.data, filter)
            )
        }

        excluded = ['id', 'marketplace', ...excluded]

        return !isEqual(
            omitDeep(fields.toJS(), filter),
            omitDeep(fields.clear().toJS(), filter)
        ) || !isEqual(
            omitDeep(fields.marketplace.toJS(), filter),
            omitDeep(organization.details.data.marketplace, filter)
        )
    }

    save () {
        const {
            match,
            actions,
            form: { fields }
        } = this.props

        const filter = (v, k) => (
            k.includes('HasError') || k.includes('ErrorText')
        )

        return actions
            .form
            .submit(
                +match.params.orgId,
                {
                    ...omitDeep(fields.toJS(), filter),
                    logo: fields.logo,
                    shouldRemoveLogo: this.isEditMode() && !(
                        fields.logo || fields.logoName
                    )
                }
            )
    }

    validateLegalInfo () {
        const {
            form,
            actions,
            organizationId,
            details
        } = this.props

        return actions
            .form
            .validateLegalInfo(form.fields.toJS())
            .then(success => {
                const {
                    oid, name
                } = form.fields

                if (this.isEditMode() && details.data.name === name) {
                    return true;
                }

                const data = omit(
                    this.isEditMode() ? { name } : { oid, name }, isEmpty
                )

                return isNotEmpty(data) ?
                    this.props
                        .actions
                        .form
                        .validateUniq(organizationId, data)
                        .then(uniq => success && uniq)
                    : success
            })
    }

    validateMarketplace () {
        const { marketplace } = this.props.form.fields.toJS()
        return this.props.actions.form.validateMarketplace(marketplace)
    }

    isEditMode () {
        return isNumber(this.props.communityId)
    }

    render () {

        const { tab } = this.state

        const {
            form,
            isOpen,
            communityId,
            organizationId
        } = this.props

        return (
            <Modal
                isOpen={isOpen}
                className='CommunityEditor'
                onClose={this.onClose}
                isCloseBtnDisabled={form.isFetching}
                title={this.isEditMode() ? 'Edit community details' : 'Create community'}
                dialogTitle="The updates will not be saved."
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
                <CommunityForm
                    tab={tab}
                    communityId={communityId}
                    organizationId={organizationId}

                    onSubmit={this.onSave}
                    onChangeTab={this.onChangeTab}
                />
            </Modal>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommunityEditor))