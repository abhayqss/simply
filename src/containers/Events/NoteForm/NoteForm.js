import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {map, findWhere, filter, isNumber} from 'underscore'

import cn from 'classnames'
import PropTypes from 'prop-types'
import {Form, Col, Row} from 'reactstrap'

import {withRouter} from 'react-router'

import {DateUtils as DU, isEmpty, isNull} from 'lib/utils/Utils'

import * as noteFormActions from 'redux/note/form/noteFormActions'
import * as noteDetailsActions from 'redux/note/details/noteDetailsActions'

import TextField from 'components/Form/TextField/TextField'
import DateField from 'components/Form/DateField/DateField'
import SelectField from 'components/Form/SelectField/SelectField'

import * as noteTypeListActions from 'redux/directory/note/type/list/noteTypeListActions'
import * as noteAdmittanceListActions from 'redux/directory/note/admittance/list/noteAdmittanceListActions'
import * as noteEncounterTypeListActions from 'redux/directory/note/encounter/type/list/noteEncounterTypeListActions'

import './NoteForm.scss'

const {diffDates, startOf, endOf} = DU

const CM = 'CM'
const ENCOUNTER = 'ENCOUNTER'

function isEncounterType (type) {
    return type && (
        !isNull(type.encounterCode)
            ? type.encounterCode.includes(ENCOUNTER)
            : false
        )
}

function isCareManagementType (type) {
    return type && (
        !isNull(type.followUpCode)
            ? type.followUpCode.includes(CM)
            : false
        )
}

function mapStateToProps (state) {
    const { form } = state.note

    return {
        error: form.error,
        fields: form.fields,
        isValid: form.isValid,
        isFetching: form.isFetching,

        auth: state.auth,

        details: state.note.details,

        directory: state.directory
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(noteFormActions, dispatch),

            details: bindActionCreators(noteDetailsActions, dispatch),

            directory: {
                note: {
                    type: {list: bindActionCreators(noteTypeListActions, dispatch)},
                    encounter: {
                        type: {list: bindActionCreators(noteEncounterTypeListActions, dispatch)},
                    },
                    admittance: {list: bindActionCreators(noteAdmittanceListActions, dispatch)}
                },
            },
        }
    }
}

class NoteForm extends Component {

    static propTypes = {
        noteId: PropTypes.number,
        eventId: PropTypes.number
    }

    state = {
        validationOptions : null
    }

    componentDidMount () {
        const { actions, match, noteId} = this.props

        if (this.isEditMode()) {
            actions.details.load(noteId, match.params.clientId)
        }

        this.loadDirectoryData()

        this.changeFromField(new Date())
        this.changePersonSubmittingNoteField()
        this.changeEventId()
    }

    componentDidUpdate (prevProps) {
        const {fields, actions, details, directory} = this.props

        if (fields.from !== prevProps.fields.from) {
            this.onChangeDateField('to', new Date(fields.from).setMinutes(new Date(fields.from).getMinutes() + 30 ))
        }

        if (fields.to !== prevProps.fields.to) {
            this.updateEncounterAutoPopulatedFields(fields.from, fields.to)
        }

        const noteTypes = directory.note.type.list.dataSource.data
        const prevNoteTypes = prevProps.directory.note.type.list.dataSource.data

        if (noteTypes !== prevNoteTypes) {
            this.setState({
                validationOptions: {
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
            })
        }

        if (details.data && (details.data !== prevProps.details.data)) {
            actions.changeFields(details.data)
        }
    }

    onChangeField = (field, value) => {
        const {actions} = this.props

        actions.changeField(field, value).then(() => {
            if (!this.props.isValid) this.validate(this.state.validationOptions)
        })
    }

    onChangeDateField = (field, value) => {
        const {actions} = this.props

        actions.changeField(field, value ? new Date(value).getTime() : null).then(() => {
            if (!this.props.isValid) this.validate(this.state.validationOptions)
        })
    }

    isEditMode() {
        return isNumber(this.props.noteId)
    }

    changeEventId () {
        this.onChangeField('eventId', this.props.eventId)
    }

    changePersonSubmittingNoteField () {
        this.onChangeField('personSubmittingNote', this.props.auth.login.user.data.fullName)
    }

    updateEncounterAutoPopulatedFields (from, to) {
        let totalSpentTime = diffDates(new Date(from), new Date(to), 'minutes') / (60 * 1000)

        let units = Math.floor(totalSpentTime / 15);
        let r = totalSpentTime % 15;

        if (r > 7) {
            units += 1;
        }

        let startRange = units * 15 - 7;
        let endRange = units * 15 + 7;

        if (startRange < 0) {
            startRange = 0;
        }

        this.onChangeField('units', units)
        this.onChangeField('totalSpentTime', totalSpentTime)
        this.onChangeField('range', `${startRange} mins - ${endRange} mins`)
    }

    changeFromField (date) {
        const minutes = date.getMinutes()

        let currentSlot = ''

        if (( 0 <= minutes ) && ( minutes < 30 )) {
            currentSlot = startOf(date, 'hours')
            currentSlot = new Date(currentSlot.setMinutes(currentSlot.getMinutes() + 30 ))
        }

        else if ((30 <= minutes) && (minutes <= 59)) {
            currentSlot = endOf(date, 'hours')
            currentSlot = new Date(currentSlot.setMinutes(currentSlot.getMinutes() + 1 ))
        }

        this.onChangeDateField('from', currentSlot)
    }

    loadDirectoryData() {
        const { actions, match } = this.props

        actions.directory.note.type.list.load()
        actions.directory.note.encounter.type.list.load()
        actions.directory.note.admittance.list.load(match.params.clientId)
    }

    validate (options) {
        const data = this.props.fields.toJS()
        return this.props.actions.validate(data, options)
    }

    render () {
        const {
            fields,
            className,
            directory,
        } = this.props

        const {
            note
        } = directory

        let noteTypes = note.type.list.dataSource.data
        let noteAdmittanceDates = note.admittance.list.dataSource.data

        const isEncounterTypeSelected = isEncounterType(findWhere(noteTypes, {
            id: fields.subTypeId
        }))

        const isCareManagementTypeSelected = isCareManagementType(findWhere(noteTypes, {
            id: fields.subTypeId
        }))

        const {
            personSubmittingNote,
            personSubmittingNoteHasError,
            personSubmittingNoteErrorText,

            lastModifiedDate,
            lastModifiedDateHasError,
            lastModifiedDateErrorText,

            subTypeId,
            subTypeIdHasError,
            subTypeIdErrorText,

            admitDate,
            admitDateHasError,
            admitDateErrorText,

            encounterNoteTypeId,
            encounterNoteTypeIdHasError,
            encounterNoteTypeIdErrorText,

            clinicianCompletingEncounter,
            clinicianCompletingEncounterHasError,
            clinicianCompletingEncounterErrorText,

            encounterDate,
            encounterDateHasError,
            encounterDateErrorText,

            from,
            fromHasError,
            fromErrorText,

            to,
            toHasError,
            toErrorText,

            totalSpentTime,
            totalSpentTimeHasError,
            totalSpentTimeErrorText,

            range,
            rangeHasError,
            rangeErrorText,

            units,
            unitsHasError,
            unitsErrorText,

            subjective,
            subjectiveHasError,
            subjectiveErrorText,

            objective,
            objectiveHasError,
            objectiveErrorText,

            assessment,
            assessmentHasError,
            assessmentErrorText,

            plan,
            planHasError,
            planErrorText,
        } = fields

        const minTime = new Date(from).setMinutes(new Date(from).getMinutes() + 30)

        return (
            <Form className={cn('NoteForm', className)}>
                <div className='NoteForm-Section'>
                    <Row>
                        <Col md={6}>
                            <TextField
                                type='text'
                                name='personSubmittingNote'
                                value={personSubmittingNote}
                                isDisabled={true}
                                label='Person Submitting Note*'
                                className='NoteForm-TextField'
                                hasError={personSubmittingNoteHasError}
                                errorText={personSubmittingNoteErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={6}>
                            <DateField
                                type='text'
                                name='lastModifiedDate'
                                value={lastModifiedDate}
                                label='Note Date and Time*'
                                className='NoteForm-TextField'
                                hasError={lastModifiedDateHasError}
                                errorText={lastModifiedDateErrorText}
                                onChange={this.onChangeDateField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <SelectField
                                type='text'
                                name='subTypeId'
                                value={subTypeId}
                                options={map(noteTypes, ({id, label, followUpCode}) => {
                                 return isEmpty(noteAdmittanceDates)
                                     ? {text: label, value: id, isDisabled: !!followUpCode}
                                     : {text: label, value: id}
                                })}
                                label='Note Type*'
                                className='NoteForm-SelectField'
                                hasError={subTypeIdHasError}
                                errorText={subTypeIdErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={6}>
                            <SelectField
                                name='admitDate'
                                value={admitDate}
                                options={map(noteAdmittanceDates, ({id, admitDate}) => ({
                                    text: admitDate, value: new Date(admitDate).getTime()
                                }))}
                                isDisabled={!isCareManagementTypeSelected}
                                label={isEncounterTypeSelected ? 'Admit / Intake Date*' : 'Admit Date*'}
                                className='NoteForm-TextField'
                                hasError={admitDateHasError}
                                errorText={admitDateErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    {isEncounterTypeSelected && (
                        <>
                            <Row>
                                <Col md={6}>
                                    <SelectField
                                        type='text'
                                        name='encounterNoteTypeId'
                                        value={encounterNoteTypeId}
                                        options={map(note.encounter.type.list.dataSource.data, ({id, label}) => ({
                                            text: label, value: id
                                        }))}
                                        label='Encounter type*'
                                        className='NoteForm-SelectField'
                                        hasError={encounterNoteTypeIdHasError}
                                        errorText={encounterNoteTypeIdErrorText}
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                                <Col md={6}>
                                    <TextField
                                        type='text'
                                        name='clinicianCompletingEncounter'
                                        value={clinicianCompletingEncounter}
                                        label='Clinician completing encounter'
                                        className='NoteForm-TextField'
                                        hasError={clinicianCompletingEncounterHasError}
                                        errorText={clinicianCompletingEncounterErrorText}
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <DateField
                                        name='encounterDate'
                                        value={encounterDate}
                                        label='Encounter date*'
                                        className='NoteForm-TextField'
                                        hasError={encounterDateHasError}
                                        errorText={encounterDateErrorText}
                                        onChange={this.onChangeDateField}
                                    />
                                </Col>
                                <Col md={3}>
                                    <DateField
                                        name='from'
                                        value={from}
                                        label='From*'
                                        className='NoteForm-SelectField'
                                        timeFormat='HH:mm aa'
                                        hasTimeSelect={true}
                                        hasTimeSelectOnly={true}
                                        hasError={fromHasError}
                                        errorText={fromErrorText}
                                        onChange={this.onChangeDateField}
                                    />
                                </Col>
                                <Col md={3}>
                                    <DateField
                                        name='to'
                                        value={to}
                                        label='To*'
                                        className='NoteForm-SelectField'
                                        timeFormat='HH:mm aa'
                                        minTime={minTime}
                                        hasTimeSelect={true}
                                        hasTimeSelectOnly={true}
                                        hasError={toHasError}
                                        errorText={toErrorText}
                                        onChange={this.onChangeDateField}
                                    />
                                </Col>
                                <Col md={3}>
                                    <TextField
                                        type='text'
                                        name='totalSpentTime'
                                        value={totalSpentTime}
                                        isDisabled={true}
                                        label='Total time spent'
                                        className='NoteForm-TextField'
                                        hasError={totalSpentTimeHasError}
                                        errorText={totalSpentTimeErrorText}
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <TextField
                                        type='text'
                                        name='range'
                                        value={range}
                                        label='Range'
                                        isDisabled={true}
                                        className='NoteForm-TextField'
                                        hasError={rangeHasError}
                                        errorText={rangeErrorText}
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                                <Col md={3}>
                                    <TextField
                                        type='text'
                                        name='units'
                                        value={units}
                                        isDisabled={true}
                                        label='Units'
                                        className='NoteForm-TextField'
                                        hasError={unitsHasError}
                                        errorText={unitsErrorText}
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                            </Row>
                        </>
                    )}
                    <Row>
                        <Col md={12}>
                            <TextField
                                type='textarea'
                                name='subjective'
                                value={subjective}
                                label='Subjective*'
                                className='NoteForm-TextArea'
                                hasError={subjectiveHasError}
                                errorText={subjectiveErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <TextField
                                type='textarea'
                                name='objective'
                                value={objective}
                                label='Objective'
                                className='NoteForm-TextArea'
                                hasError={objectiveHasError}
                                errorText={objectiveErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <TextField
                                type='textarea'
                                name='assessment'
                                value={assessment}
                                label='Assessment'
                                className='NoteForm-TextArea'
                                hasError={assessmentHasError}
                                errorText={assessmentErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <TextField
                                type='textarea'
                                name='plan'
                                value={plan}
                                label='Plan'
                                className='NoteForm-TextArea'
                                hasError={planHasError}
                                errorText={planErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                </div>
            </Form>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteForm))