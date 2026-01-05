import React, { Component } from 'react'

import { connect } from 'react-redux'

import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch, Redirect } from 'react-router-dom'

import Footer from 'components/Footer/Footer'

import './Admin.scss'

import SideBar from '../SideBar/SideBar'

import Contacts from './Contacts/Contacts'
import Organizations from './Organizations/Organizations'
import ClientsCaseload from './ClientsCaseload/ClientsCaseload'

import OrganizationDetails from './Organizations/OrganizationDetails/OrganizationDetails'
import CommunityDetails from './Organizations/Communities/CommunityDetails/CommunityDetails'

import CommunityHandsets from './Organizations/Communities/CommunityHandsets/CommunityHandsets'
import CommunityZones from './Organizations/Communities/CommunityZones/CommunityZones'
import CommunityLocations from './Organizations/Communities/CommunityLocations/CommunityLocations'
import CommunityDeviceTypes from './Organizations/Communities/CommunityDeviceTypes/CommunityDeviceTypes'

import { path } from 'lib/utils/ContextUtils'

class Admin extends Component {
    render () {
        return (
            <ConnectedRouter history={this.props.history}>
                <div className={'Admin'}>
                    <SideBar>
                        <Switch>
                            <Route
                                exact
                                path={path('/admin/contacts')}
                                component={Contacts}
                            />
                            <Route
                                exact
                                path={path('/admin/organizations')}
                                component={Organizations}
                            />
                            <Route
                                exact
                                path={path('/admin/clients-caseload')}
                                component={ClientsCaseload}
                            />
                            <Route
                                exact
                                path={path('/admin/organizations/:orgId')}
                                component={OrganizationDetails}
                            />
                            <Route
                                exact
                                path={path('/admin/organizations/:orgId/communities/:commId')}
                                component={CommunityDetails}
                            />
                            <Route
                                path={path('/admin/organizations/:orgId/communities/:commId/handsets')}
                                component={CommunityHandsets}
                            />
                            <Route
                                path={path('/admin/organizations/:orgId/communities/:commId/zones')}
                                component={CommunityZones}
                            />
                            <Route
                                path={path('/admin/organizations/:orgId/communities/:commId/locations')}
                                component={CommunityLocations}
                            />
                            <Route
                                path={path('/admin/organizations/:orgId/communities/:commId/device-types')}
                                component={CommunityDeviceTypes}
                            />
                            <Redirect from={path('/admin')} to={path('/admin/organizations')}/>
                        </Switch>
                        <Footer
                            theme='gray'
                            hasLogo={false}
                            className='Admin-Footer'
                        />
                    </SideBar>
                </div>
            </ConnectedRouter>
        )
    }
}

export default connect(null, null)(Admin)