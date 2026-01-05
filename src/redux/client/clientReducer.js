import ClientInitialState from './ClientInitialState'

import listReducer from './list/clientListReducer'
import formReducer from './form/clientFormReducer'
import countReducer from './count/clientCountReducer'
import caseloadReducer from './caseload/caseloadReducer'
import detailsReducer from './details/clientDetailsReducer'
import historyReducer from './history/clientHistoryReducer'
import billingReducer from './billing/clientBillingReducer'
import emergencyReducer from './emergency/clientEmergencyReducer'

import communityReducer from './community/communityReducer'
import documentReducer from './document/clientDocumentReducer'
import assessmentReducer from './assessment/assessmentReducer'
import servicePlanReducer from './servicePlan/servicePlanReducer'

const initialState = new ClientInitialState()

export default function clientReducer(state = initialState, action) {
    let nextState = state

    const list = listReducer(state.list, action)
    if (list !== state.list) nextState = nextState.setIn(['list'], list)

    const form = formReducer(state.form, action)
    if (form !== state.form) nextState = nextState.setIn(['form'], form)

    const count = countReducer(state.count, action)
    if (count !== state.count) nextState = nextState.setIn(['count'], count)

    const details = detailsReducer(state.details, action)
    if (details !== state.details) nextState = nextState.setIn(['details'], details)

    const history = historyReducer(state.history, action)
    if (history !== state.history) nextState = nextState.setIn(['history'], history)

    const billing = billingReducer(state.billing, action)
    if (billing !== state.billing) nextState = nextState.setIn(['billing'], billing)
    
    const emergency = emergencyReducer(state.emergency, action)
    if (emergency !== state.emergency) nextState = nextState.setIn(['emergency'], emergency)

    const caseload = caseloadReducer(state.caseload, action)
    if (caseload !== state.caseload) nextState = nextState.setIn(['caseload'], caseload)

    const document = documentReducer(state.document, action)
    if (document !== state.document) nextState = nextState.setIn(['document'], document)

    const community = communityReducer(state.community, action)
    if (community !== state.community) nextState = nextState.setIn(['community'], community)

    const assessment = assessmentReducer(state.assessment, action)
    if (assessment !== state.assessment) nextState = nextState.setIn(['assessment'], assessment)

    const servicePlan = servicePlanReducer(state.servicePlan, action)
    if (servicePlan !== state.servicePlan) nextState = nextState.setIn(['servicePlan'], servicePlan)

    return nextState
}