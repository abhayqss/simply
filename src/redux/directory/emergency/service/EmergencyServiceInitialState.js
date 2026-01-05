import List from './list/EmergencyServiceListInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: List()
})

export default InitialState