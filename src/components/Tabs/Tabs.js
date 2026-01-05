import React, { Component } from 'react'

import _ from 'underscore'
import cn from 'classnames'
import PropTypes from 'prop-types'

import { Nav, NavItem, NavLink } from 'reactstrap'

import './Tabs.scss'

import {ReactComponent as Bookmark} from "images/bookmark.svg";

class Tab extends Component {

    static propTypes = {
        index: PropTypes.number,

        title: PropTypes.string,

        className: PropTypes.string,
        indicatorClassName: PropTypes.string,
        indicatorIconClassName: PropTypes.string,

        isActive: PropTypes.bool,
        hasError: PropTypes.bool,
        hasIndicator: PropTypes.bool,

        onClick: PropTypes.func,

        render: PropTypes.func,
        renderLink: PropTypes.func,
        renderIndicator: PropTypes.func
    }

    static defaultProps = {
        isActive: false,
        hasError: false,
    }

    onClick = () => {
        const {
            index,
            onClick: cb
        } = this.props

        cb(index)
    }

    render () {
        const {
            title,

            isActive,
            hasError,
            hasIndicator,

            className,
            indicatorClassName,
            indicatorIconClassName,

            render,
            renderLink,
            renderIndicator,
        } = this.props

        return render ? render ({ title, isActive, hasError, className, renderLink }) : (
            <NavItem className="Tabs-Tab">
                {renderLink ? renderLink (title, isActive, className) : (
                    <NavLink
                        onClick={this.onClick}
                        className={cn('Tabs-TabLink', hasError && 'Tabs-TabError', className, {active: isActive})}>
                        {title}
                    </NavLink>
                )}
                {hasIndicator ? (
                    renderIndicator ? renderIndicator(indicatorClassName) : (
                        <div className={cn('Tabs-TabIndicator', indicatorClassName)}>
                            <Bookmark className={cn('Tabs-TabIndicatorIcon', indicatorIconClassName)}/>
                        </div>
                    )
                ) : null}
            </NavItem>
        )
    }
}

export default class Tabs extends Component {

    static propTypes = {
        items: PropTypes.array,
        className: PropTypes.string,
        onChange: PropTypes.func
    }

    static defaultProps = {
        items: [],
        onChange: function () {}
    }

    onChange = (index) => {
        this.props.onChange(index)
    }

    render () {
        const {
            items,
            className
        } = this.props

        return (
            <Nav tabs className={cn('Tabs', className)}>
                {_.map(items, ({title, isActive, className, render, renderLink, hasError, hasIndicator, renderIndicator, indicatorClassName, indicatorIconClassName}, i) => {
                    return (
                        <Tab
                            index={i}
                            title={title}

                            className={className}
                            indicatorClassName={indicatorClassName}
                            indicatorIconClassName={indicatorIconClassName}

                            hasError={hasError}
                            isActive={isActive}
                            hasIndicator={hasIndicator}

                            onClick={this.onChange}

                            render={render}
                            renderLink={renderLink}
                            renderIndicator={renderIndicator}

                            key={title.split(' ').join('')}
                        />
                    )
                })}
            </Nav>
        )
    }
}