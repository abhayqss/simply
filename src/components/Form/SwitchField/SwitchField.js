import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import Switch from 'react-switch'
import { FormGroup, Label } from 'reactstrap'

import './SwitchField.scss'

export default class SwitchField extends Component {

    static propTypes = {
        name: PropTypes.string,
        label: PropTypes.string,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        hasHint:PropTypes.bool,
        hasError: PropTypes.bool,
        isChecked: PropTypes.bool,
        isDisabled: PropTypes.bool,
        errorText: PropTypes.string,
        renderIcon: PropTypes.func,
        renderLabelIcon: PropTypes.func,
        onChange: PropTypes.func
    }

    static defaultProps = {
        type: 'text',
        value: '',
        hasHint:false,
        hasError: false,
        isChecked: false,
        isDisabled: false,
        errorText: '',
        onChange: function () {}
    }

    onChange = (checked) => {
        const { name, onChange: cb } = this.props
        cb && cb(name, checked)
    }

    render () {
        const {
            name,
            label,
            className,
            renderIcon,
            renderLabelIcon,
            isChecked,
            isDisabled,
            hasHint,
            hasError,
            errorText
        } = this.props

        return (
            <FormGroup className={cn('SwitchField', className)}>
                {label ? (
                    <>
                        <Label
                            className='SwitchField-Label'>
                            {label}
                        </Label>
                        {renderLabelIcon && renderLabelIcon()}
                    </>
                ) : null}
                <Switch
                    name={name}
                    onColor='#448993'
                    offColor='#dddddd'
                    handleDiameter={18}
                    onChange={this.onChange}
                    disabled={isDisabled}
                    checked={isChecked}
                    checkedIcon={(
                        <div className='yes'>YES</div>
                    )}
                    uncheckedIcon={(
                        <div className='no'>NO</div>
                    )}
                />
                {hasError ? (
                    <div className={`SwitchField-${hasHint? 'Hint': 'Error' }`}>
                        {errorText}
                    </div>
                ) : null}
                {renderIcon && renderIcon()}
            </FormGroup>
        )
    }
}