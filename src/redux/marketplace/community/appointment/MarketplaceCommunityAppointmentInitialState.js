import Form from './form/MarketplaceCommunityAppointmentFormInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    form: new Form()
})

export default InitialState