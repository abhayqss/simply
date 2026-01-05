import React, {Component} from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'
import {FormGroup, Label} from 'reactstrap'

import MultiSelect from '../../MultiSelect/MultiSelect';

import './SelectField.scss'

export default class SelectField extends Component {

    static propTypes = {
        name: PropTypes.string,
        label: PropTypes.string,
        options: PropTypes.array,
        sections: PropTypes.array,
        isMultiple: PropTypes.bool,
        isDisabled: PropTypes.bool,
        hasTooltip: PropTypes.bool,
        isSectioned: PropTypes.bool,
        hasSearchBox: PropTypes.bool,
        hasSectionTitle: PropTypes.bool,
        optionType: PropTypes.oneOf(['checkbox', 'tick']),
        hasSectionSeparator: PropTypes.bool,
        hasSectionIndicator: PropTypes.bool,
        hasAllOption: PropTypes.bool,
        hasNoneOption: PropTypes.bool,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        hasError: PropTypes.bool,
        errorText: PropTypes.string,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        renderIcon: PropTypes.func,
        renderSection: PropTypes.func,
        renderLabelIcon: PropTypes.func
    }

    static defaultProps = {
        hasError: false,
        errorText: '',
        onBlur: () => {}
    }

    onBlur = (e) => {
        const value = e.target.value
        const { name, onBlur: cb } = this.props

        cb(name, value)
    }

    onChange = (option, onRestorePrevOption) => {
        const { name, onChange: cb } = this.props
        cb(name, option, onRestorePrevOption)
    }

    render () {
        const {
            label,
            value,
            options,
            sections,
            className,
            optionType,
            isMultiple,
            isDisabled,
            hasTooltip,
            isSectioned,
            renderSection,
            hasSectionTitle,
            hasSectionSeparator,
            hasSectionIndicator,
            renderIcon,
            placeholder,
            hasSearchBox,
            hasAllOption,
            hasNoneOption,
            renderLabelIcon,
            hasError,
            errorText
        } = this.props

        return (
            <FormGroup className={cn('SelectField', className)}>
                {label ? (
                    <>
                        <Label
                            className='SelectField-Label'>
                            {label}
                        </Label>
                        {renderLabelIcon && renderLabelIcon()}
                    </>
                    ) : null}
                <MultiSelect
                    value={value}
                    options={options}
                    sections={sections}
                    optionType={optionType}
                    isInvalid={hasError}
                    isMultiple={isMultiple}
                    isDisabled={isDisabled}
                    hasTooltip={hasTooltip}
                    isSectioned={isSectioned}
                    hasSectionTitle={hasSectionTitle}
                    hasSectionSeparator={hasSectionSeparator}
                    hasSectionIndicator={hasSectionIndicator}
                    hasSearchBox={hasSearchBox}
                    hasAllOption={hasAllOption}
                    hasNoneOption={hasNoneOption}
                    placeholder={placeholder}
                    className='SelectField-MultiSelect form-control'
                    renderSection={renderSection}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                />
                {hasError ? (
                    <div className='SelectField-Error'>
                        {errorText}
                    </div>
                ) : null}
                {renderIcon && renderIcon()}
            </FormGroup>
        )
    }
}