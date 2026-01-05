import List from './preference/CareTeamNotificationPreferenceInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    preference: new List(),
})

export default InitialState