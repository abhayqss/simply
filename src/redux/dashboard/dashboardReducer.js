import InitialState from './DashboardInitialState'

import noteReducer from './note/dashboardNoteReducer'
import eventReducer from './event/dashboardEventReducer'
import caseloadReducer from './caseload/caseloadReducer'
import appointmentReducer from './appointment/appointmentReducer'
import assessmentReducer from './assessment/dashboardAssessmentReducer'
import servicePlanReducer from './servicePlan/dashboardServicePlanReducer'

const initialState = new InitialState()

export default function dashboardReducer(state = initialState, action) {
    let nextState = state

    const note = noteReducer(state.note, action)
    if (note !== state.note) nextState = nextState.setIn(['note'], note)

    const event = eventReducer(state.event, action)
    if (event !== state.event) nextState = nextState.setIn(['event'], event)

    const assessment = assessmentReducer(state.assessment, action)
    if (assessment !== state.assessment) nextState = nextState.setIn(['assessment'], assessment)

    const servicePlan = servicePlanReducer(state.servicePlan, action)
    if (servicePlan !== state.servicePlan) nextState = nextState.setIn(['servicePlan'], servicePlan)

    const caseload = caseloadReducer(state.caseload, action)
    if (caseload !== state.caseload) nextState = nextState.setIn(['caseload'], caseload)

    const appointment = appointmentReducer(state.appointment, action)
    if (appointment !== state.appointment) nextState = nextState.setIn(['appointment'], appointment)

    return nextState

}
