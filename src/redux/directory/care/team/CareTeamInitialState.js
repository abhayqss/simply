import Role from './role/CareTeamRoleInitialState'
import Channel from './channel/CareTeamChannelInitialState'
import Employee from './employee/CareTeamEmployeeInitialState'
import Notification from './notification/CareTeamNotificationInitialState'
import Responsibility from './responsibility/CareTeamResponsibilityInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    role: new Role(),
    channel: new Channel(),
    employee: new Employee(),
    notification: new Notification(),
    responsibility: new Responsibility()
})

export default InitialState