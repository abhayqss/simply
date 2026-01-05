import React, {Component} from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import {Button} from 'reactstrap'

import './User.scss'

export default class User extends Component {

    detailPopupRef = null

    state = {
        isOpen: false
    }

    static propTypes = {
        name: PropTypes.string,
        role: PropTypes.string,
        avatarSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        avatarSize: PropTypes.number,
        className: PropTypes.string,

        onPick: PropTypes.func,
        onSignOut: PropTypes.func
    }

    static defaultProps = {
        avatarSize: 50,
        onPick: function () {},
        onSignOut: function () {}
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.onMouseEvent);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onMouseEvent);
    }

    onMouseEvent = (e) => {
        if (!this.detailPopupRef.contains(e.target)) {
            this.setState({ isOpen: false });
        }
    }

    onSignOut = () => {
        this.props.onSignOut()
        this.setState(s => ({isOpen: !s.isOpen}))
    }

    onPick = () => {
        this.props.onPick()
        this.setState(s => ({isOpen: !s.isOpen}))
    }

    render () {
        const {
            name,
            role,
            className,
            avatarSrc,
            avatarSize
        } = this.props

        const { isOpen } = this.state

        return (
            <div ref={detailPopupRef => (this.detailPopupRef = detailPopupRef)}
                 className={cn('User', {'is-expanded': isOpen}, className)}>
                {isOpen && (
                    <div className="User-Profile">
                        <div className='d-flex justify-content-center align-items-center'>
                            <img
                                src={avatarSrc}
                                className="User-ProfileAvatar"
                                onClick={this.onClick}
                            />
                        </div>
                        <div className="User-Details">
                            <div className="User-Name">{name}</div>
                            <div className="User-Role">{role}</div>
                            <Button
                                color='success'
                                onClick={this.onSignOut}
                                className="User-LogOutBtn">
                                Sign Out
                            </Button>
                        </div>
                    </div>
                )}
                <img
                    src={avatarSrc}
                    className="User-Avatar"
                    style={{
                        width: avatarSize,
                        height: avatarSize,
                        borderRadius: avatarSize / 2 + 1
                    }}
                    onClick={this.onPick}
                />
            </div>
        )
    }
}