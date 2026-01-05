import InitialState from './DirectoryInitialState'

import ageReducer from './age/ageReducer'
import noteReducer from './note/noteReducer'
import careReducer from './care/careReducer'
import eventReducer from './event/eventReducer'
import stateReducer from './state/stateReducer'
import genderReducer from './gender/genderReducer'
import reportReducer from './report/reportReducer'
import systemReducer from './system/systemReducer'
import clientReducer from './client/clientReducer'
import contactReducer from './contact/ContactReducer'
import maritalReducer from './marital/maritalReducer'
import serviceReducer from './service/serviceReducer'
import languageReducer from './language/languageReducer'
import emergencyReducer from './emergency/emergencyReducer'
import treatmentReducer from './treatment/treatmentReducer'
import insuranceReducer from './insurance/insuranceReducer'
import communityReducer from './community/communityReducer'
import additionalReducer from './additional/additionalReducer'
import assessmentReducer from './assessment/assessmentReducer'
import marketplaceReducer from './marketplace/marketplaceReducer'
import servicePlanReducer from './servicePlan/servicePlanReducer'
import organizationReducer from './organization/organizationReducer'
import primaryFocusReducer from './primaryFocus/primaryFocusReducer'

const initialState = new InitialState()

export default function dictionaryReducer(state = initialState, action) {
    let nextState = state

    const age = ageReducer(state.age, action)
    if (age !== state.age) nextState = nextState.setIn(['age'], age)

    const note = noteReducer(state.note, action)
    if (note !== state.note) nextState = nextState.setIn(['note'], note)

    const care = careReducer(state.care, action)
    if (care !== state.care) nextState = nextState.setIn(['care'], care)

    const event = eventReducer(state.event, action)
    if (event !== state.event) nextState = nextState.setIn(['event'], event)

    const gender = genderReducer(state.gender, action)
    if (gender !== state.gender) nextState = nextState.setIn(['gender'], gender)
    
    const report = reportReducer(state.report, action)
    if (report !== state.report) nextState = nextState.setIn(['report'], report)

    const system = systemReducer(state.system, action)
    if (system !== state.system) nextState = nextState.setIn(['system'], system)

    const usaState = stateReducer(state.state, action)
    if (usaState !== state.state) nextState = nextState.setIn(['state'], usaState)
    
    const client = clientReducer(state.client, action)
    if (client !== client.client) nextState = nextState.setIn(['client'], client)

    const contact = contactReducer(state.contact, action)
    if (contact !== contact.contact) nextState = nextState.setIn(['contact'], contact)

    const marital = maritalReducer(state.marital, action)
    if (marital !== state.marital) nextState = nextState.setIn(['marital'], marital)

    const service = serviceReducer(state.service, action)
    if (service !== state.service) nextState = nextState.setIn(['service'], service)

    const language = languageReducer(state.language, action)
    if (language !== state.language) nextState = nextState.setIn(['language'], language)

    const additional = additionalReducer(state.additional, action)
    if (additional !== state.additional) nextState = nextState.setIn(['additional'], additional)
    
    const assessment = assessmentReducer(state.assessment, action)
    if (assessment !== state.assessment) nextState = nextState.setIn(['assessment'], assessment)
    
    const marketplace = marketplaceReducer(state.marketplace, action)
    if (marketplace !== state.marketplace) nextState = nextState.setIn(['marketplace'], marketplace)
    
    const servicePlan = servicePlanReducer(state.servicePlan, action)
    if (servicePlan !== state.servicePlan) nextState = nextState.setIn(['servicePlan'], servicePlan)

    const emergency = emergencyReducer(state.emergency, action)
    if (emergency !== state.emergency) nextState = nextState.setIn(['emergency'], emergency)

    const treatment = treatmentReducer(state.treatment, action)
    if (treatment !== state.treatment) nextState = nextState.setIn(['treatment'], treatment)

    const insurance = insuranceReducer(state.insurance, action)
    if (insurance !== state.insurance) nextState = nextState.setIn(['insurance'], insurance)

    const community = communityReducer(state.community, action)
    if (community !== state.community) nextState = nextState.setIn(['community'], community)

    const organization = organizationReducer(state.organization, action)
    if (organization !== state.organization) nextState = nextState.setIn(['organization'], organization)

    const primaryFocus = primaryFocusReducer(state.primaryFocus, action)
    if (primaryFocus !== state.primaryFocus) nextState = nextState.setIn(['primaryFocus'], primaryFocus)

    return nextState
}
