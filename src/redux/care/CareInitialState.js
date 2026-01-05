import Team from './team/CareTeamInitialState'
import Client from './client/CareClientInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    team: new Team(),
    client: new Client(),
})

export default InitialState