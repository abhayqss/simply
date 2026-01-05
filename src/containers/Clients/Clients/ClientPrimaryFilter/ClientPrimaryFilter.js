import React, { Component } from 'react'

import cn from 'classnames'

import {
    map,
    where,
    isNull
} from 'underscore'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Action from 'components/Action/Action'
import MultiSelect from 'components/MultiSelect/MultiSelect'

import './ClientPrimaryFilter.scss'

import * as clientListActions from 'redux/client/list/clientListActions'
import * as communityListActions from 'redux/client/community/list/communityListActions'
import * as organizationListActions from 'redux/directory/organization/list/organizationListActions'

import { Response } from 'lib/utils/AjaxUtils'

function mapStateToProps (state) {
    const {
        list,
        community
    } = state.client

    return {
        fields: list.dataSource.filter,

        list,
        community,
        auth: state.auth,

        directory: state.directory
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(clientListActions, dispatch),
            communities: bindActionCreators(communityListActions, dispatch),
            organizations: bindActionCreators(organizationListActions, dispatch)
        }
    }
}

class ClientPrimaryFilter extends Component {
    onChangeOrganizationField = value => {
        this.updateCommunities(value)
        this.changeField('organizationId', value, false)
    }

    onChangeCommunityField = (value) => {
        this.changeField('communityIds', value)
    }

    get authUser () {
        return this.props.auth.login.user.data
    }

    get actions () {
        return this.props.actions
    }

    updateCommunities (organizationId, shouldReload) {
        this.actions.communities
            .load({ organizationId })
            .then(Response(({ data }) => {
                this.changeField(
                    'communityIds',
                    map(where(data, {
                        canViewOrHasAccessibleClient: true
                    }), o => o.id),
                    shouldReload
                )
            }))
    }

    changeField (...args) {
        return this.actions.changeFilterField(...args)
    }

    render () {
        const {
            list,
            community,
            directory: {
                organization
            },
            fields: {
                communityIds,
                organizationId
            }
        } = this.props

        const user = this.authUser

        const organizations = organization.list.dataSource.data

        const communities = where(
            community.list.dataSource.data,
            { canViewOrHasAccessibleClient: true }
        )

        return (
            <div className="ClientPrimaryFilter">
                <Action action={this.actions.organizations.load}/>
                <Action
                    shouldPerform={() => user && isNull(organizationId)}
                    action={() => {
                        this.changeField('organizationId', user.organizationId)
                        this.updateCommunities(user.organizationId, false)
                    }}
                />
                <Action
                    isMultiple
                    params={{ organizationId }}
                    shouldPerform={prevParams => (
                        !list.isFetching && prevParams.organizationId !== organizationId
                    )}
                    action={() => {
                        this.updateCommunities(organizationId)
                    }}
                />
                <MultiSelect
                    hasTooltip
                    value={organizationId}
                    defaultText='Organization'
                    className='ClientPrimaryFilter-Field'
                    options={map(organizations, ({ id, label }) => ({
                        text: label, value: id
                    }))}
                    onChange={this.onChangeOrganizationField}
                />
                <MultiSelect
                    isMultiple
                    hasTooltip
                    value={communityIds}
                    defaultText='Community'
                    className={cn(
                        'ClientPrimaryFilter-Field',
                        { 'ClientPrimaryFilter-Field_frozen': communities.length === 1 }
                    )}
                    options={map(communities, ({ id, name }) => ({
                        text: name, value: id
                    }))}
                    onChange={this.onChangeCommunityField}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientPrimaryFilter)