import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { isNumber } from 'underscore'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Image } from 'react-bootstrap'
import { Button, Col, Row } from 'reactstrap'

import Modal from 'components/Modal/Modal'
import Loader from 'components/Loader/Loader'
import Avatar from 'components/Avatar/Avatar'
import Detail from 'components/Detail/Detail'
import CheckboxField from 'components/Form/CheckboxField/CheckboxField'

import './ContactViewer.scss'

import * as contactAvatarActions from 'redux/contact/avatar/contactAvatarActions'
import * as contactDetailsActions from 'redux/contact/details/contactDetailsActions'

import {
    promise,
    isEmpty,
    getAddress
} from 'lib/utils/Utils'

import {
    CONTACT_STATUS_TYPES,
    PROFESSIONAL_SYSTEM_ROLES
} from 'lib/Constants'

import { ReactComponent as Caution } from 'images/caution.svg'

const {
    ACTIVE,
    PENDING,
    EXPIRED,
    INACTIVE
} = CONTACT_STATUS_TYPES

const STATUS_COLORS = {
    [ACTIVE]: '#d5f3b8',
    [PENDING]: '#ffffff',
    [EXPIRED]: '#fde1d5',
    [INACTIVE]: '#e0e0e0',
}

function mapStateToProps (state) {
    const { details } = state.contact

    return {
        data: details.data,
        error: details.error,
        isFetching: details.isFetching,
        shouldReload: details.shouldReload,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(contactDetailsActions, dispatch),
            avatar: bindActionCreators(contactAvatarActions, dispatch)
        }
    }
}

class ContactViewer extends Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        contactId: PropTypes.number,
        onClose: PropTypes.func,
    }

    static defaultProps = {
        onClose: function () {
        },
    }

    componentDidMount () {
        this.refresh()
            .then(({ success, data } = {}) => {
                success
                && isNumber(data.avatarId)
                && this.loadAvatar(
                    data.id, data.avatarId
                )
            })
    }

    componentDidUpdate (prevProps) {
        const { contactId } = this.props

        if (prevProps.contactId !== contactId) {
            this.refresh()
                .then(({ success, data } = {}) => {
                    success
                    && isNumber(data.avatarId)
                    && this.loadAvatar(
                        data.id, data.avatarId
                    )
                })
        }
    }

    onClose = () => {
        this.props.onClose()
    }

    isLoading () {
        const { isFetching, shouldReload } = this.props

        return isFetching || shouldReload
    }

    loadAvatar (contactId, avatarId) {
        this
            .props
            .actions
            .avatar
            .download({
                contactId,
                avatarId
            })
    }

    update (isReload) {
        const {
            actions,
            contactId
        } = this.props

        return isReload ?
            actions.load(contactId)
            : promise()
    }

    refresh () {
        return this.update(true)
    }

    clear () {
        this.props.actions.details.clear()
    }

    render () {
        const {
            data,
            isOpen,
        } = this.props

        let content = null

        if (this.isLoading()) {
            content = <Loader/>
        }

        else if (isEmpty(data)) {
            content = <h4>No Data</h4>
        }

        else {
            const {
                /*General Data*/
                login,
                displayName,
                communityName,
                status,
                avatarDataUrl,
                organizationName,
                systemRoleName,
                systemRoleTitle,

                /*Contact Info*/
                address,
                phone,
                mobilePhone,
                fax,
                secureMail,

                /*Settings*/
                enableContact,
            } = data

            content = (
                <div className="ContactDetails">
                    <Row>
                        <Col md={4} className="ContactDetails-Section">
                            <div className="ContactDetails-SectionTitle">
                                General Data
                            </div>
                            <Row>
                                <Col md={4}>
                                    {avatarDataUrl ? (
                                        <Image
                                            src={avatarDataUrl}
                                            className="ContactDetails-Avatar"
                                        />
                                    ) : (
                                        <Avatar
                                            size="70"
                                            name={displayName}
                                            className="ContactDetails-Avatar"
                                        />
                                    )}
                                </Col>
                                <Col md={8}>
                                    <Row>
                                        <span className="ContactDetails-ContactName">
                                            {displayName}
                                        </span>
                                    </Row>
                                    <Row>
                                        <span className="ContactDetails-SystemRole">
                                            {systemRoleTitle}
                                        </span>
                                    </Row>
                                    <Row>
                                        <span
                                            style={{
                                                marginTop: 5,
                                                backgroundColor: STATUS_COLORS[status.name] || null,
                                                ...status.name === PENDING && {
                                                    color: '#898989',
                                                    border: '1px solid #bfbdbd'
                                                }
                                            }}
                                            className="ContactDetails-Status">
                                            {status.title}
                                        </span>
                                    </Row>
                                </Col>
                            </Row>
                            <Detail
                                title="Login"
                                className="ContactDetail"
                                titleClassName="ContactDetail-Title"
                                valueClassName="ContactDetail-Value">
                                {login}
                            </Detail>
                            <Detail
                                title="Organization"
                                className="ContactDetail"
                                titleClassName="ContactDetail-Title"
                                valueClassName="ContactDetail-Value">
                                {organizationName}
                            </Detail>
                            <Detail
                                title="Community"
                                className="ContactDetail"
                                titleClassName="ContactDetail-Title"
                                valueClassName="ContactDetail-Value">
                                {communityName}
                            </Detail>
                            <Row>
                                <CheckboxField
                                    isDisabled
                                    label="Professionals"
                                    className="ContactDetails-CheckboxField"
                                    value={PROFESSIONAL_SYSTEM_ROLES.includes(systemRoleName)}
                                />
                            </Row>
                        </Col>
                        <Col md={4} className="ContactDetails-Section">
                            <div className="ContactDetails-SectionTitle">
                                Contact Info
                            </div>
                            <Detail
                                title="Address"
                                className="ContactDetail"
                                titleClassName="ContactDetail-Title"
                                valueClassName="ContactDetail-Value">
                                {address && getAddress({
                                    ...address, state: address.stateName}, ','
                                )}
                            </Detail>
                            <Detail
                                title="Mobile phone number"
                                className="ContactDetail"
                                titleClassName="ContactDetail-Title"
                                valueClassName="ContactDetail-Value">
                                {mobilePhone}
                            </Detail>
                            <Detail
                                title="Phone"
                                className="ContactDetail"
                                titleClassName="ContactDetail-Title"
                                valueClassName="ContactDetail-Value">
                                {phone}
                            </Detail>
                            <Detail
                                title="Fax"
                                className="ContactDetail"
                                titleClassName="ContactDetail-Title"
                                valueClassName="ContactDetail-Value">
                                {fax}
                            </Detail>
                            <Detail
                                title="Secure Email"
                                className="ContactDetail"
                                titleClassName="ContactDetail-Title"
                                valueClassName="ContactDetail-Value ContactDetail-SecureMailValue">
                                {secureMail}
                            </Detail>
                        </Col>
                        <Col md={4} className="ContactDetails-Section">
                            <div className="ContactDetails-SectionTitle">
                                Settings
                            </div>
                            {/* <Row>
                                    <CheckboxField
                                        value={enabledSearchCapability}
                                        label={'Enable "NwHIN" search capability'}
                                        className={'ContactDetails-CheckboxField'}
                                        isDisabled={true}
                                    />
                                </Row>
                                <Row>
                                    <CheckboxField
                                        value={enabledSecureMessaging}
                                        label={'Enable secure messaging'}
                                        className={'ContactDetails-CheckboxField'}
                                        isDisabled={true}
                                    />
                                </Row>*/}
                            <Row>
                                <CheckboxField
                                    isDisabled
                                    value={enableContact}
                                    label="Enable contact"
                                    className="ContactDetails-CheckboxField"
                                />
                            </Row>
                        </Col>
                    </Row>
                </div>
            )
        }
        return (
            <Modal
                isOpen={isOpen}
                hasCloseBtn={false}
                title="View Contact"
                className="ContactViewer"
                renderFooter={() => (
                    <Button outline color='success' onClick={this.onClose}>
                        Close
                    </Button>
                )}>
                {content}
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactViewer)
