import Service from './service/EmergencyServiceInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    service: Service()
})

export default InitialState