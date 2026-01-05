import React, {Component} from 'react'

import PropTypes from 'prop-types'
import {Col, Row} from 'reactstrap'

import './GoalSection.scss'

import TextField from 'components/Form/TextField/TextField'
import DateField from 'components/Form/DateField/DateField'

import {isEmpty} from 'lib/utils/Utils'

import {ReactComponent as Delete} from 'images/delete.svg'

export default class GoalSection extends Component {

    static propTypes = {
        error: PropTypes.string,
        index: PropTypes.number,
        fields: PropTypes.object,
        needIndex: PropTypes.number,

        isValid: PropTypes.bool,

        onDelete: PropTypes.func,
        onChangeField: PropTypes.func
    }

    static defaultProps = {
        fields: {},
        onDelete: () => {},
        onChangeField: () => {}
    }

    onDelete = () => {
        const {
            index,
            needIndex,
            onDelete: cb
        } = this.props

        cb(needIndex, index)
    }

    onChangeField = (name, value) => {
        const {
            index,
            needIndex,
            onChangeField: cb
        } = this.props


         cb(needIndex, index, name, value)
    }

    onChangeGoalCompletionField = (name, value) => {
        if (isEmpty(value) || /^0*(?:[1-9][0-9]?|100)$/.test(value)) {
            this.onChangeField(name, value)
        }
    }

    onChangeDateField = (name, value) => {
        const {
            index, needIndex, onChangeField: cb
        } = this.props

        cb(needIndex, index, name, value ? new Date(value).getTime() : null)
    }

    render() {
        const {
            index,
            fields,
        } = this.props

        return (
            <div className="GoalSection">
                <div className="GoalSection-Header">
                    <div className="GoalSection-Title">
                        Goal #{index + 1}
                    </div>
                    <Delete
                        className="DeleteBtn"
                        onClick={this.onDelete}
                    />
                </div>
                <Row>
                    <Col md={12}>
                        <TextField
                            type="text"
                            name="goal"
                            value={fields.goal}
                            label="Goal*"
                            className="GoalSection-TextField"
                            hasError={fields.goalHasError}
                            errorText={fields.goalErrorText}
                            onChange={this.onChangeField}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <TextField
                            type="textarea"
                            name="barriers"
                            value={fields.barriers}
                            label="Barriers"
                            className="GoalSection-TextAreaField"
                            hasError={fields.barriersHasError}
                            errorText={fields.barriersErrorText}
                            onChange={this.onChangeField}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <TextField
                            type="textarea"
                            name="interventionAction"
                            value={fields.interventionAction}
                            label="Intervention/Action"
                            className="GoalSection-TextAreaField"
                            hasError={fields.interventionActionHasError}
                            errorText={fields.interventionActionErrorText}
                            onChange={this.onChangeField}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <TextField
                            type="text"
                            name="resourceName"
                            value={fields.resourceName}
                            label="Resource Name"
                            className="GoalSection-TextField"
                            hasError={fields.resourceNameHasError}
                            errorText={fields.resourceNameErrorText}
                            onChange={this.onChangeField}
                        />
                    </Col>
                    <Col md={3}>
                        <DateField
                            name="targetCompletionDate"
                            className="GoalSection-DateField"
                            value={fields.targetCompletionDate}
                            timeFormat='hh:mm a'
                            dateFormat="MM/dd/yyyy hh:mm a"
                            label="Target Completion Date*"
                            hasTimeSelect={true}
                            hasError={fields.targetCompletionDateHasError}
                            errorText={fields.targetCompletionDateErrorText}
                            onChange={this.onChangeDateField}
                        />
                    </Col>
                    <Col md={3}>
                        <DateField
                            name="completionDate"
                            className="GoalSection-DateField"
                            value={fields.completionDate}
                            timeFormat='hh:mm a'
                            dateFormat="MM/dd/yyyy hh:mm a"
                            label="Completion Date"
                            hasTimeSelect={true}
                            hasError={fields.completionDateHasError}
                            errorText={fields.completionDateErrorText}
                            onChange={this.onChangeDateField}
                        />
                    </Col>
                    <Col md={3}>
                        <TextField
                            type="text"
                            name="goalCompletion"
                            value={fields.goalCompletion}
                            label="Goal Completion, %"
                            className="GoalSection-TextField"
                            hasError={fields.goalCompletionHasError}
                            errorText={fields.goalCompletionErrorText}
                            onChange={this.onChangeGoalCompletionField}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}
