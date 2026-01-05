import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter } from 'connected-react-router'

import { CookiesProvider } from 'react-cookie'

import './index.scss'

import App from 'containers/App'

import configureStore from 'redux/configureStore'

import * as serviceWorker from './serviceWorker'

const history = createBrowserHistory()

const store = configureStore(history)

ReactDOM.render((
    <AppContainer>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <CookiesProvider>
                    <App history={history}/>
                </CookiesProvider>
            </ConnectedRouter>
        </Provider>
    </AppContainer>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();