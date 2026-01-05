import React, { Component } from 'react'

import cn from 'classnames'

import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import './Marketplace.scss'

import Footer from 'components/Footer/Footer'

import Communities from './Communities/Communities'
import CommunityDetails from './Communities/CommunityDetails/CommunityDetails'

import { path } from 'lib/utils/ContextUtils'

class Marketplace extends Component {

    render () {
        const { className, history } = this.props

        return (
            <ConnectedRouter history={history}>
                <div className={cn('Marketplace', className)}>
                    <Switch>
                        <Route
                            exact
                            path={path('/marketplace')}
                            component={Communities}
                        />
                        <Route
                            exact
                            path={path('/marketplace/communities/:communityName--:communityId')}
                            component={CommunityDetails}
                        />
                        <Route
                            exact
                            path={path('/marketplace/communities/:communityName--:communityId/partner-providers')}
                            component={Communities}
                        />
                        <Route
                            exact
                            path={path('/marketplace/communities/:communityName--:communityId/partner-providers/:partnerName--:partnerId')}
                            component={CommunityDetails}
                        />
                        <Redirect from={path('/')} to={path('/marketplace')}/>
                    </Switch>
                    <Footer
                        theme='gray'
                        hasLogo={false}
                        className='Marketplace-Footer'
                    />
                </div>
            </ConnectedRouter>
        )
    }
}

export default connect()(Marketplace)