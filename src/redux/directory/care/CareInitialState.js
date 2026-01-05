import Team from './team/CareTeamInitialState'
import Level from './level/CareLevelInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    team: new Team(),
    level: new Level(),
})

export default InitialState