import LoginFormInitialState from './form/LoginFormInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    form: new LoginFormInitialState()
})

export default InitialState