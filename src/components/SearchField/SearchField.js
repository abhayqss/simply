import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import TextField from 'components/Form/TextField/TextField'

import './SearchField.scss'

import { ReactComponent as Cross } from 'images/cross.svg'
import { ReactComponent as Search } from 'images/search.svg'

export default class SearchField extends Component {

    static propTypes = {
        name: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.string,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        hasSearchIcon: PropTypes.bool,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        onClear: PropTypes.func,
        onChange: PropTypes.func,
        onKeyDown: PropTypes.func,
        onEnterKeyDown: PropTypes.func
    }

    static defaultProps = {
        value: '',
        label: '',
        name: 'search',
        hasSearchIcon: true,
        placeholder: 'Search'
    }

    textFieldRef = React.createRef()

    onClear = () => {
        const {
            name,
            onClear: cb
        } = this.props

        cb && cb(name)
    }

    getInputNode () {
        return this.textFieldRef.current.getInputNode()
    }

    render () {
        const {
            name,
            label,
            value,
            className,
            placeholder,
            hasSearchIcon,

            onBlur,
            onFocus,
            onChange,
            onKeyDown,
            onEnterKeyDown
        } = this.props

        return (
                <TextField
                    type="text"
                    name={name}
                    label={label}
                    value={value}
                    ref={this.textFieldRef}
                    placeholder={placeholder}
                    className={cn('SearchField', className)}

                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onEnterKeyDown={onEnterKeyDown}

                    renderIcon={() => (value ? (
                        <Cross
                            className="SearchField-CrossBtn"
                            onClick={this.onClear}
                        />
                    ) : (hasSearchIcon && (
                        <Search
                            className="SearchField-SearchBtn"
                        />
                    )))}
                />
        )
    }
}