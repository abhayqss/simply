import React, { Component } from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import PropTypes from 'prop-types'

import {
    map,
    any,
    all,
    pick,
    omit,
    isEqual,
    isNumber,
    findWhere
} from 'underscore'

import {Button} from 'reactstrap'

import './ServicePlanEditor.scss'

import Modal from 'components/Modal/Modal'

import { omitEmptyProps, isEmpty, omitDeep } from 'lib/utils/Utils'

import {ReactComponent as Info} from 'images/info.svg'

import * as servicePlanFormActions from 'redux/client/servicePlan/form/servicePlanFormActions'

import ServicePlanForm from '../ServicePlanForm/ServicePlanForm'

const RELEVANT_ACTIVATION_OR_EDUCATION_TASK = "RELEVANT_ACTIVATION_OR_EDUCATION_TASK"

function Hint ({ isOpen, onEnter, onLeave }) {
    return (
        <div className="Hint">
            Scoring
            <div
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                className="Hint-Wrapper">
                <Info className="Hint-InfoIcon" />
                {isOpen && (
                    <div className="HintContainer">
                        <div className="Hint-Header">
                            <div className='flex-1 text-center'>
                                   <span className="Hint-HeaderText">
                                       Score
                                   </span>
                            </div>
                            <div className='flex-4'>
                                   <span className="Hint-HeaderText">
                                       Guidelines / Parameters
                                   </span>
                            </div>
                        </div>
                        <div className="Hint-Detail">
                            <div className='flex-1 text-center'>
                                   <div className="Hint-DetailNumber">
                                       5
                                   </div>
                            </div>
                            <div className='flex-4'>
                                   <span className="Hint-DetailText">
                                       Client has no capability or resource in the area;
                                       requires immediate intervention or correction;
                                       client is at serious risk if not addressed
                                   </span>
                            </div>
                        </div>
                        <div className="Hint-Detail">
                            <div className='flex-1 text-center'>
                                   <div className="Hint-DetailNumber">
                                       4
                                   </div>
                            </div>
                            <div className='flex-4'>
                                   <span className="Hint-DetailText">
                                       Client has limited capabilities in this area or current
                                       or historical resources are unreliable or inconsistent
                                   </span>
                            </div>
                        </div>
                        <div className="Hint-Detail">
                            <div className='flex-1 text-center'>
                                   <div className="Hint-DetailNumber">
                                       3
                                   </div>
                            </div>
                            <div className='flex-4'>
                                   <span className="Hint-DetailText">
                                       Client some resources or capability in this area;
                                       has developed workarounds or relies on caregivers/others
                                       for some assistance on a regular or consistent basis;
                                       could benefit from self-management development
                                   </span>
                            </div>
                        </div>
                        <div className="Hint-Detail">
                            <div className='flex-1 text-center'>
                                   <div className="Hint-DetailNumber">
                                       2
                                   </div>
                            </div>
                            <div className='flex-4'>
                                   <span className="Hint-DetailText">
                                       Client is generally capable of self-management
                                       or accomplishing issues but could benefit from
                                       tweaking or additional services/education;
                                       caregiver or external assistance is minimal
                                       or minor
                                   </span>
                            </div>
                        </div>
                        <div className="Hint-Detail">
                            <div className='flex-1 text-center'>
                               <div className="Hint-DetailNumber"
                                    style={{marginLeft: 38}}>
                                   1
                               </div>
                            </div>
                            <div className='flex-4'>
                               <span className="Hint-DetailText">
                                   Does not apply or Client is fully capable of
                                   self-management or can accomplish all issues
                                   on their own
                               </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function mapStateToProps (state) {
    const {
        client,
        directory
    } = state

    const {
        form,
        details
    } = client.servicePlan

    return {
        form,
        details,
        directory
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            form: bindActionCreators(servicePlanFormActions, dispatch)
        }
    }
}

class ServicePlanEditor extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
        planId: PropTypes.number,
        clientId: PropTypes.number,

        onClose: PropTypes.func,
        onDeleteGoal: PropTypes.func,
        onDeleteNeed: PropTypes.func,
        onChangeNeed: PropTypes.func,
        onSaveSuccess: PropTypes.func,
    }

    static defaultProps = {
        onClose: function () {}
    }

    state = {
        tab: 0,
        isScoringHintOpen: false,
    }

    onClose = () => {
        this.props.onClose(
            this.isFormDataChanged()
        )
    }

    onNext = () => {
        this.validate().then(success => {
            if (success) {
                this.setState({ tab: 1 })
            }
        })
    }

    onBack = () => {
        this.setState({ tab: 0 })
    }

    onSave = () => {
        this.validate().then(success => {
            if (success) {
                this.save()
            }
        })
    }

    onChangeTab = tab => {
        this.setState({ tab })
    }

    onEnterScoringHint = () => {
        this.setState({
            isScoringHintOpen: true
        })
    }

    onLeaveScoringHint = () => {
        this.setState({
            isScoringHintOpen: false
        })
    }

    onDeleteNeed = (needIndex, onDeleteNeedWithAnchorTag, isEducationTask) => {
        this.props.onDeleteNeed(needIndex, this.needFieldsChangeChecker(needIndex), onDeleteNeedWithAnchorTag, isEducationTask)
    }

    onDeleteGoal = (needIndex, index) => {
        this.props.onDeleteGoal(needIndex, index, this.goalFieldsChangeChecker(needIndex, index))
    }

    onChangeNeed = (needIndex, field, value, isEducationTask, onRestorePrevOption, onReorderingAnchors) => {
        this.props.onChangeNeed(needIndex, field, value, this.needFieldsChangeChecker(needIndex, true), isEducationTask, onRestorePrevOption, onReorderingAnchors)
    }

    get clientId() {
        return +this.props.match.params.clientId
    }

    goalFieldsChangeChecker (needIndex, index) {
        const {form} = this.props

        const filter = (v, k) => !(
            k.includes('HasError') || k.includes('ErrorText')
        )

        const goal = form.fields.getIn(['needs', needIndex, 'fields', 'goals', index, 'fields'])

        return !isEmpty(omitEmptyProps(pick(goal.toJS(), filter)))
    }

    needFieldsChangeChecker (needIndex, isDomainFieldPopulated) {
        const {form} = this.props

        const filter = (v, k) => !(
            k.includes('HasError') || k.includes('ErrorText')
        )

        const need = form.fields.getIn(['needs', needIndex, 'fields'])

        return isDomainFieldPopulated
            ? !isEmpty(omitEmptyProps(pick(omit(need.toJS(), ['domainId', 'needScore']), filter)))
            : !isEmpty(omitEmptyProps(pick(omit(need.toJS(), 'needScore'), filter)))
    }

    isFormDataChanged () {
        const {
            details,
            form: { fields }
        } = this.props


        const excluded = [
            'needs',
            'goals',
            'clientId',
            'createdBy',
            'dateCreated',
            'dateCompleted',
        ]

        const filter = (v, k) => (
            k.includes('HasError')
            || k.includes('ErrorText')
            || excluded.includes(k)
        )

        return !isEqual(
            // check common fields
            omitDeep(fields.toJS(), filter),
            omitDeep(
                this.isEditMode() ? details.data
                    : fields.clear().toJS(),
                filter
            )
        ) || (
            // if no changes, check lengths of need lists
            (details.data && details.data.needs || []).length !== fields.needs.size
        ) || (
            // if no changes, check every need
            any(details.data && details.data.needs, (n, i) => {
                return !(
                    isEqual(
                        // check need fields
                        omitDeep(n, filter),
                        omitDeep(fields.getIn(['needs', i, 'fields']).toJS(), filter)
                    ) && (
                        // if no changes, check lengths of goal lists
                        (n.goals || []).length === fields.getIn(['needs', i, 'fields']).toJS().goals.length
                    ) && all(n.goals, (g, j) => {
                        return (
                            isEqual(
                                // if no changes, check every goal
                                omitDeep(g, filter),
                                omitDeep(fields.getIn(['needs', i, 'fields', 'goals', j, 'fields']).toJS(), filter)
                            )
                        )
                    })
                )
            })
        )
    }

    isEditMode () {
        return isNumber(this.props.planId)
    }

    isAnyNeedExist () {
        return !isEmpty(this.props.form.fields.needs.toJS())
    }

    save () {
        let data = this.props.form.fields.toJS()

        const filter = (v, k) => !(
            k.includes('HasError') || k.includes('ErrorText')
        )

        const fields = pick(data, filter)

        const needs = map(data.needs, need => {
            const needFields = pick(need.fields, filter)
            const goalFields = map(needFields.goals, goal => pick(goal.fields, filter))

            return {
                ...omit(needFields, 'goals'),
                goals: goalFields
            }
        })

        this
            .props
            .actions
            .form
            .submit({
                ...omit(fields, 'needs'),
                needs
            }, this.clientId)
            .then(({ success } = {}) => {
                if (success) {
                    this.props.onSaveSuccess(this.isFormDataChanged())
                }
            })
    }

    clear () {
        this.props.actions.form.clear()
    }

    validate() {
        const {form, actions, directory} = this.props

        const data = form.fields.toJS()

        return actions.form.validate(data, findWhere(directory
            .servicePlan
            .need
            .domain
            .list
            .dataSource
            .data, {name: RELEVANT_ACTIVATION_OR_EDUCATION_TASK})
        )
    }

    render () {
        const { tab } = this.state
        const { isOpen, planId } = this.props

        return (
            <Modal
                isOpen={isOpen}
                onClose={this.onClose}
                className='ServicePlanEditor'
                footerClassName='ServicePlanEditor-Footer'
                renderHeader={()=>(tab === 0 ? `${this.isEditMode() ? 'Edit' : 'Create'} Service Plan` : (
                    <Hint
                        isOpen={this.state.isScoringHintOpen}
                        onEnter={this.onEnterScoringHint}
                        onLeave={this.onLeaveScoringHint}
                    />
                ))
                }
                renderFooter={() => (
                    <>
                        {tab === 0 && (
                            <Button outline color='success' onClick={this.onClose}>Cancel</Button>
                        )}
                        {tab > 0 && (
                            <Button outline color='success' onClick={this.onBack}>Back</Button>
                        )}
                        {tab < 1 && this.isAnyNeedExist() && (
                            <Button color='success' onClick={this.onNext}>Next</Button>
                        )}
                        {(tab === 1 || !this.isAnyNeedExist()) && (
                            <Button color='success' onClick={this.onSave}>Save</Button>
                        )}
                    </>
                )}>
                <ServicePlanForm
                    tab={tab}
                    planId={planId}
                    onSubmit={this.onSave}
                    onChangeTab={this.onChangeTab}
                    onDeleteGoal={this.onDeleteGoal}
                    onDeleteNeed={this.onDeleteNeed}
                    onChangeNeed={this.onChangeNeed}
                />
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicePlanEditor)