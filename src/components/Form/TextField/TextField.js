import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import {
    Label,
    Input,
    FormGroup,
    UncontrolledTooltip as Tooltip
} from 'reactstrap'

import './TextField.scss'

export default class TextField extends Component {

    static propTypes = {
        type: PropTypes.oneOf(['text','textarea', 'email', 'password', 'date']),
        name: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.string,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        autoComplete: PropTypes.string,
        maxLength: PropTypes.number,

        tooltip: PropTypes.object,

        tabIndex: PropTypes.number,
        maxDigits: PropTypes.number,

        hasHint:PropTypes.bool,
        hasError: PropTypes.bool,
        isDisabled: PropTypes.bool,

        errorText: PropTypes.string,
        renderIcon: PropTypes.func,
        renderLabelIcon: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        onChange: PropTypes.func,
        onKeyDown: PropTypes.func,
        onEnterKeyDown: PropTypes.func
    }

    static defaultProps = {
        type: 'text',
        value: '',
        tabIndex: 1,
        hasHint: false,
        hasError: false,
        isDisabled: false,
        errorText: '',
        autoComplete: 'off',

        onBlur: function () {},
        onFocus: function () {},
        onChange: function () {},
        onKeyDown: function () {},
        onEnterKeyDown: function () {}
    }

    inputRef = React.createRef()

    onBlur = (e) => {
        const value = e.target.value
        const { name, onBlur: cb } = this.props

        cb && cb(name, value)
    }

    onFocus = (e) => {
        const value = e.target.value
        const { name, onFocus: cb } = this.props

        cb && cb(name, value)
    }

    onChange = (e) => {
        const value = e.target.value
        const { name, onChange: cb } = this.props

        cb && cb(name, value)
    }

    onKeyDown = (e) => {
        const value = e.target.value

        const {
            name,
            onKeyDown,
            onEnterKeyDown
        } = this.props

        onKeyDown(name, value)

        if (e.key.toLowerCase() === 'enter') {
            onEnterKeyDown(name, value)
        }
    }

    getInputNode () {
        return this.inputRef.current
    }

    getValue () {
        const {
            value: v
        } = this.props

        return v !== null ? v : ''
    }

    render () {
        const {
            type,
            name,
            label,
            tooltip,
            className,
            maxDigits,
            placeholder,
            renderIcon,
            renderLabelIcon,
            isDisabled,
            hasHint,
            hasError,
            errorText,
            autoComplete,
            maxLength,
            tabIndex
        } = this.props

        const value = this.getValue()

        return (
            <FormGroup className={cn('TextField', className)}>
                {label ? (
                    <>
                        <Label
                            className={cn('TextField-Label', isDisabled ? 'TextField-Disabled' : null)}>
                            {label}
                        </Label>
                        {renderLabelIcon && renderLabelIcon()}
                        {tooltip && (
                            <Tooltip {...tooltip}>
                                {tooltip.text || tooltip.render()}
                            </Tooltip>
                        )}
                    </>
                ) : null}
                <Input
                    type={type}

                    name={name}
                    value={value}

                    innerRef={this.inputRef}

                    max={maxDigits}
                    invalid={hasError}
                    tabIndex={tabIndex}
                    disabled={isDisabled}
                    maxLength={maxLength}

                    placeholder={placeholder}
                    autoComplete={autoComplete}

                    className='TextField-Input'

                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                />
                {hasError ? (
                    <div className={`TextField-${hasHint? 'Hint': 'Error' }`}>
                        {errorText}
                    </div>
                ) : null}
                {renderIcon && renderIcon(value)}
            </FormGroup>
        )
    }
}