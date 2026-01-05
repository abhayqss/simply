import InitialState from './CareTeamInitialState'

import roleReducer from './role/careTeamRoleReducer'
import channelReducer from './channel/careTeamChannelReducer'
import employeeReducer from './employee/careTeamEmployeeReducer'
import notificationReducer from './notification/careTeamNotificationReducer'
import responsibilityReducer from './responsibility/careTeamResponsibilityReducer'

const initialState = new InitialState()

export default function careTeamReducer(state = initialState, action) {
    let nextState = state

    const role = roleReducer(state.role, action)
    if (role !== state.role) nextState = nextState.setIn(['role'], role)

    const channel = channelReducer(state.channel, action)
    if (channel !== state.channel) nextState = nextState.setIn(['channel'], channel)

    const employee = employeeReducer(state.employee, action)
    if (employee !== state.employee) nextState = nextState.setIn(['employee'], employee)

    const notification = notificationReducer(state.notification, action)
    if (notification !== state.notification) nextState = nextState.setIn(['notification'], notification)

    const responsibility = responsibilityReducer(state.responsibility, action)
    if (responsibility !== state.responsibility) nextState = nextState.setIn(['responsibility'], responsibility)

    return nextState
}