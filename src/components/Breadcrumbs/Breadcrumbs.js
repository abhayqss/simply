import React, { Component, Fragment } from 'react'

import cn from 'classnames'
import _ from 'underscore'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { camel } from 'lib/utils/Utils'
import { path } from 'lib/utils/ContextUtils'

import './Breadcrumbs.scss'

import {ReactComponent as Separator} from 'images/lever-right.svg'

export default class Breadcrumbs extends Component {

    static propTypes = {
        items: PropTypes.array,
        className: PropTypes.string
    }

    static defaultProps = {
        items: []
    }

    render () {
        const { items, className } = this.props

        return (
            <div className={cn('Breadcrumbs', className)}>
                {
                    _.map(items, (o, i) => {
                        return (
                            <Fragment key={camel(o.title)}>
                                <div
                                    className={cn(
                                        'Breadcrumbs-Item',
                                        { 'Breadcrumbs-Item_root': i === 0 && !o.isEnabled },
                                        { 'Breadcrumbs-Item_active': o.isActive }
                                    )}>
                                    <Link
                                        to={path(o.href)}
                                        onClick={o.onClick}
                                        className='Breadcrumbs-ItemTitle'>
                                        {o.title}
                                    </Link>
                                </div>
                                {i < (items.length - 1) ? (
                                    <Separator className='Breadcrumbs-Separator'/>
                                ) : null}
                            </Fragment>
                        )
                    })
                }
            </div>
        )
    }
}