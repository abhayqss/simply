import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'
import { any, map, findWhere } from 'underscore'

import './ActionButtonList.scss'

import { ReactComponent as TopChevron } from 'images/chevron-top.svg'
import { ReactComponent as BottomChevron } from 'images/chevron-bottom.svg'

const DEFAULT_OPTION_VALUE = null
const DEFAULT_OPTION_TEXT = 'Select'

class Option extends Component {

    static propTypes = {
        text: PropTypes.string,
        value: PropTypes.object,
        hasSeparator: PropTypes.bool,
        isSelected: PropTypes.bool,
        onClick : PropTypes.func
    }

    static defaultProps = {
        isSelected: false,
        hasSeparator: false,
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
            text,
            isSelected,
            hasSeparator,
        } = this.props

        return (
            <div className="Option" onClick={this.onClick}>
                <h6
                    className="Option-OptionText"
                    style={isSelected ? {color: '#f36c32'} : {color: '#4c4e51'}}>
                    {text}
                </h6>
                {hasSeparator && ( <span className="Option-Separator" /> ) }
            </div>
        )
    }
}

/*
 * <ActionButtonList
 *   options={[
 *       {text: 'Add a new event', value: 0, hasSeparator: true},
 *       {text: 'Add Assessment Results', value: 1},
 *       {text: 'Create Service Plan', value: 2, hasSeparator: true},
 *       {text: 'Request a new ride', value: 3},
 *       {text: 'Ride History', value: 4},
 *   ]}
 *   onChange={value => {}}
 * />
 * */

export default class ActionButtonList extends Component {

    state = {
        isExpanded: false,
        selectedOptions: [],
        areAllOptionsSelected: false
    }

    static propTypes = {
        options: PropTypes.array,
        isInvalid: PropTypes.bool,
        className: PropTypes.string,
        defaultText:PropTypes.string,
        onChange: PropTypes.func
    }

    static defaultProps = {
        options: [],
        isInvalid: false,
        defaultText:'Select',
        onChange: function () {}
    }

    onMouseEvent = (e) => {
        if (!this.listPopupRef.contains(e.target)) {
            this.setState({ isExpanded: false });
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.onMouseEvent);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onMouseEvent);
    }

    onToggle = e => {
        e.preventDefault()

        this.setState(s => ({
            isExpanded: !s.isExpanded
        }));
    }

    onSelectOption = (isSelected, value) => {
        const { options, onChange: cb } = this.props

        const option = findWhere(options, {value});

        this.setState({
            selectedOptions: [{...option, isSelected: true}],
        });

        cb(option)
    }

    render() {
        const {
            options,
            className,
            isInvalid,
            defaultText
        } = this.props;

        const {
            isExpanded,
            selectedOptions,
            areAllOptionsSelected
        } = this.state;

        const Chevron = isExpanded ? TopChevron : BottomChevron

        return (
            <div ref={listPopupRef => (this.listPopupRef = listPopupRef)}
                 className={
                     cn(
                         'ActionButtonList',
                         className,
                         isInvalid && 'is-invalid',
                         isExpanded ? 'ActionButtonList_expanded' : 'ActionButtonList_collapsed'
                     )
                 }>
                <button type='button' className="btn btn-default ActionButtonList-Toggle" onClick={this.onToggle}>
                    <span className='ActionButtonList-ToggleText' placeholder={defaultText}>
                        {selectedOptions.length ? (
                            areAllOptionsSelected ? 'All' : (
                                map(selectedOptions, o => o.text).join(', ')
                            )
                        ) : defaultText}
                    </span>
                   <Chevron className='ActionButtonList-ToggleChevron' />
                </button>
                <div className='ActionButtonList-Options'>
                    {map(options, ({text, value, hasSeparator}) => {
                        return (
                            <Option
                                key={value}
                                text={text}
                                value={value}
                                onClick={this.onSelectOption}
                                hasSeparator={hasSeparator}
                                isSelected={any(selectedOptions, o => o.value === value)}
                            />
                        );
                    })}
                </div>
            </div>
        )
    }
}
