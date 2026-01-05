import List from './list/CareTeamNotificationPreferenceListInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new List(),
})

export default InitialState