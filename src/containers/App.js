import React, {Suspense, lazy} from 'react'

import {all} from 'underscore'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import {Redirect, Route, Switch} from 'react-router-dom'

import './App.scss'

import Loader from 'components/Loader/Loader'

import ErrorHandler from './ErrorHandler/ErrorHandler'
import NavigationBar from './NavigationBar/NavigationBar'
import Authentication from './Authentication/Authentication'

import Invitation from './Invitation/Invitation'
import NewPassword from './NewPassword/NewPassword'
import ResetPassword from './ResetPassword/ResetPassword'

import {path} from 'lib/utils/ContextUtils'

const Admin = lazy(() => import('./Admin/Admin'))
const Events = lazy(() => import('./Events/Events'))
const Clients = lazy(() => import('./Clients/Clients'))
const Reports = lazy(() => import('./Reports/Reports'))
const Alerts = lazy(() => import('./Notify/Alerts/Alerts'))
const Dashboard = lazy(() => import('./Dashboard/Dashboard'))
const Marketplace = lazy(() => import('./Marketplace/Marketplace'))

const NAVIGATION_EXCLUDED = [
    path('/login'),
    path('/invitation'),
    path('/reset-password'),
    path('/reset-password-request'),
]

const About = () => <h2>About</h2>
const Users = () => <h2>Users</h2>

const App = ({ location, history }) => (
    <ConnectedRouter history={history}>
        <div className={'App'}>
            {all(NAVIGATION_EXCLUDED, o => location.pathname !== o) && <NavigationBar />}
            <Suspense fallback={<Loader/>}>
                <Switch>
                    <Route exact path={path('/invitation')} component={Invitation} />
                    <Route exact path={path('/reset-password')} component={NewPassword} />
                    <Route exact path={path('/reset-password-request')} component={ResetPassword} />

                    <Route path={path('/about')} component={About} />
                    <Route path={path('/users')} component={Users} />
                    <Route path={path('/events')} component={Events} />
                    <Route path={path('/alerts')} component={Alerts} />
                    <Route path={path('/clients')} component={Clients} />
                    <Route path={path('/reports')} component={Reports} />
                    <Route path={path('/dashboard')} component={Dashboard} />
                    <Route path={path('/marketplace')} component={Marketplace} />
                    <Route path={path('/admin')} component={Admin} />

                    <Redirect from={path('/')} to={path('/marketplace')}/>
                </Switch>
            </Suspense>
            <Authentication
                shouldRedirectByFailure
                failureRedirectPath='/marketplace'
            />
            <ErrorHandler />
        </div>
    </ConnectedRouter>
)

App.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
}

export default withRouter(connect()(App))
