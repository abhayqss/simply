import Member from './member/CareTeamMemberInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    member: new Member(),
})

export default InitialState