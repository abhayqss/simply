import List from './list/CareTeamResponsibilityListInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new List(),
})

export default InitialState