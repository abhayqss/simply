import React, { Component } from 'react'

import {
    map,
    max,
    omit,
    chain,
    isNumber,
    findWhere
} from 'underscore'

import cn from 'classnames'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Form, Button, Col, Row } from 'reactstrap'

import './ServicePlanForm.scss'

import TextField from 'components/Form/TextField/TextField'
import DateField from 'components/Form/DateField/DateField'
import CheckboxField from 'components/Form/CheckboxField/CheckboxField'

import LoadServicePlanDetailsAction from 'actions/clients/LoadServicePlanDetailsAction'
import LoadServicePlanNeedDomainsAction from 'actions/directory/LoadServicePlanNeedDomainsAction'
import LoadServicePlanNeedPrioritiesAction from 'actions/directory/LoadServicePlanNeedPrioritiesAction'

import NeedSection from './NeedSection/NeedSection'

import ScoringSectionList from './ScoringSectionList'
import ScoringSectionActivationList from './ScoringSectionActivationList'

import * as servicePlanFormActions from 'redux/client/servicePlan/form/servicePlanFormActions'
import * as servicePlanDetailsActions from 'redux/client/servicePlan/details/servicePlanDetailsActions'

const RELEVANT_ACTIVATION_OR_EDUCATION_TASK = "RELEVANT_ACTIVATION_OR_EDUCATION_TASK"

const groupNeeds = needs => {
    return chain(needs)
        .groupBy(need => need.fields.domainId)
        .sortBy(group => (group[0].fields.domainName || '').toLowerCase())
        .sortBy(group => -max(group, need => need.fields.priorityId).fields.priorityId)
        .values()
        .value()
}

function updateAnchorNames(anchors, prevName, sameDomainCount) {
    let domainTypeCount = 0

    return anchors.map(anchor => {
        if (anchor.includes(prevName)) {
            const postfix = sameDomainCount > 1 ? ` #${++domainTypeCount}` : ''

            return `${prevName}${postfix}`
        }
        else {
            return anchor
        }
    })
}

function mapStateToProps(state) {
    const { form, details } = state.client.servicePlan
    return {
        error: form.error,
        fields: form.fields.toJS(),
        isValid: form.isValid,
        isFetching: form.isFetching,

        details,
        auth: {
            login: state.auth.login
        },
        directory: state.directory
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            ...bindActionCreators(servicePlanFormActions, dispatch),

            details: {
                ...bindActionCreators(servicePlanDetailsActions, dispatch),
            }
        }
    }
}

class ServicePlanForm extends Component {

    static propTypes = {
        tab: PropTypes.number,
        planId: PropTypes.number,
        onChangeTab: PropTypes.func,
        onDeleteGoal: PropTypes.func,
        onDeleteNeed: PropTypes.func,
        onChangeNeed: PropTypes.func
    }

    static defaultProps = {
        tab: 0,
        onChangeTab: () => {},
        onDeleteGoal: () => {},
        onDeleteNeed: () => {},
        onChangeNeed: () => {}
    }

    state = {
        value: 0,
        anchors: [],
        deletableNeed: null,
        deletableGoal: null
    }

    componentDidMount() {
        const {
            actions,
            clientId,
            planId
        } = this.props

        if (this.isEditMode()) {
            actions
                .details
                .load(planId, clientId)
        }

        else {
            this.clearDetails()
            this.changeCreatedByField()
            this.changeDateCreatedField()
        }
    }

    componentDidUpdate(prevProps) {
        const {
            actions,
            details,
        } = this.props

        if (details.data && (details.data !== prevProps.details.data)) {
            const needs = map(details.data.needs, (need, index) => {
                const goalFields = map(need.goals, (goal, i) => ({
                    index: i,
                    error: null,
                    fields: goal,
                    isValid: true,
                    needIndex: index,
                }))

                return {
                    index,
                    error: null,
                    isValid: true,
                    fields: {
                        goals: goalFields,
                        ...omit(need, 'goals'),
                    },
                }
            })

            actions.changeFields({
                needs,
                ...omit(details.data, 'needs'),
            })

            const anchorsToAdd = needs.map(need => need.fields.domainName)

            const newAnchors = this.addMultipleAnchors(this.state.anchors, anchorsToAdd)

            this.setState({ anchors: newAnchors })
        }
    }

    onChangeField = (field, value) => {
        const { actions } = this.props

        actions.changeField(field, value).then(() => {
            if (!this.props.isValid) this.validate()
        })
    }

    onChangeDateField = (field, value) => {
        const { actions } = this.props

        actions.changeField(field, value ? new Date(value).getTime() : null).then(() => {
            if (!this.props.isValid) this.validate()
        })
    }

    onChangeNeedField = (index, field, value, onRestorePrevOption, isNeedScoreField) => {
        const { actions } = this.props

        if (field === 'domainId' && this.isNeedTypeChanged(index, value)) {
            this.props.onChangeNeed(index, field, value, this.isEducationTaskDomain(index), onRestorePrevOption, this.onReorderingAnchors)
        }

        else {
            actions.changeNeedField(index, field, value, isNeedScoreField).then(() => {
                this.onReorderingAnchors(index, field, value)

                if (!this.props.isValid) this.validate()
            })
        }
    }

    onChangeGoalField = (index, needIndex, field, value) => {
        const { actions } = this.props

        actions.changeGoalField(index, needIndex, field, value).then(() => {
            if (!this.props.isValid) this.validate()
        })
    }

    onChangeRangeSlider = (value, needIndex) => {
        this.onChangeNeedField(needIndex, 'needScore', value, null, true)
    }

    onAddNeed = (index) => {
        const { actions } = this.props
        const anchors = this.addAnchorLink(this.state.anchors, 'Select')

        actions.addNeed(+index)
        this.setState({ anchors })
    }

    /*When we delete Need, anchors should be
     updated but when only user click on ConfirmDialog*/
    onDeleteNeed = (index) => {
        this.removeAnchorLink(index)
    }

    onAddGoal = (needIndex, index) => {
        const { actions } = this.props

        actions.addGoal(+needIndex, +index)
    }

    onDeleteGoal = (needIndex, index) => {
        this.props.onDeleteGoal(+needIndex, +index)
    }

    onDeleteNeed = (needIndex) => {
        const isEducationTask = this.isEducationTaskDomain(needIndex)

        this.props.onDeleteNeed(+needIndex, this.removeAnchorLink, isEducationTask)
    }

    onReorderingAnchors = (needIndex, field, value) => {
        if (field === 'domainId') {
            const {
                domain
            } = this.props.directory.servicePlan.need

            let selectedDomain = findWhere(domain.list.dataSource.data, { id: value })

            this.updateAnchorLink(needIndex, selectedDomain && selectedDomain.title || "Select")
        }
    }

    addAnchorLink = (anchors, name) => {
        let newAnchors = [...anchors, name]
        const sameDomainAnchors = newAnchors.filter(anchor => anchor.includes(name))
        const originName = name.replace(/\s#\d*/, '')
        const sameDomainCount = sameDomainAnchors.length

        if (sameDomainCount) {
            newAnchors = updateAnchorNames(newAnchors, originName, sameDomainCount)
        }

        return newAnchors
    }

    addMultipleAnchors = (anchors, names) => {
        let newAnchors = [...anchors]

        names.forEach(name => {
            newAnchors = this.addAnchorLink(newAnchors, name)
        })

        return newAnchors
    }

    updateAnchorLink = (index, newName) => {
        const { anchors } = this.state
        const originName = newName.replace(/\s#\d*/, '')

        const updatedAnchors = anchors.map((anchor, i) => i === index ? newName : anchor)
        const sameDomainAnchors = updatedAnchors.filter(anchor => anchor.includes(originName))
        const sameDomainCount = sameDomainAnchors.length

        let newAnchors = updatedAnchors

        if (sameDomainCount) {
            newAnchors = updateAnchorNames(updatedAnchors, originName, sameDomainCount)
        }

        this.setState({ anchors: newAnchors })
    }

    removeAnchorLink = (index) => {
        const { actions } = this.props
        const { anchors } = this.state
        const removingAnchor = anchors.find((a, i) => i === index)
        const originName = removingAnchor.replace(/\s#\d*/, '')

        const restAnchors = anchors.filter(a => a !== removingAnchor)
        const sameDomainAnchors = restAnchors.filter(a => a.includes(originName))
        const sameDomainCount = sameDomainAnchors.length

        let newAnchors = restAnchors

        if (sameDomainCount) {
            newAnchors = updateAnchorNames(restAnchors, originName, sameDomainCount)
        }

        this.setState({ anchors: newAnchors })
        actions.removeNeed(index)
    }

    get actions() {
        return this.props.actions
    }

    get clientId() {
        return +this.props.match.params.clientId
    }

    get error() {
        return this.props.error
    }

    changeDateCreatedField() {
        this.onChangeDateField('dateCreated', new Date())
    }

    changeCreatedByField() {
        this.onChangeField('createdBy', this.props.auth.login.user.data.fullName)
    }

    isNeedTypeChanged(needIndex, domainId) {
        const { directory, fields } = this.props

        const currentDomainId = fields.needs[needIndex].fields.domainId

        const educationDomainId = findWhere(directory
            .servicePlan
            .need
            .domain
            .list
            .dataSource
            .data, { name: RELEVANT_ACTIVATION_OR_EDUCATION_TASK }).id

        return currentDomainId
            && (((domainId === educationDomainId) && (currentDomainId !== educationDomainId))
                || ((domainId !== educationDomainId) && (currentDomainId === educationDomainId)))
    }

    isEducationTaskDomain(needIndex) {
        const { directory, fields } = this.props

        const currentDomainId = fields.needs[needIndex].fields.domainId

        const educationDomainId = findWhere(directory
            .servicePlan
            .need
            .domain
            .list
            .dataSource
            .data, { name: RELEVANT_ACTIVATION_OR_EDUCATION_TASK }).id

        return currentDomainId === educationDomainId
    }

    isEditMode() {
        return isNumber(this.props.planId)
    }

    validate() {
        const { fields, actions, directory } = this.props

        return actions.validate(fields, findWhere(directory
            .servicePlan
            .need
            .domain
            .list
            .dataSource
            .data, { name: RELEVANT_ACTIVATION_OR_EDUCATION_TASK }))
    }

    clear() {

    }

    clearDetails() {
        this.props
            .actions
            .details
            .clear()
    }

    render() {
        const {
            tab,
            planId,
            fields,
            directory,
            className
        } = this.props

        const {
            /* Summary */
            dateCreated,
            dateCreatedHasError,
            dateCreatedErrorText,

            createdBy,
            createdByHasError,
            createdByErrorText,

            isCompleted,
            isCompletedHasError,
            isCompletedErrorText,

            /* Need / Opportunities */
            needs
        } = fields

        const clientId = this.clientId

        const {
            domain, priority
        } = directory.servicePlan.need

        const domains = map(domain.list.dataSource.data, ({ id, name, title }) => ({
            name, text: title, value: id
        }))

        const priorities = map(priority.list.dataSource.data, ({ id, name, title }) => ({
            name, text: title, value: id
        }))

        const groupedNeeds = groupNeeds(needs)

        const {
            anchors
        } = this.state

        return (
            <Form className={cn('ServicePlanForm', className)}>
                <LoadServicePlanNeedDomainsAction/>
                <LoadServicePlanNeedPrioritiesAction/>
                <LoadServicePlanDetailsAction
                    params={{ clientId, planId }}
                    shouldPerform={() => this.isEditMode()}
                />
                {(tab === 0) && (
                    <div id="formSection" className="ServicePlanForm-Section">
                        <a className="ServicePlanForm-Anchors" href="#summary">
                            Summary
                        </a>
                        {anchors.map((anchor, index) => (
                            <a key={anchor} className="ServicePlanForm-Anchors" href={`#servicePlanNeed${++index}`}>
                                {anchor}
                            </a>
                        ))}
                        <div id="summary" className="ServicePlanForm-SectionTitle">
                            Summary
                        </div>
                        <Row>
                            <Col md={4}>
                                <DateField
                                    name="dateCreated"
                                    value={dateCreated}
                                    timeFormat='hh:mm a'
                                    dateFormat="MM/dd/yyyy hh:mm a"
                                    hasTimeSelect={true}
                                    label="Date Created*"
                                    className="ServicePlanForm-TextField"
                                    hasError={dateCreatedHasError}
                                    errorText={dateCreatedErrorText}
                                    isDisabled={this.isEditMode()}
                                    onChange={this.onChangeDateField}
                                />
                            </Col>
                            <Col md={4}>
                                <TextField
                                    isDisabled
                                    type="text"
                                    name="createdBy"
                                    value={createdBy}
                                    label="Created by*"
                                    className="ServicePlanForm-TextField"
                                    hasError={createdByHasError}
                                    errorText={createdByErrorText}
                                    onChange={this.onChangeField}
                                />
                            </Col>
                            <Col md={4}>
                                <CheckboxField
                                    name='isCompleted'
                                    value={isCompleted}
                                    label="Mark service plan as completed"
                                    className="ServicePlanForm-CheckboxField"
                                    hasError={isCompletedHasError}
                                    errorText={isCompletedErrorText}
                                    onChange={this.onChangeField}
                                />
                            </Col>
                        </Row>
                        <div className="ServicePlanForm-SectionHeader">
                            <div className="ServicePlanForm-SectionTitle">
                                Needs / Opportunities
                            </div>
                            <Button
                                color='success'
                                className="AddNeedBtn"
                                onClick={() => {
                                    this.onAddNeed(needs.length)
                                }}>
                                Add a Need / Opportunity
                            </Button>
                        </div>
                        {needs.map((o, index) => (
                            <NeedSection
                                key={"need" + index}

                                index={index}

                                error={o.error}
                                fields={o.fields}
                                isValid={o.isValid}

                                onDelete={this.onDeleteNeed}//We have to use onDeleteNeed
                                onChangeField={this.onChangeNeedField}

                                onAddGoal={this.onAddGoal}
                                onDeleteGoal={this.onDeleteGoal}
                                onChangeGoalField={this.onChangeGoalField}
                                onReorderingAnchors={this.onReorderingAnchors}
                            />
                        ))}
                    </div>
                )}
                {(tab === 1) && (
                    <div id="formSection" className="ServicePlanForm-Section">
                        {groupedNeeds.map((need, i) => {
                            const domain = findWhere(domains, { value: need[0].fields.domainId })
                            const isEducationTask = domain && domain.name === RELEVANT_ACTIVATION_OR_EDUCATION_TASK

                            return isEducationTask ?
                                <ScoringSectionActivationList
                                    key={i + domain.name}
                                    groupedNeed={need}
                                />
                                :
                                <ScoringSectionList
                                    key={i + domain.name}
                                    domain={domain}
                                    groupedNeed={need}
                                    onChange={v => this.onChangeRangeSlider(v, need[0].index)}
                                />
                        })}
                    </div>
                )}
            </Form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicePlanForm)