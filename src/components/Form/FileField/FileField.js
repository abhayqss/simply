import React, { Component } from 'react'

import $ from 'jquery'
import cn from 'classnames'
import PropTypes from 'prop-types'
import {
    Label,
    Input,
    Button,
    FormGroup,
    UncontrolledTooltip as Tooltip
} from 'reactstrap'

import './FileField.scss'

const ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif'
]

function getRandom () {
    return Math.random() * 1000000000000
}

export default class FileField extends Component {

    static propTypes = {
        name: PropTypes.string,
        label: PropTypes.string,
        isDisabled: PropTypes.bool,
        allowedTypes: PropTypes.arrayOf(PropTypes.string),

        tooltip: PropTypes.object,

        className: PropTypes.string,
        placeholder: PropTypes.string,

        hasHint:PropTypes.bool,
        hintText: PropTypes.string,

        hasError: PropTypes.bool,
        errorText: PropTypes.string,

        onChange: PropTypes.func,
        renderLabelIcon: PropTypes.func
    }

    static defaultProps = {
        value: '',
        isDisabled: false,
        placeholder: 'File not chosen',
        allowedTypes: ALLOWED_MIME_TYPES,

        hasHint: false,
        hintText: '',

        hasError: false,
        errorText: '',

        onChange: function () {}
    }

    isBrowsingEnabled = false

    inputRef = React.createRef()

    state = {
        value: this.props.value || ''
    }

    componentDidUpdate (prevProps) {
        const {value} = this.props

        if (value !== prevProps.value) {
            this.setState({ value })
        }
    }

    onInputClick = (e) => {
        if (this.isBrowsingEnabled) {
            this.disableBrowsing()
        }

        else e.preventDefault()
    }

    onChange = () => {
        const {
            name,
            onChange: cb
        } = this.props

        const file = this.getInputNode().files[0]

        this.setState({ value: file.name })

        cb(name, file)
    }

    onBrowse = () => {
        this.browse()
    }

    onRemove = () => {
        this.remove()
    }

    browse () {
        this.enableBrowsing(true)
        $(this.getInputNode()).trigger('click')
    }

    remove () {
        const {onChange: cb, name} = this.props

        this.getInputNode().value = null
        this.setState({ value: null })

        cb(name, null)
    }

    enableBrowsing () {
        this.isBrowsingEnabled = true
    }

    disableBrowsing () {
        this.isBrowsingEnabled = false
    }

    getInputNode () {
        return this.inputRef.current || {}
    }

    render () {
        const {
            name,
            label,
            allowedTypes,
            isDisabled,

            className,
            placeholder,
            renderLabelIcon,

            tooltip,
            hasHint,
            hintText,

            hasError,
            errorText
        } = this.props

        const { value } = this.state

        return (
            <FormGroup className={cn('FileField', className)}>
                {label ? (
                    <>
                        <Label
                            className='FileField-Label'>
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
                <div className='d-flex flex-row'>
                    <Input
                        innerRef={this.inputRef}
                        key={!value && getRandom()}
                        accept={allowedTypes.toString()}

                        type='file'
                        name={name}
                        invalid={hasError}
                        disabled={isDisabled}
                        placeholder={placeholder}

                        className='FileField-Input'

                        onClick={this.onInputClick}
                        onChange={this.onChange}
                    />
                    <div className={cn('form-control FileField-SelectedFile flex-1', {'FileField-Placeholder': !value})}>
                        {value || placeholder}
                    </div>
                    {value ? (
                        <Button
                            disabled={isDisabled}
                            onClick={this.onRemove}
                            color={isDisabled ? 'secondary' : 'success'}
                            className="FileField-RemoveBtn">
                            Remove
                        </Button>
                    ) : (
                        <Button
                            disabled={isDisabled}
                            onClick={this.onBrowse}
                            className="FileField-BrowseBtn"
                            color={isDisabled ? 'secondary' : 'success'}>
                            Browse
                        </Button>
                    )}
                </div>
                {!hasError && hasHint && (
                    <div className={`FileField-Hint`}>
                        {hintText}
                    </div>
                )}
                {hasError && (
                    <div className={`FileField-Error`}>
                        {errorText}
                    </div>
                )}
            </FormGroup>
        )
    }
}