import Emergency from './list/EmergencyListInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new Emergency(),
})

export default InitialState