import Contact from './contact/ClientEmergencyContactInitialState'

const { Record } = require('immutable')

export default Record({
    contact: Contact()
})