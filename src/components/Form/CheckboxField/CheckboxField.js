import React, {Component} from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'
import {Label} from 'react-bootstrap'

import './CheckboxField.scss'

class CheckboxField extends Component {

    static propTypes = {
        name: PropTypes.string,
        label: PropTypes.string,
        errorText: PropTypes.string,
        value: PropTypes.bool,
        isRadio: PropTypes.bool,
        hasError: PropTypes.bool,
        isDisabled: PropTypes.bool,
        className: PropTypes.string,
        onChange: PropTypes.func,
        renderLabelIcon: PropTypes.func
    }

    static defaultProps = {
        value: false,
        isRadio: false,
        hasError: false,
        isDisabled: false,
        onChange: function () {
        },
        renderLabelIcon: function () {
        },
    }

    onClick = () => {
        const {
            name,
            value,
            onChange: cb
        } = this.props

        cb(name, !value);
    }

    render() {
        const {
            label,
            value,
            className,
            errorText,
            isRadio,
            hasError,
            isDisabled,
            renderLabelIcon
        } = this.props

        return (
            <div className={cn(
                'CheckboxField',
                isRadio && 'CheckboxField-Radio',
                isDisabled && 'CheckboxField-Disabled',
                className)}>
                <div
                    onClick={this.onClick}
                    className='CheckboxField-Checkbox'
                    style={hasError ? {borderColor: '#f33232'} : {}}>
                    {value && (<span className='CheckboxField-CheckMark'/>)}
                </div>
                {hasError && (
                    <div className='CheckboxField-Error'>
                        {errorText}
                    </div>
                )}
                {label && (
                    <>
                        <Label
                            onClick={this.onClick}
                            className='CheckboxField-Label'>
                            {label}
                        </Label>
                        {renderLabelIcon && renderLabelIcon()}
                    </>
                )}
            </div>
        )
    }
}

export default CheckboxField;