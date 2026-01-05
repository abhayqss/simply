import React, {Component} from 'react'

import PropTypes from 'prop-types'

import { findWhere, map } from 'underscore'

import { connect } from 'react-redux'

import {Button, Col, Row} from 'reactstrap'

import './NeedSection.scss'

import TextField from 'components/Form/TextField/TextField'
import DateField from 'components/Form/DateField/DateField'
import SelectField from 'components/Form/SelectField/SelectField'

import {ReactComponent as Delete} from 'images/delete.svg'

import GoalSection from '../GoalSection/GoalSection'

const RELEVANT_ACTIVATION_OR_EDUCATION_TASK = "RELEVANT_ACTIVATION_OR_EDUCATION_TASK"

function mapStateToProps(state) {
    return {
        directory: state.directory
    }
}

class NeedSection extends Component {

    static propTypes = {
        index: PropTypes.number,
        error: PropTypes.string,
        fields: PropTypes.object,

        isValid: PropTypes.bool,

        onDelete: PropTypes.func,
        onAddGoal: PropTypes.func,
        onDeleteGoal: PropTypes.func,
        onChangeField: PropTypes.func
    }

    static defaultProps = {
        fields: {},
        onDelete: () => {},
        onAddGoal: () => {},
        onDeleteGoal: () => {},
        onChangeField: () => {}
    }

    onDelete = () => {
        const {
            index,
            onDelete: cb
        } = this.props

        cb(index)
    }

    onAddGoal = () => {
        const {
            index,
            fields,
            onAddGoal: cb
        } = this.props

        cb(index, fields.goals.size)
    }

    onChangeField = (field, value) => {
        this.changeField(field, value)
    }

    onChangeDateField = (name, value) => {
        this.changeField(name, value ? new Date(value).getTime() : null)
    }

    onChangeSelectField = (name, value, onRestorePrevOption) => {
        this.changeField(name, value, onRestorePrevOption)
    }

    changeField (name, value, onRestorePrevOption) {
        const {
            index, onChangeField: cb
        } = this.props

        cb(index, name, value, onRestorePrevOption)
    }

    isEducationTask() {
        const {
            fields, directory
        } = this.props

        const domain = findWhere(
            directory.servicePlan.need.domain.list.dataSource,
            { value: fields.domainId }
        )

        return domain && (
            domain.name === RELEVANT_ACTIVATION_OR_EDUCATION_TASK
        )
    }

    render() {
        const {
            index,
            error,
            isValid,
            fields,
            directory,
            onDeleteGoal,
            onChangeGoalField,
        } = this.props

        const {
            domain, priority
        } = directory.servicePlan.need

        const domains = map(domain.list.dataSource.data, ({ id, name, title }) => ({
            name, text: title, value: id
        }))

        const priorities = map(priority.list.dataSource.data, ({ id, name, title }) => ({
            name, text: title, value: id
        }))

        return (
            <div id={"servicePlanNeed" + (index + 1)} className="NeedSection">
                <div className="NeedSection-Header">
                    <span className="NeedSection-StepCircle"/>
                    <div className="NeedSection-Title">
                        Need / Opportunity #{index + 1}
                    </div>
                    <Delete
                        className="NeedSection-DeleteBtn"
                        onClick={this.onDelete}
                    />
                </div>
                {this.isEducationTask() ? (
                    <>
                        <Row>
                            <Col md={9}>
                                <SelectField
                                    name="domainId"
                                    value={fields.domainId}
                                    options={domains}
                                    label="Domain*"
                                    defaultText={"Select"}
                                    className="NeedSection-SelectField"
                                    isMultiple={false}
                                    hasError={fields.domainIdHasError}
                                    errorText={fields.domainIdErrorText}
                                    onChange={this.onChangeSelectField}
                                />
                            </Col>
                            <Col md={3}>
                                <SelectField
                                    name="priorityId"
                                    value={fields.priorityId}
                                    options={priorities}
                                    label="Priority*"
                                    defaultText={"Select"}
                                    className="NeedSection-SelectField"
                                    isMultiple={false}
                                    hasError={fields.priorityIdHasError}
                                    errorText={fields.priorityIdErrorText}
                                    onChange={this.onChangeSelectField}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <TextField
                                    type="text"
                                    name="activationOrEducationTask"
                                    value={fields.activationOrEducationTask}
                                    label="Activation or Education Task*"
                                    className="NeedSection-TextField"
                                    hasError={fields.activationOrEducationTaskHasError}
                                    errorText={fields.activationOrEducationTaskErrorText}
                                    onChange={this.onChangeField}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <DateField
                                    name="targetCompletionDate"
                                    value={fields.targetCompletionDate}
                                    label="Target Completion Date*"
                                    className="NeedSection-TextField"
                                    timeFormat='hh:mm a'
                                    dateFormat="MM/dd/yyyy hh:mm a"
                                    hasTimeSelect={true}
                                    hasError={fields.targetCompletionDateHasError}
                                    errorText={fields.targetCompletionDateErrorText}
                                    onChange={this.onChangeDateField}
                                />
                            </Col>
                            <Col md={3}>
                                <DateField
                                    type="date"
                                    name="completionDate"
                                    timeFormat='hh:mm a'
                                    dateFormat="MM/dd/yyyy hh:mm a"
                                    value={fields.completionDate}
                                    label="Completion Date"
                                    className="NeedSection-TextField"
                                    hasTimeSelect={true}
                                    hasError={fields.completionDateHasError}
                                    errorText={fields.completionDateErrorText}
                                    onChange={this.onChangeDateField}
                                />
                            </Col>
                        </Row>
                    </>
                ) : (
                    <>
                        <Row>
                            <Col md={9}>
                                <SelectField
                                    name="domainId"
                                    value={fields.domainId}
                                    options={domains}
                                    label="Domain*"
                                    defaultText={"Select"}
                                    className="NeedSection-SelectField"
                                    isMultiple={false}
                                    hasError={fields.domainIdHasError}
                                    errorText={fields.domainIdErrorText}
                                    onChange={this.onChangeSelectField}
                                />
                            </Col>
                            <Col md={3}>
                                <SelectField
                                    name="priorityId"
                                    value={fields.priorityId}
                                    options={priorities}
                                    label="Priority*"
                                    defaultText={"Select"}
                                    className="NeedSection-SelectField"
                                    isMultiple={false}
                                    hasError={fields.priorityIdHasError}
                                    errorText={fields.priorityIdErrorText}
                                    onChange={this.onChangeSelectField}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <TextField
                                    type="text"
                                    name="needOpportunity"
                                    value={fields.needOpportunity}
                                    label="Need / Opportunity*"
                                    className="NeedSection-TextField"
                                    hasError={fields.needOpportunityHasError}
                                    errorText={fields.needOpportunityErrorText}
                                    onChange={this.onChangeField}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <TextField
                                    type="textarea"
                                    name="proficiencyGraduationCriteria"
                                    value={fields.proficiencyGraduationCriteria}
                                    label="Proficiency / Graduation Criteria"
                                    className="NeedSection-TextAreaField"
                                    hasError={fields.proficiencyGraduationCriteriaHasError}
                                    errorText={fields.proficiencyGraduationCriteriaErrorText}
                                    onChange={this.onChangeField}
                                />
                            </Col>
                        </Row>
                        <div className="NeedSection-GoalHeader">
                            <span className="NeedSection-GoalStepCircle"/>
                            <div className="NeedSection-GoalTitle">
                                Goals
                            </div>
                            <Button
                                color='success'
                                className="NeedSection-AddGoalBtn"
                                onClick={this.onAddGoal}>
                                Add a Goal
                            </Button>
                        </div>
                        {fields.goals.map((o, i) => (
                            <GoalSection
                                key={"goal" + i}

                                index={i}

                                error={o.error}
                                needIndex={index}
                                fields={o.fields}
                                isValid={o.isValid}

                                onDelete={onDeleteGoal}
                                onChangeField={onChangeGoalField}
                            />
                        ))
                        }
                    </>
                )}
                <span className="NeedSection-EndStepCircle"/>
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(NeedSection)
