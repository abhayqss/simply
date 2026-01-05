import React, { Component } from 'react'

import {
    map,
    omit,
    isEqual
} from 'underscore'

import moment from 'moment'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
    Row,
    Col,
    Button
} from 'reactstrap'

import Action from 'components/Action/Action'
import TextField from 'components/Form/TextField/TextField'
import DateField from 'components/Form/DateField/DateField'
import SelectField from 'components/Form/SelectField/SelectField'

import './ClientFilter.scss'

import * as clientListActions from 'redux/client/list/clientListActions'
import * as genderListActions from 'redux/directory/gender/list/genderListActions'
import * as clientStatusListActions from 'redux/directory/client/status/list/clientStatusListActions'

import { DateUtils as DU } from 'lib/utils/Utils'

const { format, formats } = DU
const DATE_FORMAT = formats.americanMediumDate

function mapStateToProps (state) {
    const {
        client,
        directory
    } = state

    const { filter } = client.list.dataSource

    return {
        fields: filter,
        data: filter.toJS(),

        directory
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(clientListActions, dispatch),
            genders: bindActionCreators(genderListActions, dispatch),
            statuses: bindActionCreators(clientStatusListActions, dispatch)
        }
    }
}

class ClientFilter extends Component {

    isFocused = false

    componentDidMount () {
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
            this.change({
                ssnLast4: null,
                genderId: null,
                lastName: null,
                firstName: null,
                birthDate: null,
                recordStatus: null
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

    onChangeDateField = (name, value) => {
        this.changeField(
            name, value ? format(value, DATE_FORMAT): null
        )
    }

    get actions () {
        return this.props.actions
    }

    isChanged () {
        const {
            data, fields
        } = this.props

        const excluded = [
            'communityIds',
            'organizationId'
        ]

        const filter = (v, k) => excluded.includes(k)

        return !isEqual(
            omit(data, filter),
            omit(fields.clear().toJS(), filter)
        )
    }

    isClear () {
        const {
            data, fields
        } = this.props

        return isEqual(
            data, fields.clear().toJS()
        )
    }

    change (...args) {
        return this.actions.changeFilter(...args)
    }

    changeField (name, value, shouldReload = false) {
        return this.actions.changeFilterField(
            name, value, shouldReload
        )
    }

    clear () {
        this.actions.clear(true)
    }

    render () {
        const {
            data: {
                ssnLast4,
                genderId,
                lastName,
                firstName,
                birthDate,
                recordStatus
            },
            directory: {
                gender, client
            }
        } = this.props

        return (
            <div className="ClientFilter">
                <Action action={this.actions.genders.load}/>
                <Action action={this.actions.statuses.load}/>
                <Row>
                    <Col md={3}>
                        <TextField
                            type="text"
                            name="firstName"
                            value={firstName}
                            label="First Name"
                            className="Clients-TextField"
                            hasError={false}
                            errorText={''}
                            onBlur={this.onBlurField}
                            onFocus={this.onFocusField}
                            onChange={this.onChangeField}
                        />
                    </Col>
                    <Col md={3}>
                        <TextField
                            type="text"
                            name="lastName"
                            value={lastName}
                            label="Last Name"
                            className="Clients-TextField"
                            hasError={false}
                            errorText={''}
                            onBlur={this.onBlurField}
                            onFocus={this.onFocusField}
                            onChange={this.onChangeField}
                        />
                    </Col>
                    <Col md={2}>
                        <SelectField
                            name="genderId"
                            value={genderId}
                            options={map(gender.list.dataSource.data, ({ id, label }) => ({
                                text: label, value: id
                            }))}
                            label="Gender"
                            defaultText="Gender"
                            placeholder={"Gender"}
                            className="Clients-SelectField"
                            isMultiple={false}
                            hasError={false}
                            errorText={''}
                            onChange={this.onChangeField}
                        />
                    </Col>
                    <Col md={2}>
                        <DateField
                            name="birthDate"
                            value={birthDate ? (
                                moment(birthDate, 'MM/DD/YYYY').toDate().getTime()
                            ) : null}
                            dateFormat="MM/dd/yyyy"
                            label="Date of Birth"
                            placeholder="Select date"
                            onChange={this.onChangeDateField}
                        />
                    </Col>
                    <Col md={2}>
                        <TextField
                            type="text"
                            name="ssnLast4"
                            value={ssnLast4}
                            label="SSN"
                            placeholder={'Last 4 digits'}
                            className="Clients-TextField"
                            hasError={false}
                            errorText={''}
                            onBlur={this.onBlurField}
                            onFocus={this.onFocusField}
                            onChange={this.onChangeField}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <SelectField
                            name="recordStatus"
                            options={map(client.status.list.dataSource.data, ({ name, title }) => ({
                                text: title, value: name
                            }))}
                            value={recordStatus}
                            label="Record Status"
                            placeholder={'Record status'}
                            className="Clients-SelectField"
                            isMultiple={false}
                            hasError={false}
                            errorText={''}
                            onChange={this.onChangeField}
                        />
                    </Col>
                    <Col md={4}>
                        <Button
                            outline
                            color='success'
                            className="margin-right-25"
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientFilter)