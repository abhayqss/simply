import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'
import { Collapse } from 'reactstrap'
import { isBoolean } from 'underscore'

import './CollapsibleSection.scss'

import { ReactComponent as Plus } from 'images/plus.svg'
import { ReactComponent as Minus } from 'images/minus.svg'

export default class CollapsibleSection extends Component {

    static propTypes = {
        name: PropTypes.string,
        title: PropTypes.string,
        className: PropTypes.string,

        isOpen: PropTypes.bool,
        isOpenByDefault: PropTypes.bool,

        onToggle: PropTypes.func
    }

    static defaultProps = {
        name: '',
        title: '',
        isOpenByDefault: false
    }

    state = {
        isOpen: this.props.isOpenByDefault
    }

    onToggle = () => {
        const {
            name,
            isOpen,
            onToggle: cb,
        } = this.props

        if (cb) cb(name, isOpen)

        else this.setState(s => ({
            isOpen: !s.isOpen
        }))
    }

    render () {

        const {
            title,
            className
        } = this.props

        const isOpen = isBoolean(this.props.isOpen) ?
            this.props.isOpen : this.state.isOpen

        return (
            <div className={cn('CollapsibleSection', className)}>
                <div className='CollapsibleSection-Header' onClick={this.onToggle}>
                    <div className='CollapsibleSection-Title'>
                        {title}
                    </div>
                    {isOpen
                        ? <Minus className="CollapsibleSection-Icon CollapsibleSection-MinusIcon"/>
                        : <Plus className="CollapsibleSection-Icon"/>}
                </div>
                <Collapse isOpen={isOpen} className='CollapsibleSection-Body'>
                    {this.props.children}
                </Collapse>
            </div>
        )
    }
}