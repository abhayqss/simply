import React, {Component} from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import {FormGroup, Label} from 'reactstrap'

import './DateField.scss'
import 'react-datepicker/dist/react-datepicker.css'

import { DateUtils as DU } from 'lib/utils/Utils'

import {ReactComponent as Calendar} from 'images/calendar.svg'

function getStartOfDay () {
    return new Date(
        new Date().setHours(0)
    ).setMinutes(0)
}

function getEndOfDay () {
    return new Date(
        new Date().setHours(23)
    ).setMinutes(59)
}

export default class DateField extends Component {

    static propTypes = {
        name: PropTypes.string,
        label: PropTypes.string,
        errorText: PropTypes.string,
        className: PropTypes.string,
        dateFormat: PropTypes.string,
        timeFormat: PropTypes.string,
        autoComplete: PropTypes.string,

        timeCaption: PropTypes.string,
        placeholder: PropTypes.string,

        value: PropTypes.number,
        display: PropTypes.string,
        minTime: PropTypes.number,
        maxTime: PropTypes.number,
        minDate: PropTypes.number,
        maxDate: PropTypes.number,
        timeIntervals: PropTypes.number,

        hasError: PropTypes.bool,
        isDisabled: PropTypes.bool,
        hasTimeSelect: PropTypes.bool,
        hasTimeSelectOnly: PropTypes.bool,

        onChange: PropTypes.func
    }

    static defaultProps = {
        display: null,
        hasError: false,
        isDisabled: false,
        hasTimeSelect: false,
        hasTimeSelectOnly: false,
        autoComplete: 'off',

        minTime: getStartOfDay(),
        maxTime: getEndOfDay(),

        errorText: '',
        timeCaption: 'Time',
        dateFormat: 'MM/dd/yyyy',
        timeFormat: 'HH:mm',

        timeIntervals: 30,

        onBlur: function () {},
        onChange: function () {}
    }

    pickerRef = React.createRef()

    onBlur = (value) => {
        const { name, onBlur: cb } = this.props
        cb(name, value)
    }

    onChange = (value) => {
        const {
            name,
            onChange: cb
        } = this.props

        cb(name, value)
    }

    onOpenPicker = () => {
        this.pickerRef.current.onInputClick()
    }

    render () {
        const {
            name,
            label,
            value,
            display,
            minTime,
            maxTime,
            minDate,
            maxDate,
            dateFormat,
            timeFormat,
            className,
            placeholder,
            timeCaption,
            timeIntervals,
            isDisabled,
            hasError,
            errorText,
            autoComplete,
            hasTimeSelect,
            hasTimeSelectOnly,
        } = this.props

        return (
            <FormGroup className={cn('DateField', className)}>
                {label ? (
                    <>
                        <Label
                            className='DateField-Label'>
                            {label}
                        </Label>
                    </>
                ) : null}
                <DatePicker
                    ref={this.pickerRef}

                    name={name}
                    value={display}
                    selected={value}

                    dateFormat={dateFormat}
                    timeFormat={timeFormat}

                    dropdownMode='select'

                    invalid={hasError}
                    disabled={isDisabled}
                    placeholderText={placeholder}
                    timeCaption={timeCaption}

                    timeIntervals={timeIntervals}
                    showTimeSelect={hasTimeSelect}
                    showTimeSelectOnly={hasTimeSelectOnly}
                    autoComplete={autoComplete}

                    minTime={new Date(minTime)}
                    maxTime={new Date(maxTime)}
                    minDate={new Date(minDate)}
                    maxDate={new Date(maxDate)}

                    className={cn('DateField-Input form-control', hasError && "is-invalid")}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                />
                <Calendar
                    onClick={this.onOpenPicker}
                    className='DateField-CalendarIcon'
                />
                {hasError ? (
                    <div className='DateField-Error'>
                        {errorText}
                    </div>
                ) : null}
            </FormGroup>
        )
    }
}