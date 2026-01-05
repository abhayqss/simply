import React, {Component, Fragment} from 'react'

import cn from 'classnames'
import {map} from 'underscore'
import {Label} from 'reactstrap'
import PropTypes from 'prop-types'
import {Radio, RadioGroup} from 'react-radio-group'

import './RadioGroupField.scss'

export default class RadioGroupField extends Component {

    static propTypes = {
        name: PropTypes.string,
        title: PropTypes.string,
        value: PropTypes.string,
        errorText: PropTypes.string,
        className: PropTypes.string,
        containerClass: PropTypes.string,

        options: PropTypes.array,

        hasError: PropTypes.bool,
        isDisabled: PropTypes.bool,

        selected: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

        onChange: PropTypes.func,
        renderTitleIcon: PropTypes.func
    }

    static defaultProps = {
        options: [],
        hasError: false,
        isDisabled: false,
        errorText: '',

        onChange: function () {},
        renderTitleIcon: function () {},
    }

    onChange = (option) => {
        const { name, onChange: cb } = this.props
        cb(name, option)
    }

    render () {
        const {
            name,
            title,
            options,
            selected,
            hasError,
            className,
            errorText,
            isDisabled,
            containerClass,
            renderTitleIcon
        } = this.props

        return (
            <div className={cn("RadioGroupField", containerClass)}>
                {title ? (
                    <>
                        <Label
                            className='RadioGroupField-Title'>
                            {title}
                        </Label>
                        {renderTitleIcon && renderTitleIcon()}
                    </>
                ) : null}
                <RadioGroup
                    name={name}
                    selectedValue={selected}
                    onChange={this.onChange}
                    className={cn("RadioGroupField-Body", className)}>
                    {map(options, (radio, index) => (
                        <Label className="Radio" key={index}>
                            <Radio disabled={radio.isDisabled || isDisabled} value={radio.value} />
                            <span className="Radio-Label">
                                {radio.label}
                            </span>
                            <span className={cn("Radio-CheckMark",
                                hasError && 'Radio-CheckMark-Error',
                                isDisabled && 'Radio-Disabled')} />
                        </Label>
                    ))}
                </RadioGroup>
                {hasError ? (
                    <div className="RadioGroupField-Error">
                        {errorText}
                    </div>
                ) : null}
            </div>
        )
    }
}