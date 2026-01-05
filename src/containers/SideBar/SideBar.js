import React, { Component, Fragment } from 'react'

import cn from 'classnames'
import { map } from 'underscore'
import PropTypes from "prop-types";

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import { UncontrolledTooltip as Tooltip } from 'reactstrap'

import { camel } from 'lib/utils/Utils'
import { path } from 'lib/utils/ContextUtils'

import './SideBar.scss'

import { ReactComponent as Open } from 'images/sidebar-open.svg'
import { ReactComponent as Close } from 'images/sidebar-close.svg'

function Section ({ title, children, className }) {
    return (
        <div className={cn('SideBar-Section', className)}>
            <div className='SideBar-SectionTitle'>{title}</div>
            <div className='SideBar-SectionBody'>
                {children}
            </div>
        </div>
    )
}

function Nav ({ to, hintText, title, extraText, icon, isActive, hasIcon, renderIcon, hasTitle }) {
    const classes = cn('SideBar-Nav', { 'SideBar-Nav_active': isActive })
    const tooltipId = `tooltip_${camel(hintText)}`
    const canRenderIcon = hasIcon && renderIcon

    return (
        <div className={classes}>
            <Link id={tooltipId} to={path(to)}>
                {canRenderIcon && renderIcon('SideBar-NavIcon')}
                {hasTitle && (
                    <div className='SideBar-NavTitle'>
                        <span>{title}</span>
                        {extraText ? (
                            <>
                                <span className='SideBar-NavSeparator'>|</span>
                                <span className='SideBar-NavExtraText'>{extraText}</span>
                            </>
                        ) : null}
                    </div>
                )}
            </Link>
            {hasIcon && (
                <Tooltip
                    placement="right"
                    target={tooltipId}>
                    {hintText}
                </Tooltip>
            )}
        </div>
    )
}

function mapStateToProps (state) {
    return {
        ...state.sidebar.toJS()
    }
}

class SideBar extends Component {

    barRef = React.createRef()
    containerRef = React.createRef()

    scrollOffsetChangeTime = 0

    state = {
        top: null,
        toggleTop: 0,
        containerWidth: 0,
        isTransition: false,
        isOpen: this.props.isOpen,
        shouldUpdateBarPosition: false
    }

    static propTypes = {
        isOpen: PropTypes.bool,
        isHidden: PropTypes.bool,
        onToggle: PropTypes.func
    }

    static defaultProps = {
        isOpen: true,
        isHidden: false,
        onToggle: () => {}
    }

    componentDidMount () {
        this.updateContainerSize()
        this.setState({ shouldUpdateBarPosition: true })

        window.addEventListener('resize', this.onResize)
    }

    componentDidUpdate () {
        if (this.state.shouldUpdateBarPosition) {
            this.updateBarPosition()
        }
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.onResize);
    }

    updateBarPosition () {
        if (this.barNode) {
            const { top } = this.barNode.getBoundingClientRect()
            this.setState({
                top,
                shouldUpdateBarPosition: false,
                toggleTop: window.innerHeight / 2 - top
            })
        }
    }

    updateContainerSize () {
        this.setState({
            containerWidth: this.containerNode.clientWidth
        })
    }

    get barNode () {
        return this.barRef.current
    }

    get containerNode () {
        return this.containerRef.current
    }

    onResize = () => {
        this.updateBarPosition()
    }

    onToggle = e => {
        e.preventDefault()

        this.startTransition()

        this.setState(s => ({
            isOpen: !s.isOpen
        }))

        setTimeout(() => {
            this.finishTransition()
        }, 100)
    }

    startTransition () {
        this.setState({ isTransition: true })
    }

    finishTransition () {
        this.setState({ isTransition: false })
    }

    render () {
        const {
            top,
            isOpen,
            toggleTop,
            isTransition,
            containerWidth
        } = this.state

        const {
            items,
            isHidden,
            location: { pathname }
        } = this.props

        const barWidth = isOpen ? 210 : 85

        return (
            <div ref={this.containerRef} className='SideBar-Container'>
                {!isHidden && (
                    <div
                        ref={this.barRef}
                        style={top !== null ? { top, bottom: 0 } : {}}
                        className={cn('SideBar', isOpen && 'SideBar_opened')}>
                        {isOpen ? (
                            <>
                                {map(items, o => {
                                    return o.section ? (
                                        <Section
                                            key={camel(o.section.title)}
                                            title={!isTransition ? o.section.title : ''}>
                                            {map(o.section.items, nav => {
                                                return (
                                                    <Nav
                                                        key={camel(nav.title)}
                                                        to={nav.href}

                                                        hasIcon={!isOpen}
                                                        renderIcon={nav.renderIcon}

                                                        title={nav.title}
                                                        hintText={nav.hintText}
                                                        extraText={nav.extraText}
                                                        hasTitle={isOpen && !isTransition}

                                                        isActive={pathname.includes(path(nav.href))}
                                                    />
                                                )
                                            })}
                                        </Section>
                                    ) : (
                                        <Nav
                                            key={camel(o.title)}
                                            to={o.href}

                                            hasIcon={!isOpen}
                                            renderIcon={o.renderIcon}

                                            title={o.title}
                                            hintText={o.hintText}
                                            extraText={o.extraText}
                                            hasTitle={isOpen && !isTransition}

                                            isActive={pathname === path(o.href)}
                                        />
                                    )
                                })}
                            </>
                        ) : (
                            <>
                                {map(items, o => {
                                    return o.section ? (
                                        <Fragment key={camel(o.section.title)}>
                                            {map(o.section.items, nav => {
                                                return (
                                                    <Nav
                                                        key={camel(o.section.title + nav.title)}
                                                        to={nav.href}

                                                        hasIcon={!isOpen}
                                                        renderIcon={nav.renderIcon}

                                                        title={nav.title}
                                                        hintText={nav.hintText}
                                                        extraText={nav.extraText}
                                                        hasTitle={isOpen && !isTransition}

                                                        isActive={pathname.includes(path(nav.href))}
                                                    />
                                                )
                                            })}
                                        </Fragment>
                                    ) : (
                                        <Nav
                                            key={camel(o.title)}

                                            to={o.href}

                                            hasIcon={!isOpen}
                                            renderIcon={o.renderIcon}

                                            title={o.title}
                                            hintText={o.hintText}
                                            extraText={o.extraText}
                                            hasTitle={isOpen && !isTransition}

                                            isActive={pathname === path(o.href)}
                                        />
                                    )
                                })}
                            </>
                        )}
                        <div
                            onClick={this.onToggle}
                            className='SideBar-Toggle'
                            style={{ top: toggleTop }}>
                            {isOpen ? (
                                <Open className='SideBar-ToggleIcon'/>
                            ) : (
                                <Close className='SideBar-ToggleIcon'/>
                            )}
                        </div>
                    </div>
                )}
                <div
                    className='SideBar-Content'
                    style={!isHidden ? {
                        marginLeft: barWidth,
                        width: containerWidth - barWidth - 10
                    } : {}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, null)(SideBar))