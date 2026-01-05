import React, { Component } from 'react'

import { connect } from 'react-redux'

import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import './Clients.scss'

import Footer from 'components/Footer/Footer'

import SideBar from '../SideBar/SideBar'

import Events from '../Events/Events'
import ClientList from './Clients/Clients'
import CareTeam from './Clients/CareTeam/CareTeam'
import Documents from './Clients/Documents/Documents'
import Assessments from './Clients/Assessments/Assessments'
import ServicePlans from './Clients/ServicePlans/ServicePlans'
import ClientDashboard from './Clients/ClientDashboard/ClientDashboard'

import { path } from 'lib/utils/ContextUtils'

class Clients extends Component {
    render () {
        return (
            <ConnectedRouter history={this.props.history}>
                <div className="Clients">
                    <SideBar>
                        <Switch>
                            <Route
                                exact
                                path={path('/clients')}
                                component={ClientList}
                            />
                            <Route
                                exact
                                path={path('/clients/:clientId')}
                                component={ClientDashboard}
                            />
                            <Route
                                exact
                                path={path('/clients/:clientId/events')}
                                component={Events}
                            />
                            <Route
                                exact
                                path={path('/clients/:clientId/documents')}
                                component={Documents}
                            />
                            <Route
                                exact
                                path={path('/clients/:clientId/care-team')}
                                component={CareTeam}
                            />
                            <Route
                                exact
                                path={path('/clients/:clientId/service-plans')}
                                component={ServicePlans}
                            />
                            <Route
                                exact
                                path={path('/clients/:clientId/assessments')}
                                component={Assessments}
                            />
                        </Switch>
                        <Footer
                            theme='gray'
                            hasLogo={false}
                        />
                    </SideBar>
                </div>
            </ConnectedRouter>
        )
    }
}

export default connect(null, null)(Clients)