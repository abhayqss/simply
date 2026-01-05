import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import auth from './auth/authReducer'
import care from './care/careReducer'
import note from './note/noteReducer'
import error from './error/errorReducer'
import event from './event/eventReducer'
import login from './login/loginReducer'
import report from './report/reportReducer'
import notify from './notify/notifyReducer'
import client from './client/clientReducer'
import sidebar from './sidebar/sideBarReducer'
import contact from './contact/contactReducer'
import insurance from './insurance/insuranceReducer'
import community from './community/communityReducer'
import directory from './directory/directoryReducer'
import dashboard from './dashboard/dashboardReducer'
import marketplace from './marketplace/marketplaceReducer'
import organization from './organization/organizationReducer'


const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth,
    care,
    note,
    error,
    event,
    login,
    report,
    notify,
    client,
    sidebar,
    contact,
    insurance,
    community,
    dashboard,
    directory,
    marketplace,
    organization
})

export default rootReducer