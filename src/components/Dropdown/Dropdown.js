import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import { map } from 'underscore'

import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Dropdown as BootstrapDropdown
} from 'reactstrap'

import './Dropdown.scss'

import { ReactComponent as TopChevron } from 'images/chevron-top.svg'
import { ReactComponent as BottomChevron } from 'images/chevron-bottom.svg'

class Item extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        className: PropTypes.string
    }

    static defaultProps = {
        onClick: () => {}
    }

    onClick = () => {
        this.props.onClick(
            this.props.value
        )
    }

    render () {
        const {
            children,
            className
        } = this.props

        return (
            <DropdownItem
                className={className}
                onClick={this.onClick}>
                {children}
            </DropdownItem>
        );
    }
}

/*
* @items = [{ value, text, onClick }]
* */
export default class Dropdown extends Component {
    static propTypes = {
        items: PropTypes.array,
        onToggle: PropTypes.func,
        toggleText: PropTypes.string,
        isOpenByDefault: PropTypes.bool,
        className: PropTypes.string
    }

    static defaultProps = {
        toggleText: "Select",
        onToggle: () => {},
        isOpenByDefault: false
    }

    state = {
        isOpen: this.props.isOpenByDefault
    }

    onToggle = () => {
        this.toggle()
    }

    toggle () {
        this.setState(s => (
            { isOpen: !s.isOpen }
        ))
    }

    render () {
        const {
            items,
            className,
            toggleText
        } = this.props

        const {
            isOpen
        } = this.state

        const Chevron = isOpen ? TopChevron : BottomChevron

        return (
            <BootstrapDropdown
                isOpen={isOpen}
                toggle={this.onToggle}
                className={cn('Dropdown', className)}>
                <DropdownToggle outline color="success">
                    <span>{toggleText} </span>
                    <Chevron className='Dropdown-ToggleChevron'/>
                </DropdownToggle>
                <DropdownMenu>
                    {map(items, ({ value, text, onClick }) => (
                        <Item
                            key={value}
                            value={value}
                            onClick={onClick}>
                            {text}
                        </Item>
                    ))}
                </DropdownMenu>
            </BootstrapDropdown>
        )
    }
}