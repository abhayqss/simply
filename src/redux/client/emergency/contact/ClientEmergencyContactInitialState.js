import List from './list/ClientEmergencyContactListInitialState'

const { Record } = require('immutable')

export default Record({
    list: List()
})