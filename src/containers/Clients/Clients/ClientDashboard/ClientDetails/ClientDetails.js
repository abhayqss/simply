import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
    map,
    any,
    omit,
    each,
    reject,
    isNumber
} from 'underscore'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { withRouter } from 'react-router-dom'

import {
    ListGroup as List,
    ListGroupItem as ListItem
} from 'reactstrap'

import Tabs from 'components/Tabs/Tabs'
import Avatar from 'components/Avatar/Avatar'
import Action from 'components/Action/Action'
import Loader from 'components/Loader/Loader'
import Detail from 'components/Detail/Detail'

import './ClientDetails.scss'

import LoadClientAvatarAction from 'actions/clients/LoadClientAvatarAction'

import * as clientBillingDetailsActions from 'redux/client/billing/details/clientBillingDetailsActions'
import * as clientEmergencyContactListActions from 'redux/client/emergency/contact/list/clientEmergencyContactListActions'
import * as clientEmergencyContactAvatarActions from 'redux/client/emergency/contact/avatar/clientEmergencyContactAvatarActions'

import {
    isEmpty,
    isNotEmpty,
    getAddress,
    allAreEmpty,
    DateUtils as DU
} from 'lib/utils/Utils'

import { Response } from 'lib/utils/AjaxUtils'

import { PAGINATION } from 'lib/Constants'

const { format, formats } = DU

const MEDIUM_DATE_FORMAT = formats.americanMediumDate
const LONG_DATE_FORMAT = formats.longDateMediumTime12

const { MAX_SIZE } = PAGINATION

function mapStateToProps (state) {
    const {
        details,
        billing,
        emergency
    } = state.client

    return {
        data: details.data,
        error: details.error,
        isFetching: details.isFetching,
        shouldReload: details.shouldReload,

        billing,
        emergency
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            billing: {
                details: bindActionCreators(clientBillingDetailsActions, dispatch)
            },
            emergency: {
                contact: {
                    list: bindActionCreators(clientEmergencyContactListActions, dispatch),
                    avatar: bindActionCreators(clientEmergencyContactAvatarActions, dispatch)
                }
            }
        }
    }
}

class ClientDetails extends Component {

    static propTypes = {
        clientId: PropTypes.string,
    }

    state = {
        tab: 0,
        isOpen: false,
        isSharingDataParticipant: false
    }

    onChangeTab = (tab) => {
        this.changeTab(tab)
    }

    onChangeSharingDataParticipation = (name, isChecked) => {
        this.setState({ isSharingDataParticipant: isChecked })
    }

    get clientId () {
        return +this.props.match.params.clientId
    }

    get actions () {
        return this.props.actions
    }

    changeTab (tab) {
        this.setState({ tab })
    }

    render () {
        const {
            tab,
            isOpen,
            isSharingDataParticipant
        } = this.state

        const {
            isFetching,
            data: {
                email,
                phone,
                gender,
                address,
                avatarId,
                fullName,
                community,
                cellPhone,
                birthDate,
                riskScore,
                admitDates,
                organization,
                avatarDataUrl,
                martialStatus,
                deathDateTime,
                dischargeDates,
                ssnLastFourDigits,
            },
            billing,
            emergency
        } = this.props

        const clientId = this.clientId

        const billDetails = billing.details
        const billData = billDetails.data || {}

        const emgContacts = emergency.contact.list

        const isNoBillInfo = allAreEmpty(
            billData.medicareNumber,
            billData.medicaidNumber
        ) && !(isNotEmpty(billData.items) && any(
            billData.items, o => isNotEmpty(
                omit(o, v => isEmpty(v))
            )
        ))

        return (
            <div className="ClientDetails">
                <LoadClientAvatarAction
                    params={{ avatarId, clientId }}
                    shouldPerform={() => isNumber(avatarId)}
                />
                <Action
                    shouldPerform={() => tab === 1}
                    action={() => {
                        this.actions.emergency.contact.list
                            .load({ clientId, size: MAX_SIZE })
                            .then(Response(({ data }) => {
                                each(data, ({ id: contactId, avatarId }) => {
                                    if (avatarId) {
                                        this.actions.emergency.contact.avatar
                                            .download({ contactId, avatarId })
                                    }
                                })
                            }))
                    }}
                />
                <Action
                    shouldPerform={() => tab === 2}
                    action={() => {
                        this.actions.billing.details
                            .load(clientId)
                    }}
                />
                {isFetching ? (
                    <Loader/>
                ) : (
                    <>
                        <div className='d-flex margin-bottom-40'>
                            <div className="margin-right-15">
                                {avatarDataUrl ? (
                                    <img
                                        alt="Avatar"
                                        src={avatarDataUrl}
                                        className="ClientDetails-Avatar"
                                    />
                                ) : (
                                    <Avatar size="75" name={fullName}/>
                                )}
                            </div>
                            <div className='d-inline-block'>
                                <div className='ClientDetails-FullName'>
                                    {` ${fullName}`}
                                </div>
                                <div className='ClientDetails-SSN'>
                                    {ssnLastFourDigits && `###-##-${ssnLastFourDigits}`}
                                </div>
                                <div className='ClientDetails-Status'>
                                    Active
                                </div>
                            </div>
                        </div>
                        <Tabs
                            className='margin-bottom-25'
                            items={[
                                { title: 'Demographics', isActive: tab === 0 },
                                { title: 'Emergency contacts', isActive: tab === 1 },
                                { title: 'Billing info', isActive: tab === 2 }
                            ]}
                            onChange={this.onChangeTab}
                        />
                        {tab === 0 ? (
                            <>
                                <Detail
                                    className="ClientDetail"
                                    titleClassName="ClientDetail-Title"
                                    valueClassName="ClientDetail-Value"
                                    title="GENDER">
                                    {gender}
                                </Detail>
                                <Detail
                                    className="ClientDetail"
                                    titleClassName="ClientDetail-Title"
                                    valueClassName="ClientDetail-Value"
                                    title="DATE OF BIRTH">
                                    {format(birthDate, MEDIUM_DATE_FORMAT)}
                                </Detail>
                                <Detail
                                    className="ClientDetail"
                                    titleClassName="ClientDetail-Title"
                                    valueClassName="ClientDetail-Value"
                                    title="MARTIAL STATUS">
                                    {martialStatus}
                                </Detail>
                                <Detail
                                    className="ClientDetail"
                                    titleClassName="ClientDetail-Title"
                                    valueClassName="ClientDetail-Value"
                                    title="CELL PHONE">
                                    {cellPhone}
                                </Detail>
                                <Detail
                                    className="ClientDetail"
                                    titleClassName="ClientDetail-Title"
                                    valueClassName="ClientDetail-Value"
                                    title="HOME PHONE">
                                    {phone}
                                </Detail>
                                <Detail
                                    className="ClientDetail"
                                    titleClassName="ClientDetail-Title"
                                    valueClassName="ClientDetail-Value"
                                    title="EMAIL">
                                    {email}
                                </Detail>
                                <Detail
                                    className="ClientDetail"
                                    titleClassName="ClientDetail-Title"
                                    valueClassName="ClientDetail-Value"
                                    title="ORGANIZATION">
                                    {organization}
                                </Detail>
                                <Detail
                                    className="ClientDetail"
                                    titleClassName="ClientDetail-Title"
                                    valueClassName="ClientDetail-Value"
                                    title="COMMUNITY">
                                    {community}
                                </Detail>
                                <Detail
                                    className="ClientDetail"
                                    titleClassName="ClientDetail-Title"
                                    valueClassName="ClientDetail-Value"
                                    title="ADDRESS">
                                    {address && getAddress({
                                            ...address, state: address.stateName
                                        }, ','
                                    )}
                                </Detail>
                                <Detail
                                    className="ClientDetail"
                                    titleClassName="ClientDetail-Title"
                                    valueClassName="ClientDetail-Value"
                                    title="RISK SCORE">
                                    {riskScore}
                                </Detail>
                                <Detail
                                    className="ClientDetail"
                                    titleClassName="ClientDetail-Title"
                                    valueClassName="ClientDetail-Value"
                                    title="ADMIT DATE AND TIME">
                                    {map(admitDates, d => format(d, LONG_DATE_FORMAT)).join(', ')}
                                </Detail>
                                <Detail
                                    className="ClientDetail"
                                    titleClassName="ClientDetail-Title"
                                    valueClassName="ClientDetail-Value"
                                    title="DISCHARGE DATE AND TIME">
                                    {map(dischargeDates, d => format(d, LONG_DATE_FORMAT)).join(', ')}
                                </Detail>
                                <Detail
                                    className="ClientDetail"
                                    titleClassName="ClientDetail-Title"
                                    valueClassName="ClientDetail-Value"
                                    title="DEATH DATE AND TIME">
                                    {deathDateTime && format(deathDateTime, LONG_DATE_FORMAT)}
                                </Detail>
                                {/*<Detail
                                    className="ClientDetail"
                                    titleClassName="ClientDetail-Title"
                                    valueClassName="ClientDetail-Value"
                                    title="CLIENT PARTICIPATES IN SHARING DATA">
                                    <SwitchField
                                        name='isDataShareEnabled'
                                        isChecked={isSharingDataParticipant}
                                        isDisabled={true}
                                        onChange={this.onChangeSharingDataParticipation}
                                    />
                                </Detail>*/}
                            </>
                        ) : null}
                        {tab === 1 ? (
                            <>
                                {emgContacts.isFetching ? (
                                    <Loader/>
                                ) : (
                                    isNotEmpty(emgContacts.dataSource.data) ? (
                                        <List className="ClientEmergencyContactList">
                                            {map(emgContacts.dataSource.data, o => (
                                                <ListItem
                                                    className="ClientEmergencyContactList-Item ClientEmergencyContact">
                                                    <div className="margin-right-15">
                                                        {o.avatarDataUrl ? (
                                                            <img
                                                                alt="Avatar"
                                                                src={o.avatarDataUrl}
                                                                className="EmergencyContact-Avatar"
                                                            />
                                                        ) : (
                                                            <Avatar size="60" name={o.fullName}/>
                                                        )}
                                                    </div>
                                                    <div className='ClientEmergencyContact-Demographics'>
                                                        <div
                                                            className='ClientEmergencyContact-FullName'>{o.fullName}</div>
                                                        <div
                                                            className='ClientEmergencyContact-Relationship'>{o.relationship}</div>
                                                        <div className='ClientEmergencyContact-Phone'>{o.phone}</div>
                                                        <div className='ClientEmergencyContact-Email'>{o.email}</div>
                                                    </div>
                                                </ListItem>
                                            ))}
                                        </List>
                                    ) : (
                                        <div className="text-center">No emergency contacts</div>
                                    )
                                )}
                            </>
                        ) : null}
                        {tab === 2 ? (
                            <>
                                {billDetails.isFetching ? (
                                    <Loader/>
                                ) : (
                                    <>
                                        <Detail
                                            className="ClientBillingDetail"
                                            titleClassName="ClientBillingDetail-Title"
                                            valueClassName="ClientBillingDetail-Value"
                                            title="MEDICARE #">
                                            {billData.medicareNumber}
                                        </Detail>
                                        <Detail
                                            className="ClientBillingDetail"
                                            titleClassName="ClientBillingDetail-Title"
                                            valueClassName="ClientBillingDetail-Value"
                                            title="MEDICAID #">
                                            {billData.medicaidNumber}
                                        </Detail>
                                        <List className="ClientBilling">
                                            {map(reject(billData.items, o => isEmpty(omit(o, v => !v))), o => (
                                                <ListItem
                                                    key={`${o.groupNumber}.${o.policyNumber}`}
                                                    className="ClientBilling-Item ClientEmergencyContact">
                                                    <Detail
                                                        className="ClientBillingItemDetail"
                                                        titleClassName="ClientBillingItemDetail-Title"
                                                        valueClassName="ClientBillingItemDetail-Value"
                                                        title="INSURANCE">
                                                        {o.insurance}
                                                    </Detail>
                                                    <Detail
                                                        className="ClientBillingItemDetail"
                                                        titleClassName="ClientBillingItemDetail-Title"
                                                        valueClassName="ClientBillingItemDetail-Value"
                                                        title="PLAN">
                                                        {o.plan}
                                                    </Detail>
                                                    <Detail
                                                        className="ClientBillingItemDetail"
                                                        titleClassName="ClientBillingItemDetail-Title"
                                                        valueClassName="ClientBillingItemDetail-Value"
                                                        title="GROUP #">
                                                        {o.groupNumber}
                                                    </Detail>
                                                    <Detail
                                                        className="ClientBillingItemDetail"
                                                        titleClassName="ClientBillingItemDetail-Title"
                                                        valueClassName="ClientBillingItemDetail-Value"
                                                        title="POLICY #">
                                                        {o.policyNumber}
                                                    </Detail>
                                                </ListItem>
                                            ))}
                                        </List>
                                        {isNoBillInfo && (
                                            <div className="text-center">No billing info</div>
                                        )}
                                    </>
                                )}
                            </>
                        ) : null}
                    </>
                )}
            </div>
        )
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ClientDetails)
)
