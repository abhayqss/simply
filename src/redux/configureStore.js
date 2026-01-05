import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { applyMiddleware, compose, createStore } from 'redux'

import rootReducer from './rootReducer'

import errorHandlerMiddleware from './middlewares/errorHadlerMiddlerware'

import Note from './note/NoteInitialState'
import Auth from './auth/AuthInitialState'
import Login from './login/LoginInitialState'
import Event from './event/EventInitialState'
import Client from './client/ClientInitialState'
import Report from './report/ReportInitialState'
import Notify from './notify/NotifyInitialState'
import SideBar from './sidebar/SideBarInitialState'
import Contact from './contact/ContactInitialState'
import Insurance from './insurance/InsuranceInitialState'
import Directory from './directory/DirectoryInitialState'
import Community from './community/CommunityInitialState'
import Marketplace from './marketplace/MarketplaceInitialState'
import Organization from './organization/OrganizationInitialState'
import Errors from './error/errorInitialState'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function getInitialState() {
    return {
        note: Note(),
        auth: Auth(),
        login: Login(),
        event: Event(),
        client: Client(),
        report: Report(),
        notify: Notify(),
        sidebar: SideBar(),
        contact: Contact(),
        insurance: Insurance(),
        directory: Directory(),
        community: Community(),
        marketplace: Marketplace(),
        organization: Organization(),
        error: Errors()
    }
}

export default function configureStore(history) {
    return createStore(
        rootReducer(history),
        getInitialState(),
        composeEnhancers(applyMiddleware(
            routerMiddleware(history),
            errorHandlerMiddleware,
            thunkMiddleware
        ))
    )
}