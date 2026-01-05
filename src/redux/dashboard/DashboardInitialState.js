import Note from './note/DashboardNoteInitialState'
import Event from './event/DashboardEventInitialState'
import Caseload from './caseload/CaseloadInitialState'
import Appointment from './appointment/AppointmentInitialState'
import Assessment from './assessment/DashboardAssessmentInitialState'
import ServicePlan from './servicePlan/DashboardServicePlanInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    note:  new Note(),
    event: new Event(),
    caseload: new Caseload(),
    assessment : new Assessment(),
    servicePlan: new ServicePlan(),
    appointment: new Appointment(),
})

export default InitialState