import React, { Component } from 'react'

import {
    map,
    omit,
    reject,
    compact,
    isEqual
} from 'underscore'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
    Row,
    Col,
    Button
} from 'reactstrap'

import TextField from 'components/Form/TextField/TextField'
import SelectField from 'components/Form/SelectField/SelectField'

import './ContactFilter.scss'

import * as contactListActions from 'redux/contact/list/contactListActions'
import * as systemRoleListActions from 'redux/directory/system/role/list/systemRoleListActions'
import * as contactStatusListActions from 'redux/directory/contact/status/list/contactStatusListActions'

import { isNotEmpty } from 'lib/utils/Utils'

import { Response } from 'lib/utils/AjaxUtils'

const NONE = 'NONE'

function mapStateToProps (state) {
    return {
        fields: state.contact.list.dataSource.filter,
        directory: state.directory
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(contactListActions, dispatch),

            directory: {
                system: {
                    role: { list: bindActionCreators(systemRoleListActions, dispatch) }
                },
                status: { list: bindActionCreators(contactStatusListActions, dispatch) }
            }
        }
    }
}

class ContactFilter extends Component {

    isFocused = false

    componentDidMount () {
        this.loadDirectoryData()

        window.addEventListener('keyup', this.onKeyUp)
    }

    componentWillUnmount () {
        window.removeEventListener('keyup', this.onKeyUp)
    }

    onKeyUp = ({ keyCode }) => {
        if (keyCode === 13 && this.isFocused) {
            this.change()
        }
    }

    onApply = () => {
        this.change()
    }

    onClear = () => {
        if (this.isChanged()) {
            const {
                system, contact
            } = this.props.directory

            this.change({
                email: '',
                lastName: '',
                firstName: '',
                excludeWithoutSystemRole: null,
                statuses: map(contact.status.list.dataSource.data, o => o.name),
                systemRoleIds: map(system.role.list.dataSource.data, o => o.id)
            })
        }
    }

    onFocusField = () => {
        this.isFocused = true
    }

    onBlurField = () => {
        this.isFocused = false
    }

    onChangeField = (name, value) => {
        this.changeField(name, value)
    }

    onChangeSystemRoleField = (name, value) => {
        this.change({
            systemRoleIds: reject(value, v => v === NONE),
            excludeWithoutSystemRole: (
                isNotEmpty(value) && !value.includes(NONE)
            ),
        }, false)
    }

    loadSystemRoles () {
        return this.props
                   .actions
                   .directory
                   .system
                   .role
                   .list
                   .load()
    }

    loadStatuses () {
        return this.props
                   .actions
                   .directory
                   .status
                   .list
                   .load()
    }

    loadDirectoryData () {
        this.loadStatuses()
            .then(Response(({ data }) => {
                this.changeField(
                    'statuses',
                    map(data, o => o.name)
                )
            }))

        this.loadSystemRoles()
            .then(Response(({ data }) => {
                this.change({
                    excludeWithoutSystemRole: null,
                    systemRoleIds: map(data, o => o.id)
                }, false)
            }))
    }

    areAllSystemRolesPicked () {
        const {
            fields,
            directory
        } = this.props

        return directory
            .system
            .role
            .list
            .dataSource
            .data
            .length === fields.systemRoleIds.length
    }

    areAllStatusesPicked () {
        const {
            fields,
            directory
        } = this.props

        return directory
            .contact
            .status
            .list
            .dataSource
            .data
            .length === fields.statuses.length
    }

    isChanged () {
        const {
            fields
        } = this.props

        const excluded = [
            'communityIds',
            'organizationId'
        ]

        if (this.areAllSystemRolesPicked()) {
            excluded.push('systemRoleIds')
        }

        if (this.areAllStatusesPicked()) {
            excluded.push('statuses')
        }

        const filter = (v, k) => excluded.includes(k)

        return !isEqual(
            omit(fields.toJS(), filter),
            omit(fields.clear().toJS(), filter)
        )
    }

    change (changes, shouldReload) {
        return this.props
                   .actions
                   .changeFilter(changes, shouldReload)
    }

    changeField (name, value, shouldReload = false) {
        return this.props
                   .actions
                   .changeFilterField(
                       name, value, shouldReload
                   )
    }

    render () {
        const {
            fields: {
                email,
                statuses,
                lastName,
                firstName,
                systemRoleIds,
                excludeWithoutSystemRole
            },
            directory: {
                system, contact
            }
        } = this.props

        const systemRoles = [...system.role.list.dataSource.data, {
            id: NONE, title: 'None'
        }]

        return (
            <div className="ContactFilter">
                <Row>
                    <Col md={4}>
                        <TextField
                            type="text"
                            name="firstName"
                            value={firstName}
                            label="First name"
                            onBlur={this.onBlurField}
                            onFocus={this.onFocusField}
                            onChange={this.onChangeField}
                        />
                    </Col>
                    <Col md={4}>
                        <TextField
                            type="text"
                            name="lastName"
                            value={lastName}
                            label="Last name"
                            onBlur={this.onBlurField}
                            onFocus={this.onFocusField}
                            onChange={this.onChangeField}
                        />
                    </Col>
                    <Col md={4}>
                        <TextField
                            type="email"
                            name="email"
                            value={email}
                            label="Login"
                            onBlur={this.onBlurField}
                            onFocus={this.onFocusField}
                            onChange={this.onChangeField}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <SelectField
                            isMultiple
                            type="text"
                            name="systemRoleIds"
                            value={compact([...systemRoleIds, !excludeWithoutSystemRole && NONE])}
                            options={map(systemRoles, ({ id, title }) => ({
                                text: title, value: id
                            }))}
                            label="System role"
                            defaultText="Select System Role"
                            onChange={this.onChangeSystemRoleField}
                        />
                    </Col>
                    <Col md={4}>
                        <SelectField
                            isMultiple
                            type="text"
                            name="statuses"
                            options={map(contact.status.list.dataSource.data, ({ name, title }) => ({
                                value: name, text: title
                            }))}
                            value={statuses}
                            label="Status"
                            defaultText="Select Status"
                            onChange={this.onChangeField}
                        />
                    </Col>
                    <Col md={4}>
                        <Button
                            outline
                            color='success'
                            className="margin-right-16"
                            onClick={this.onClear}>
                            Clear
                        </Button>
                        <Button
                            color='success'
                            onClick={this.onApply}>
                            Apply
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactFilter)