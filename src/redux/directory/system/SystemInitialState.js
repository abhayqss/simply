import Role from './role/SystemRoleInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    role: new Role(),
})

export default InitialState