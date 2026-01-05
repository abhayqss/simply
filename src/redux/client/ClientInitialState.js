import List from './list/ClientListInitialState'
import Form from './form/ClientFormInitialState'
import Count from './count/ClientCountInitialState'
import Caseload from './caseload/CaseloadInitialState'
import Details from './details/ClientDetailsInitialState'
import History from './history/ClientHistoryInitialState'
import Billing from './billing/ClientBillingInitialState'
import Emergency from './emergency/ClientEmergencyInitialState'

import Community from './community/CommunityInitialState'
import Document from './document/ClientDocumentInitialState'
import Assessment from './assessment/AssessmentInitialState'
import ServicePlan from './servicePlan/ServicePlanInitialState'

const { Record } = require('immutable')

export default Record({
    list: List(),
    form: Form(),
    count: Count(),
    details: Details(),
    history: History(),
    billing: Billing(),
    caseload: Caseload(),
    emergency: Emergency(),

    document: Document(),
    community: Community(),
    assessment: Assessment(),
    servicePlan: ServicePlan(),
})