import React, { Component } from 'react'

import cn from 'classnames'

import {
    map,
    reject,
    isNull,
    compact
} from 'underscore'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MultiSelect from 'components/MultiSelect/MultiSelect'

import './ContactPrimaryFilter.scss'

import * as contactListActions from 'redux/contact/list/contactListActions'
import * as communityListActions from 'redux/contact/community/list/communityListActions'
import * as organizationListActions from 'redux/directory/organization/list/organizationListActions'

import { isNotEmpty } from 'lib/utils/Utils'

import { Response } from 'lib/utils/AjaxUtils'

const NONE = 'NONE'

function mapStateToProps (state) {
    const {
        list,
        community
    } = state.contact

    return {
        fields: list.dataSource.filter,

        community,
        auth: state.auth,

        directory: state.directory
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(contactListActions, dispatch),

            community: { list: bindActionCreators(communityListActions, dispatch) },

            directory: {
                organization: { list: bindActionCreators(organizationListActions, dispatch) }
            }
        }
    }
}

class ContactPrimaryFilter extends Component {
    componentDidMount () {
        this.loadOrganizations()

        const {
            fields
        } = this.props

        const user = this.getAuthUser()

        if (user && isNull(fields.organizationId)) {
            const orgId = user.organizationId

            this.changeField('organizationId', orgId)
            this.updateCommunities(orgId, false)
        }
    }

    componentDidUpdate (prevProps) {
        const {
            fields
        } = this.props

        const user = this.getAuthUser()

        if (user
            && !prevProps.auth.login.user.data
            && isNull(fields.organizationId)) {
            const orgId = user.organizationId

            this.changeField('organizationId', orgId)
            this.updateCommunities(orgId, false)
        }
    }

    onChangeOrganizationField = value => {
        this.updateCommunities(value)
        this.changeField('organizationId', value, false)
    }

    onChangeCommunityField = (value) => {
        this.change({
            communityIds: reject(value, v => v === NONE),
            excludeWithoutCommunity: (
                isNotEmpty(value) && !value.includes(NONE)
            )
        })
    }

    getAuthUser () {
        return this.props.auth.login.user.data
    }

    loadOrganizations () {
        this.props
            .actions
            .directory
            .organization
            .list
            .load()
    }

    loadCommunities (organizationId) {
        return this.props
                   .actions
                   .community
                   .list
                   .load({ organizationId })
    }

    updateCommunities (organizationId, shouldReload) {
        this.loadCommunities(organizationId)
            .then(Response(({ data }) => {
                this.change({
                    excludeWithoutCommunity: null,
                    communityIds: map(data, o => o.id)
                }, shouldReload)
            }))
    }

    change (changes, shouldReload) {
        return this.props
                   .actions
                   .changeFilter(changes, shouldReload)
    }

    changeField (name, value, shouldReload) {
        return this.props
                   .actions
                   .changeFilterField(
                       name, value, shouldReload
                   )
    }

    render () {
        const {
            community,
            directory: {
                organization
            },
            fields: {
                communityIds,
                organizationId,
                excludeWithoutCommunity
            }
        } = this.props

        const organizations = organization.list.dataSource.data

        const communities = [...community.list.dataSource.data, {
            id: NONE, name: 'None'
        }]

        return (
            <div className="ContactPrimaryFilter">
                <MultiSelect
                    hasTooltip
                    value={organizationId}
                    defaultText='Organization'
                    className='ContactPrimaryFilter-Field'
                    options={map(organizations, ({ id, label }) => ({
                        text: label, value: id
                    }))}
                    onChange={this.onChangeOrganizationField}
                />
                <MultiSelect
                    isMultiple
                    hasTooltip
                    defaultText='Community'
                    value={compact([...communityIds, !excludeWithoutCommunity && NONE])}
                    options={map(communities, ({ id, name }) => ({
                        text: name, value: id
                    }))}
                    className={cn(
                        'ContactPrimaryFilter-Field',
                        { 'ContactPrimaryFilter-Field_frozen': communities.length === 1 }
                    )}
                    onChange={this.onChangeCommunityField}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPrimaryFilter)