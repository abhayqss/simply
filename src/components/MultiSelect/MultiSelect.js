import React, {Component} from 'react'

import {
    map,
    any,
    where,
    filter,
    reject,
    compact,
    isArray,
    flatten,
    contains,
    findWhere,
} from 'underscore'

import cn from 'classnames'
import PropTypes from 'prop-types'

import './MultiSelect.scss'

import { containsIgnoreCase } from 'lib/utils/Utils'

import {ReactComponent as TopChevron} from 'images/chevron-top.svg'
import {ReactComponent as BottomChevron} from 'images/chevron-bottom.svg'

const ALL = 'ALL'
const NONE = 'NONE'
const DEFAULT_OPTION_VALUE = null
const DEFAULT_OPTION_TEXT = 'Select'

const SECTION_INDICATOR_COLORS = [
    '#ffd3c0',
    '#fff1ca',
    '#d5f3b8',
    '#d1ebfe',
    '#e7ccfe'
]

class Option extends Component {

    static propTypes = {
        type: PropTypes.oneOf(['checkbox', 'tick', null]),

        text: PropTypes.string,
        numberOfLines: PropTypes.number,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

        style: PropTypes.object,
        className: PropTypes.string,

        isDisabled: PropTypes.bool,
        isSelected: PropTypes.bool,
        hasSeparator: PropTypes.bool,

        onClick : PropTypes.func
    }

    static defaultProps = {
        type: 'checkbox',
        isDisabled: false,
        isSelected: false,
        text: DEFAULT_OPTION_TEXT,
        value : DEFAULT_OPTION_VALUE,
        onClick: function () {}
    }

    onClick = () => {
        const {
            value,
            isSelected,
            onClick: cb
        } = this.props

        cb(isSelected, value);
    }

    render() {
        const {
            type,
            text,
            style,
            className,
            isSelected,
            isDisabled,
            hasSeparator,
            numberOfLines
        } = this.props

        return (
            <>
                <div
                    style={style}
                    onClick={this.onClick}
                    className={cn(
                        "MultiSelect-Option",
                        isSelected && 'MultiSelect-Option_selected',
                        isDisabled && 'MultiSelect-Option_disabled',
                        type === 'tick' ? 'MultiSelect-Option_tick' : 'MultiSelect-Option_checkbox', className)}>
                    {type === 'checkbox' && (
                        <div className="MultiSelect-Checkbox">
                            {isSelected && (
                                <span className="MultiSelect-CheckMark" />
                            )}
                        </div>
                    )}
                    <div className="MultiSelect-OptionText" title={text}>
                        {text}
                        {type === 'tick' && isSelected && (
                            <span className="MultiSelect-Tick" />
                        )}
                    </div>
                </div>
                {hasSeparator && ( <div className="MultiSelect-OptionSeparator" /> )}
            </>
        )
    }
}

/*
* <MultiSelect
*   options={[
*       {text: 'Apple', value: 0},
*       {text: 'Strawberry', value: 1},
*       {text: 'Banana', value: 2},
*   ]}
*   onChange={value => {}}
* />
* */

class MultiSelect extends Component {

    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
        options: PropTypes.array,
        sections: PropTypes.array,

        optionType: PropTypes.oneOf(['checkbox', 'tick']),

        isInvalid: PropTypes.bool,
        hasTooltip: PropTypes.bool,
        isMultiple: PropTypes.bool,
        isDisabled: PropTypes.bool,
        isAutoCollapsible: PropTypes.bool,

        isSectioned: PropTypes.bool,
        hasSectionTitle: PropTypes.bool,
        hasSectionSeparator: PropTypes.bool,
        hasSectionIndicator: PropTypes.bool,

        hasSearchBox: PropTypes.bool,
        hasAllOption: PropTypes.bool,
        hasNoneOption: PropTypes.bool,

        className: PropTypes.string,
        placeholder: PropTypes.string,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        renderSection: PropTypes.func,
    }

    static defaultProps = {
        value: [],
        options: [],
        sections: [],
        isInvalid: false,
        hasTooltip: false,
        isDisabled: false,
        isAutoCollapsible: true,

        isSectioned: false,
        hasSectionTitle: true,
        hasSectionSeparator: false,
        hasSectionIndicator: false,

        hasSearchBox: false,
        hasNoneOption: false,
        hasAllOption: true,
        placeholder:'Select',

        onBlur: function () {},
        onChange: function () {}
    }

    ref = React.createRef()

    constructor(props) {
        super(props)

        const {
            value,
            sections,
            isMultiple,
            isSectioned
        } = props

        const options = isSectioned ?
            flatten(map(sections, o => o.options))
            : props.options

        const selectedOptions = isMultiple ?
            filter(options, o => (contains(value, o.value)))
            : compact([findWhere(options, { value })])

        this.state = {
            searchText: '',
            isExpanded: false,
            selectedOptions
        };
    }

    onMouseEvent = (e) => {
        const node = this.ref.current

        if (node && !node.contains(e.target)) {
            this.setState({ isExpanded: false });
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.onMouseEvent);
    }

    componentDidUpdate(prevProps) {
        const {
            value,
            sections,
            isMultiple,
            isSectioned,
            hasSearchBox
        } = this.props

        const options = isSectioned ? flatten(
            map(sections, o => o.options)
        ) : this.props.options

        const prevOptions = isSectioned ? flatten(
            map(prevProps.sections, o => o.options)
        ) : prevProps.options

        if((prevOptions.length !== options.length) || (prevProps.value !== value)) {
            let searchText

            const selectedOptions = isMultiple ?
                filter(options, o => (contains(value, o.value)))
                : compact([findWhere(options, { value })])

            if (hasSearchBox) {
                // todo if value is an array?
                searchText = findWhere(options, { value })
            }

            this.setState({
                searchText: searchText ? searchText.text : '',
                selectedOptions
            })
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onMouseEvent);
    }

    onBlur = e => {
        e.preventDefault()

        this.props.onBlur(e)
    }

    onToggle = e => {
        e.preventDefault()

        this.setState(s => ({
            isExpanded: !s.isExpanded
        }));
    }

    onSearch = (e) => {
        const value = e.target.value

        this.setState(s => ({
            searchText: value,
            isExpanded: !!value
        }));
    }

    onRestorePrevOption = () => {
        const {value, options} = this.props

        const option = findWhere(options, { value })

        this.setState(s => ({
            selectedOptions: [option],
        }));
    }

    //todo. Maybe the code is excess. Method should be reviewed and refactored
    onSelectOption = (isSelected, value) => {
        let { selectedOptions } = this.state

        const {
            sections,
            isMultiple,
            isSectioned,
            hasSearchBox,
            hasAllOption,
            hasNoneOption,
            onChange: cb,
        } = this.props

        const options = isSectioned ? flatten(
            map(sections, o => o.options)
        ) : this.props.options

        if (isMultiple) {
            if (hasAllOption && value === ALL) {
                selectedOptions = isSelected ? [] : map(options, o => ({
                    ...o, isSelected: true
                }))

                this.setState({
                    selectedOptions,
                    isNoneOptionSelected: !selectedOptions.length,
                })

                cb(map(selectedOptions, o => o.value))
            }

            else if (hasNoneOption && value === NONE) {
                this.setState({
                    selectedOptions: [],
                    isNoneOptionSelected: !isSelected
                })
                cb([])
            }

            else {
                const option = findWhere(options, {value})

                if (isSelected) selectedOptions = reject(
                    selectedOptions, o => o.value === option.value
                )

                else selectedOptions = [
                    ...selectedOptions,
                    {...option, isSelected: true}
                ]

                this.setState({
                    selectedOptions,
                    isNoneOptionSelected: !selectedOptions.length,
                })

                cb(map(selectedOptions, o => o.value))
            }

        }

        else if (hasNoneOption && value === NONE) {
            this.setState({
                selectedOptions: [],
                isNoneOptionSelected: !isSelected
            })

            cb(null)
        }

        else {
            const option = findWhere(options, {value});

            if (hasSearchBox) {
                this.setState({
                    searchText: option.text
                })
            }

            this.setState({
                isExpanded: isSelected && this.props.isAutoCollapsible,
                selectedOptions: isSelected ? [] : [{...option, isSelected: true}],
            })

            if (isSelected) cb()
            else cb(option.value, this.onRestorePrevOption)
        }
    }

    render() {
        const {
            value,
            sections,
            className,
            isInvalid,
            hasTooltip,
            isDisabled,
            isMultiple,

            optionType,

            isSectioned,
            renderSection,
            hasSectionTitle,
            hasSectionSeparator,
            hasSectionIndicator,
            hasSearchBox,
            hasAllOption,
            hasNoneOption,
            placeholder,

            onChange,
        } = this.props

        const {
            searchText,
            isExpanded,
            selectedOptions,
            isNoneOptionSelected,
        } = this.state

        const Chevron = isExpanded ? TopChevron : BottomChevron

        const options = isSectioned ?
            flatten(map(sections, o => o.options))
            : this.props.options

        const noOptionsSelected = options.length > 1
            && selectedOptions.length === 0

        const areAllOptionsSelected = options.length > 1
            && selectedOptions.length === options.length

        const filteredOptions = hasSearchBox ? filter(
            options, o => containsIgnoreCase(o.text, searchText)
        ) : options

        return (
            <div
                ref={this.ref}
                className={
                     cn(
                         'MultiSelect',
                         className,
                         isInvalid && 'is-invalid',
                         isDisabled && 'MultiSelect_disabled',
                         isExpanded ? 'MultiSelect_expanded' : 'MultiSelect_collapsed'
                     )
                 }>
                {hasSearchBox ? (
                    <input
                        className='MultiSelect-SearchBox'
                        type="text"
                        value={searchText}
                        disabled={isDisabled}
                        placeholder={placeholder}
                        onChange={this.onSearch}
                        onClick={this.onToggle}
                    />
                    ) : (
                    <button
                        id={`MultiSelect-Toggle-${this.id}`}
                        className="MultiSelect-Toggle"
                        disabled={isDisabled}
                        title={hasTooltip ? (map(
                            filter(filteredOptions, o => any(selectedOptions, so => so.value === o.value)),
                            o => o.text
                        ) || []).join(', ') : ''}
                        onBlur={this.onBlur}
                        onClick={this.onToggle}>
                        <span
                            placeholder={placeholder}
                            className={cn(
                                'MultiSelect-ToggleText',
                                !selectedOptions.length && 'MultiSelect-ToggleTex_placeholder'
                            )}>
                                {selectedOptions.length ? (
                                    (hasAllOption && options.length > 1 && areAllOptionsSelected) ? 'All' : (
                                        (map(selectedOptions, o => o.text)).join(', ')
                                    )
                                ) : (
                                    hasNoneOption && options.length > 1 && isNoneOptionSelected ? 'None' : placeholder
                                )}
                        </span>
                        <div className='line-height-1'>
                            <Chevron className='MultiSelect-ToggleChevron'/>
                        </div>
                    </button>
                )}
                <div className='MultiSelect-Options'>
                    {isMultiple && hasAllOption && options.length > 1 && (
                        <Option
                            text='All'
                            value='ALL'
                            type={optionType}
                            onClick={this.onSelectOption}
                            className='MultiSelect-AllOption'
                            isSelected={areAllOptionsSelected}
                            style={hasSectionIndicator ? {
                                borderLeft: '8px solid white'
                            } : null}
                        />
                    )}
                    {isSectioned
                        ? map(sections, ({ id, name, title, options }, i) => {
                            return renderSection ? renderSection(id, name, title, options, value, onChange) : (
                                <div
                                    key={id}
                                    className="MultiSelect-Section"
                                    style={hasSectionIndicator ? {
                                        borderLeftWith: 8,
                                        borderLeftStyle: 'solid',
                                        borderLeftColor: SECTION_INDICATOR_COLORS[id % 5]
                                    } : null}>
                                    {hasSectionTitle && (
                                        <div className="MultiSelect-SectionTitle">
                                            {title}
                                        </div>
                                    )}
                                    {map(
                                        hasSearchBox ? filter(
                                            options, o => containsIgnoreCase(o.text, searchText)
                                        ) : options,
                                        ({ text, value, isSelected, isDisabled, numberOfLines }, j) => (
                                            <Option
                                                key={String(value)}
                                                type={optionType}
                                                text={text}
                                                value={value}
                                                numberOfLines={numberOfLines}
                                                onClick={this.onSelectOption}
                                                hasSeparator={hasSectionSeparator && i < (sections.length - 1) && j === (options.length - 1)}
                                                isSelected={isSelected || any(selectedOptions, o => o.value === value)}
                                                isDisabled={isDisabled}
                                            />
                                        ))}
                                </div>
                            )
                        })
                        : map(filteredOptions, ({text, value, isSelected, isDisabled, hasSeparator, numberOfLines}) => {
                            return (
                                <Option
                                    key={value}
                                    text={text}
                                    value={value}
                                    type={optionType}
                                    hasSeparator={hasSeparator}
                                    numberOfLines={numberOfLines}
                                    onClick={this.onSelectOption}
                                    isSelected={isSelected || any(selectedOptions, o => o.value === value)}
                                    isDisabled={isDisabled}
                                />
                            );
                        })
                    }
                    {isMultiple && hasNoneOption && options.length > 1 && (
                        <Option
                            text='None'
                            value='NONE'
                            type={optionType}
                            className='MultiSelect-NoneOption'
                            onClick={this.onSelectOption}
                            isSelected={isNoneOptionSelected}
                            style={hasSectionIndicator ? {
                                borderLeft: '8px solid white'
                            } : null}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default MultiSelect;
