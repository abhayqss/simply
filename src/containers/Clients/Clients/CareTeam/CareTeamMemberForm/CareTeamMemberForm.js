import React, {Component} from 'react'

import {
    map,
    flatten,
    isNumber,
    findWhere
} from 'underscore'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {bindActionCreators} from 'redux'

import cn from 'classnames'
import PropTypes from 'prop-types'
import {Form, Col, Row} from 'reactstrap'

import './CareTeamMemberForm.scss'

import TextField from 'components/Form/TextField/TextField'
import SelectField from 'components/Form/SelectField/SelectField'
import CheckboxField from 'components/Form/CheckboxField/CheckboxField'

import EventSection from './EventSection/EventSection'

import * as careTeamMemberFormActions from 'redux/care/team/member/form/careTeamMemberFormActions'
import * as careTeamMemberDetailsActions from 'redux/care/team/member/details/careTeamMemberDetailsActions'

import * as roleListActions from 'redux/directory/care/team/role/list/careTeamRoleListActions'
import * as channelListActions from 'redux/directory/care/team/channel/list/careTeamChannelListActions'
import * as employeeListActions from 'redux/directory/care/team/employee/list/careTeamEmployeeListActions'
import * as responsibilityListActions from 'redux/directory/care/team/responsibility/list/careTeamResponsibilityListActions'
import * as preferenceListActions from 'redux/directory/care/team/notification/preference/list/careTeamNotificationPreferenceListActions'

function mapStateToProps (state) {
    const { form, details } = state.care.team.member

    return {
        error: form.error,
        fields: form.fields,
        isValid: form.isValid,
        isFetching: form.isFetching,

        details,
        directory: state.directory
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(careTeamMemberFormActions, dispatch),

            details: bindActionCreators(careTeamMemberDetailsActions, dispatch),

            directory: {
                role: {list: bindActionCreators(roleListActions, dispatch)},
                channel: {list: bindActionCreators(channelListActions, dispatch)},
                employee: {list: bindActionCreators(employeeListActions, dispatch)},
                preference: {list: bindActionCreators(preferenceListActions, dispatch)},
                responsibility: {list: bindActionCreators(responsibilityListActions, dispatch)},
            },
        }
    }
}

class CareTeamMemberForm extends Component {
    static propTypes = {
        memberId: PropTypes.number
    }

    state = {
        allChannels: null,
        allResponsibilities: null,
    }

    componentDidMount () {
        const { actions , memberId , match} = this.props

        this.loadDirectoryData()

        if (this.isEditMode()) {
            actions.details.load(memberId, {
                clientId: match.params.clientId,
                communityId: match.params.commId
            })
        }
    }

    componentDidUpdate (prevProps) {
        const { details, directory } = this.props

        if (prevProps.fields.roleId !== this.props.fields.roleId) {
            this.loadNotificationPreferenceList()
        }

        if (directory.care.team.notification.preference.list.dataSource.data
            !== prevProps.directory.care.team.notification.preference.list.dataSource.data) {

            this.onChangeField('notificationPreferences',
              flatten(map(directory.care.team.notification.preference.list.dataSource.data, o => {
                    return o.preferences
              })))
        }

        if (details.data && (details.data !== prevProps.details.data)) {
            this.changeFormFields(details.data)
        }
    }

    onChangeField = (field, value) => {
        this.changeField(field, value)
    }

    onChangeChannelField = (eventTypeId, channels, isForAll) => {
        let preferences
        const { notificationPreferences } = this.props.fields

        if (isForAll) {
            preferences = map(notificationPreferences, (o, i) =>
                ({ ...o, channels })
            )
        }

        else {
            preferences = map(notificationPreferences, (o, i) =>
                (o.eventTypeId === eventTypeId)
                    ? { ...o, channels }
                    : o
            )
        }

        this.changeField('notificationPreferences', preferences)
    }

    onChangeResponsibilityField = (eventTypeId, responsibility, isForAll) => {
        let preferences
        const { notificationPreferences } = this.props.fields

        if (isForAll) {
            preferences = map(notificationPreferences, (o, i) =>
                ({ ...o, responsibility })
            )
        }

        else {
            preferences = map(notificationPreferences, (o, i) =>
                (o.eventTypeId === eventTypeId)
                    ? { ...o, responsibility }
                    : o
            )
        }

        this.changeField('notificationPreferences', preferences)
    }

    onChangeAllChannelsField = (eventTypeId, channels) => {
        this.onChangeChannelField(eventTypeId, channels, true)

        this.setState({
            allChannels: channels
        })
    }

    onChangeAllResponsibilityField = (eventTypeId, responsibility) => {
        this.onChangeResponsibilityField(eventTypeId, responsibility, true)

        this.setState({
            allResponsibilities: responsibility
        })
    }

    isEditMode() {
        return isNumber(this.props.memberId)
    }

    changeFormFields (fields) {
        this.props.actions.changeFields({
            ...fields,
            roleId: fields.role.id,
            contactId: fields.employee.id,
            canChangeRole: fields.canChangeRole,
            canChangeEmployee: fields.canChangeEmployee,
        })

    }

    changeField (field, value) {
        const {actions} = this.props

        actions.changeField(field, value).then(() => {
            if (!this.props.isValid) this.validate()
        })
    }

    validate () {
        const data = this.props.fields.toJS()
        return this.props.actions.validate(data)
    }

    loadNotificationPreferenceList () {
        const { actions, memberId, fields } = this.props

        actions
            .directory
            .preference
            .list
            .load({
                memberId,
                careTeamRoleId: fields.roleId
            })
    }

    loadDirectoryData () {
        const {
            role,
            channel,
            employee,
            responsibility
        } = this.props.actions.directory

        role.list.load()
        channel.list.load()
        employee.list.load({
            isAffiliated: false,
            memberId: 0
        })
        responsibility.list.load()
    }

    render () {
        const {
            allChannels,
            allResponsibilities
        } = this.state

        const {
            fields,
            className,
            directory,
        } = this.props

        const {
            team
        } = directory.care

        const {
            contactId,
            contactIdHasError,
            contactIdErrorText,

            canChangeEmployee,

            roleId,
            roleIdHasError,
            roleIdErrorText,

            canChangeRole,

            description,
            descriptionHasError,
            descriptionErrorText,

            isIncludedInFaceSheet,
            isIncludedInFaceSheetHasError,
            isIncludedInFaceSheetErrorText,

            notificationPreferences
        } = fields

        return (
            <Form className={cn('CareTeamMemberForm', className)}>
                <div className='CareTeamMemberForm-Section'>
                    <div className='CareTeamMemberForm-SectionTitle'>
                        General
                    </div>
                    <Row>
                        <Col md={4}>
                            <SelectField
                                name='contactId'
                                value={contactId}
                                options={map(team.employee.list.dataSource.data, ({id, label}) => ({
                                    text: label, value: id
                                }))}
                                label='Contact Name*'
                                className='CareTeamMemberForm-SelectField'
                                defaultText={'Select Contact'}
                                hasSearchBox={true}
                                isDisabled={!canChangeEmployee}
                                hasError={contactIdHasError}
                                errorText={contactIdErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={4}>
                            <SelectField
                                name='roleId'
                                value={roleId}
                                options={map(team.role.list.dataSource.data, ({id, name}) => ({
                                    text: name, value: id
                                }))}
                                label='Role*'
                                defaultText={'Select Role'}
                                className='CareTeamMemberForm-SelectField'
                                isDisabled={!canChangeRole}
                                hasError={roleIdHasError}
                                errorText={roleIdErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                name='description'
                                value={description}
                                label='Description'
                                className='CareTeamMemberForm-TextField'
                                hasError={descriptionHasError}
                                errorText={descriptionErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <CheckboxField
                                name='isIncludedInFaceSheet'
                                value={isIncludedInFaceSheet}
                                hasError={isIncludedInFaceSheetHasError}
                                errorText={isIncludedInFaceSheetErrorText}
                                label={'Include contact in the face sheet document'}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                </div>
                {(!!notificationPreferences.length) && (
                    <>
                        <div className='CareTeamMemberForm-Section'>
                            <div className='CareTeamMemberForm-SectionTitle'>
                                Notification Preferences
                            </div>
                            <EventSection
                                eventType="All"
                                eventTypeId={-1}
                                sectionIndex={-1}
                                channel={allChannels}
                                responsibility={allResponsibilities}
                                channels={team.channel.list.dataSource.data}
                                responsibilities={team.responsibility.list.dataSource.data}
                                onChangeChannel={this.onChangeAllChannelsField}
                                onChangeResponsibility={this.onChangeAllResponsibilityField}
                            />
                        </div>
                        {map(team.notification.preference.list.dataSource.data, (o, i) => (
                            <div key={i} className='CareTeamMemberForm-Section'>
                                <div className='CareTeamMemberForm-SectionTitle'>
                                    {o.name}
                                </div>
                                {map(o.preferences, (ob, j) => (
                                    <EventSection
                                        className="notificationPreferenceDetail"
                                        key={ob.eventTypeId}
                                        eventType={ob.eventType}
                                        eventTypeId={ob.eventTypeId}
                                        sectionIndex={i}
                                        channel={findWhere(notificationPreferences, {eventTypeId: ob.eventTypeId}).channels}
                                        responsibility={findWhere(notificationPreferences, {eventTypeId: ob.eventTypeId}).responsibility}
                                        channels={team.channel.list.dataSource.data}
                                        responsibilities={team.responsibility.list.dataSource.data}
                                        onChangeChannel={this.onChangeChannelField}
                                        onChangeResponsibility={this.onChangeResponsibilityField}
                                    />
                                ))}
                            </div>
                        ))}
                    </>
                )}
            </Form>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CareTeamMemberForm))